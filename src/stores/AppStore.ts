import AsyncStorage from "@react-native-async-storage/async-storage";
// import {Sha} from "@trackforce/react-native-crypto";
import {action, makeObservable, observable, reaction, runInAction} from "mobx";
import * as Keychain from "react-native-keychain";
import {BIOMETRY_TYPE} from "react-native-keychain";

import {AppConfig} from "../AppConfig";
import * as Models from "../core/models";
import {DataStore} from "../core/stores/DataStore";

export enum StorageItem {
  AccessToken = "@ol-accessToken",
  Username = "@ol-username",
  EnableBiometry = "@ol-enableBiometry",
}

const securedStorageItems: StorageItem[] = [StorageItem.AccessToken];

export type AppStoreState = {
  initializing: boolean;
  initialized: boolean;
};

export class AppStore {
  private static instance: AppStore | undefined;

  private disposers: (() => void)[] = [];

  dataStore = DataStore.getInstance();

  state: AppStoreState = {
    initializing: false,
    initialized: false,
  };

  supportedBiometryType: BIOMETRY_TYPE | null | undefined = undefined;

  private constructor() {
    makeObservable(this, {
      state: observable,
      initialize: action,
      reset: action,
    });
  }

  static getInstance(): AppStore {
    if (!this.instance) this.instance = new AppStore();

    return this.instance;
  }

  async initialize() {
    const {dataStore, state} = this;

    state.initialized = false;
    state.initializing = true;

    await dataStore.initialize();
    await this.dataStore.setLocale(AppConfig.Settings.Localization.defaultLocale);

    let lastAccessToken: Models.AccessToken | undefined;
    const handleAccessTokenChange = async () => {
      const {accessToken} = dataStore.authenticationState;

      if (accessToken) await this.setStorageItem(StorageItem.AccessToken, JSON.stringify({...accessToken}));
      else if (lastAccessToken !== undefined) await this.deleteStorageItem(StorageItem.AccessToken);

      lastAccessToken = accessToken;
    };
    this.disposers.push(reaction(() => dataStore.authenticationState.accessToken, handleAccessTokenChange));
    await handleAccessTokenChange();

    let lastUsername: string | undefined;
    const handleUsernameChange = async () => {
      const {user} = dataStore.authenticationState;

      if (user?.email) await this.setStorageItem(StorageItem.Username, user.email);
      else if (lastUsername !== undefined) await this.deleteStorageItem(StorageItem.Username);

      lastUsername = user?.email;
    };
    this.disposers.push(reaction(() => dataStore.authenticationState.user?.email, handleUsernameChange));
    await handleUsernameChange();

    this.supportedBiometryType = await Keychain.getSupportedBiometryType();

    runInAction(() => {
      state.initializing = false;
      state.initialized = true;
    });
  }

  async reset() {
    const {dataStore, disposers} = this;

    disposers.forEach((d) => d());
    this.disposers = [];

    await this.cleanStorage();

    dataStore.reset();

    this.state = {
      initialized: false,
      initializing: false,
    };
  }

  async getUsernameHash(): Promise<string | null> {
    // const {user} = this.dataStore.authenticationState;
    // const username = user?.email ?? (await this.getStorageItem(StorageItem.Username));

    // return username ? Sha.sha256(username) : null; TODO: fix getUsernameHash
    return "";
  }

  async getStorageItem<TItem extends StorageItem>(item: TItem): Promise<string | null> {
    if (securedStorageItems.includes(item)) {
      const result = await Keychain.getGenericPassword({service: item}).catch((e) => {
        console.error(e);
        return null;
      });
      const usernameHash = await this.getUsernameHash();

      if (result) {
        if (!usernameHash || result.username !== usernameHash) {
          await this.deleteStorageItem(item);

          return null;
        } else return result.password;
      }

      return null;
    }

    return AsyncStorage.getItem(item);
  }

  async setStorageItem<TItem extends StorageItem>(item: TItem, value: string) {
    if (securedStorageItems.includes(item)) {
      const usernameHash = await this.getUsernameHash();

      if (usernameHash) {
        const enableBiometric = await this.getStorageItem(StorageItem.EnableBiometry);

        await Keychain.setGenericPassword(usernameHash, value, {
          service: item,
          ...(enableBiometric === "true"
            ? {
                accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
                authenticationType: Keychain.AUTHENTICATION_TYPE.BIOMETRICS,
              }
            : {}),
        }).catch(() => null);
      }
    } else await AsyncStorage.setItem(item, value);
  }

  async deleteStorageItem<TItem extends StorageItem>(item: TItem) {
    if (securedStorageItems.includes(item))
      await Keychain.resetGenericPassword({
        service: item,
      }).catch(() => null);
    else await AsyncStorage.removeItem(item);
  }

  async cleanStorage() {
    const storageKeysToDelete = (await AsyncStorage.getAllKeys()).filter((k) => k.startsWith("@ol"));
    await AsyncStorage.multiRemove(storageKeysToDelete);

    await Promise.all(securedStorageItems.map((k) => Keychain.resetGenericPassword({service: k}).catch(() => null)));
  }

  async setEnableBiometry(value: boolean) {
    await this.setStorageItem(StorageItem.EnableBiometry, value.toString());

    const accessToken = await this.getStorageItem(StorageItem.AccessToken);
    await this.deleteStorageItem(StorageItem.AccessToken);

    if (accessToken) await this.setStorageItem(StorageItem.AccessToken, accessToken);
  }
}
