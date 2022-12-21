import * as _ from "lodash";
import intl from "react-intl-universal";

import {LocaleKey, LocaleParams} from "../locales/Locale";

// AppConfig, Models, Stores can not be imported!

(String.prototype as any).replaceAll = function (search: string, replacement: string) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const target = this;

  return target.replace(new RegExp(search, "g"), replacement);
};

(String.prototype as any).trimAll = function () {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const target = this;

  return target.replaceAll(" ", "");
};

export class CoreHelper {
  static formatMessage<TLocaleKey extends LocaleKey>(messageId: TLocaleKey, variables: LocaleParams[TLocaleKey] | undefined = undefined, defaultMessage: string | undefined = undefined, parseLineBreaks = false): string {
    let result = intl.formatMessage(
      {
        id: messageId,
        defaultMessage: !_.isNil(defaultMessage) ? defaultMessage : messageId,
      },
      variables
    );

    if (parseLineBreaks) {
      const lines: string[] = result.split("|");

      result = "";
      lines.forEach((line) => (result.length === 0 ? (result = line) : (result = `${result}\n${line}`)));
    }
    return result;
  }

  static mergeWith(object: any, values: any, updateObject = true, customizer?: (value: any, sourceValue: any, key: any) => any): any {
    if (updateObject) {
      return _.mergeWith(object, values, !_.isNil(customizer) ? customizer : this.mergeWithCustomizer);
    } else {
      const clone = _.cloneDeep(object);
      return _.mergeWith(clone, values, !_.isNil(customizer) ? customizer : this.mergeWithCustomizer);
    }
  }

  static mergeWithCustomizer(value: any, sourceValue: any, key: any): any {
    return _.isArray(value) ? sourceValue : undefined;
  }

  static pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    return _.pick(obj, keys);
  }

  static omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    return _.omit(obj, keys);
  }

  static hasProperty<TKey extends PropertyKey>(value: object, key: TKey): value is {[K in TKey]: unknown} {
    return key in value;
  }

  static async wait(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }

  static get isDevelopment(): boolean {
    return process.env.NODE_ENV === "development";
  }

  static get isProduction(): boolean {
    return process.env.NODE_ENV === "production";
  }
}
