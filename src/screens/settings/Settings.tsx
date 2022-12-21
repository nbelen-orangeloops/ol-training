import {observer} from "mobx-react-lite";
import * as React from "react";
import {useState} from "react";
import {Alert, AppState, AppStateStatus, Switch, Text, View} from "react-native";
import {BIOMETRY_TYPE} from "react-native-keychain";
import {check, openSettings, PERMISSIONS, request, RESULTS} from "react-native-permissions";
import {useSafeArea} from "react-native-safe-area-context";

import MainLogo from "../../assets/companyLogo.svg";
import {KeyboardAwareScrollView} from "../../components/keyboardawarescrollview/KeyboardAwareScrollView";
import {AppStore, StorageItem} from "../../stores/AppStore";
import {useDynamicStyleSheet} from "../../style/darkMode";
import {UIHelper} from "../../utils/UIHelper";
import {themedStyles} from "./Settings.styles";

export const Settings: React.FC = observer((props) => {
  const appStore = AppStore.getInstance();
  const styles = useDynamicStyleSheet(themedStyles);

  const safeAreaInsets = useSafeArea();

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = React.useCallback(async (value: boolean) => {
    if (handlingEnablePressRef.current) return;
    setIsEnabled(value);

    const setBiometryEnabled = async (newValue: boolean) => {
      setIsEnabled(newValue);
      await appStore.setEnableBiometry(newValue);
    };

    if (value) {
      if (appStore.supportedBiometryType === BIOMETRY_TYPE.FACE_ID) {
        let faceIDStatus = await check(PERMISSIONS.IOS.FACE_ID);

        if (faceIDStatus === RESULTS.DENIED) faceIDStatus = await request(PERMISSIONS.IOS.FACE_ID);

        if (faceIDStatus !== RESULTS.GRANTED) {
          if (faceIDStatus === RESULTS.BLOCKED)
            Alert.alert(UIHelper.formatMessage("Settings-enableBiometrics"), UIHelper.formatMessage("Settings-enableBiometricsSettingsError"), [
              {
                text: UIHelper.formatMessage("Common-cancel"),
                style: "cancel",
              },
              {
                text: UIHelper.formatMessage("Settings-goToSettings"),
                onPress: openSettings,
                style: "default",
              },
            ]);

          await setBiometryEnabled(false);
        } else await setBiometryEnabled(true);
      } else await setBiometryEnabled(true);
    } else await setBiometryEnabled(false);

    handlingEnablePressRef.current = false;
  }, []);

  React.useEffect(() => {
    const appStateChangeHandler = async (state: AppStateStatus) => {
      if (state !== "active") return;

      const [biometryEnabled, faceIDStatus] = await Promise.all([
        appStore.getStorageItem(StorageItem.EnableBiometry),
        appStore.supportedBiometryType === BIOMETRY_TYPE.FACE_ID ? check(PERMISSIONS.IOS.FACE_ID) : Promise.resolve(undefined),
      ] as const);

      const isBiometryEnabled = biometryEnabled === "true";

      if (!faceIDStatus) setIsEnabled(isBiometryEnabled);
      else setIsEnabled(faceIDStatus === "granted" && isBiometryEnabled);
    };
    appStateChangeHandler(AppState.currentState);

    const eventSubscription = AppState.addEventListener("change", appStateChangeHandler);
    return () => eventSubscription.remove();
  }, []);

  const handlingEnablePressRef = React.useRef(false);

  return (
    <View style={styles.wrapper}>
      <View style={styles.backLogoContainer}>
        <MainLogo style={styles.backLogo} />
      </View>

      <KeyboardAwareScrollView scrollEnabled={true} contentContainerStyle={[styles.scrollViewContentContainer, {marginLeft: safeAreaInsets.left, marginRight: safeAreaInsets.right}]} keyboardShouldPersistTaps="handled">
        {appStore.supportedBiometryType && (
          <View style={styles.container}>
            <Text style={styles.biometrics}> {UIHelper.formatMessage("Settings-enableBiometrics")}</Text>
            <Switch value={isEnabled} onValueChange={toggleSwitch} />
          </View>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
});
