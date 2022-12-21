import {observer} from "mobx-react-lite";
import * as React from "react";

import {Text} from "../components/text/Text";
import {DataStore} from "../core/stores/DataStore";
import {CoreHelper} from "../core/utils/CoreHelper";
import {LocaleKey, LocaleParams} from "../locales";

export abstract class UIHelper {
  static formatMessage<TLocaleKey extends LocaleKey>(messageId: TLocaleKey, variables: LocaleParams[TLocaleKey] | undefined = undefined, defaultMessage: string | undefined = undefined, parseLineBreaks = false): string {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {currentLocale} = DataStore.getInstance();

    return CoreHelper.formatMessage(messageId as any, variables, defaultMessage, parseLineBreaks);
  }

  static renderMarkdown(value: string) {
    return value.split("**").map((t, i) =>
      i % 2 === 0 ? (
        t
      ) : (
        <Text key={i} style={{fontFamily: "SourceSansPro-Bold"}}>
          {t}
        </Text>
      )
    );
  }

  static renderObserverComponent<T>(Component: React.FC<T>): React.FC<T> {
    const ObserverComponent = observer(Component);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (props) => <ObserverComponent {...props} />;
  }
}
