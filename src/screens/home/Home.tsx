import {observer} from "mobx-react-lite";
import * as React from "react";
import {ActivityIndicator, Alert, View} from "react-native";

import {Text} from "../../components/text/Text";
import {DataStore} from "../../core/stores/DataStore";
import {useDynamicStyleSheet} from "../../style/darkMode";
import {UIHelper} from "../../utils/UIHelper";
import {themedStyles} from "./Home.styles";

export const Home: React.FC = observer(() => {
  const dataStore = DataStore.getInstance();
  const styles = useDynamicStyleSheet(themedStyles);

  const [firstName, setFirstName] = React.useState("");

  const fetchUser = React.useCallback(() => {
    dataStore
      .fetchUser({
        accessToken: dataStore.authenticationState.accessToken!,
      })
      .then((r) => {
        if (r.success) setFirstName(r.user.firstName);
        else {
          Alert.alert("Error", "", [
            {
              text: UIHelper.formatMessage("Common-retry"),
              onPress: fetchUser,
            },
            {
              text: UIHelper.formatMessage("Common-ok"),
              onPress: () => {
                //
              },
            },
          ]);
        }
      });
  }, []);

  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      {dataStore.authenticationState.loadingUser ? <ActivityIndicator /> : <Text>{UIHelper.formatMessage("Welcome-welcomeMessage", {name: firstName})}</Text>}

      <Text>{UIHelper.formatMessage("Home-title")}</Text>
    </View>
  );
});
