import {StackScreenProps} from "@react-navigation/stack";
import {observer} from "mobx-react-lite";
import * as React from "react";
import {TextStyle, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {Button} from "../../components/button/Button";
import {Text} from "../../components/text/Text";
import {NavigationHelper} from "../../navigation/NavigationHelper";
import {PublicStackParamList} from "../../navigation/Public";
import {useDynamicStyleSheet} from "../../style/darkMode";
import {UIHelper} from "../../utils/UIHelper";
import {themedStyles} from "./Welcome.styles";

export type WelcomeProps = StackScreenProps<PublicStackParamList, "Welcome">;

export const Welcome: React.FC<WelcomeProps> = observer((props) => {
  const styles = useDynamicStyleSheet(themedStyles);
  const safeAreaInsets = useSafeAreaInsets();

  const handleSignUp = React.useCallback(() => {
    NavigationHelper.navigateTo({
      screen: "Public",
      params: {screen: "SignUp"},
    });
  }, []);

  const handleSignIn = React.useCallback(() => {
    NavigationHelper.navigateTo({
      screen: "Public",
      params: {screen: "SignIn"},
    });
  }, []);

  const handleForgotPassword = React.useCallback(() => {
    NavigationHelper.navigateTo({
      screen: "Public",
      params: {screen: "ForgotPassword"},
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.title as TextStyle, {marginTop: safeAreaInsets.top}]}>{UIHelper.formatMessage("Welcome-title")}</Text>

      <Button containerStyle={styles.signUpButton} onPress={handleSignUp}>
        {UIHelper.formatMessage("Welcome-signUp")}
      </Button>

      <Text style={styles.signInHeading}>{UIHelper.formatMessage("Welcome-signInHeading")}</Text>

      <TouchableOpacity onPress={handleSignIn} containerStyle={styles.signInButton}>
        <Text style={styles.signInText as TextStyle}>{UIHelper.formatMessage("Welcome-signIn")}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleForgotPassword} containerStyle={[styles.forgotPasswordButton, {marginBottom: safeAreaInsets.bottom + 20}]}>
        <Text style={styles.forgotPasswordText as TextStyle}>{UIHelper.formatMessage("Welcome-forgotPassword")}</Text>
      </TouchableOpacity>
    </View>
  );
});
