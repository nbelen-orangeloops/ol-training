import {StackScreenProps} from "@react-navigation/stack";
import {observer} from "mobx-react-lite";
import * as React from "react";
import {Alert, Text, TextStyle, View} from "react-native";

import MainLogo from "../../assets/companyLogo.svg";
import {Button} from "../../components/button/Button";
import {Input} from "../../components/input/Input";
import {KeyboardAwareScrollView} from "../../components/keyboardawarescrollview/KeyboardAwareScrollView";
import {DataStore} from "../../core/stores/DataStore";
import {ModelHelper} from "../../core/utils/ModelHelper";
import {useFormInput} from "../../hooks/useFormInput";
import {NavigationHelper} from "../../navigation/NavigationHelper";
import {PublicStackParamList} from "../../navigation/Public";
import {useDynamicStyleSheet} from "../../style/darkMode";
import {UIHelper} from "../../utils/UIHelper";
import {themedStyles} from "./ForgotPassword.styles";

export type ForgotPasswordProps = StackScreenProps<PublicStackParamList, "ForgotPassword">;

export const ForgotPassword: React.FC<ForgotPasswordProps> = observer((props) => {
  const dataStore = DataStore.getInstance();
  const {authenticationState} = dataStore;
  const styles = useDynamicStyleSheet(themedStyles);

  const emailFormInput = useFormInput();

  const handleNavigationWelcome = React.useCallback(() => {
    NavigationHelper.navigateTo({screen: "Public", params: {screen: "Welcome"}});
  }, []);

  const validateEmail = React.useCallback((value: string) => ModelHelper.validateEmail(value), []);

  const sendButtonDisabled = React.useMemo(() => validateEmail(emailFormInput.inputProps.value).length > 0, [emailFormInput.inputProps.value]);

  const handleRequestResetPassword = React.useCallback(async () => {
    if (authenticationState.loadingRequestResetPassword) return;

    const requestResetPasswordResponse = await dataStore.requestResetPassword({
      email: emailFormInput.inputProps.value,
    });

    if (requestResetPasswordResponse.success)
      Alert.alert(UIHelper.formatMessage("ForgotPassword-successfulResponseAlertTitle"), UIHelper.formatMessage("ForgotPassword-successfulResponseAlertMessage"), [
        {text: UIHelper.formatMessage("Common-ok"), onPress: handleNavigationWelcome},
      ]);
    else Alert.alert(UIHelper.formatMessage("ForgotPassword-unsuccessfulResponseAlertTitle"), UIHelper.formatMessage("ForgotPassword-unsuccessfulResponseAlertMessage"));
  }, [emailFormInput.inputProps.value]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.scrollViewContentContainer} bounces={false}>
      <View style={styles.container}>
        <MainLogo style={styles.mainLogo} />

        <Text style={styles.description as TextStyle}>{UIHelper.formatMessage("ForgotPassword-description")}</Text>

        <Input
          {...emailFormInput.inputProps}
          style={styles.input}
          label={UIHelper.formatMessage("ForgotPassword-emailInputLabel")}
          placeholderTextColor="lightgray"
          textContentType="emailAddress"
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />

        <Button containerStyle={styles.buttonContainer} isLoading={authenticationState.loadingRequestResetPassword} disabled={sendButtonDisabled} onPress={handleRequestResetPassword}>
          {UIHelper.formatMessage("ForgotPassword-send")}
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
});
