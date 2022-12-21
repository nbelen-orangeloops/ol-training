import {StackScreenProps} from "@react-navigation/stack";
import {observer} from "mobx-react-lite";
import * as React from "react";
import {Alert, View} from "react-native";

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
import {themedStyles} from "./SignUp.styles";

export type SignUpProps = StackScreenProps<PublicStackParamList, "SignUp">;

export const SignUp: React.FC<SignUpProps> = observer((props) => {
  const dataStore = DataStore.getInstance();
  const {authenticationState} = dataStore;
  const styles = useDynamicStyleSheet(themedStyles);

  const validateFirstName = React.useCallback((value: string) => {
    if (ModelHelper.validateFirstName(value).length > 0) return ModelHelper.validateFirstName(value);
    return [];
  }, []);

  const validateLastName = React.useCallback((value: string) => {
    if (ModelHelper.validateLastName(value).length > 0) return ModelHelper.validateLastName(value);
    return [];
  }, []);

  const validateEmail = React.useCallback((value: string) => {
    if (ModelHelper.validateEmail(value).length > 0) return ModelHelper.validateEmail(value);
    return [];
  }, []);

  const validatePassword = React.useCallback((value: string) => {
    if (ModelHelper.validatePassword(value).length > 0) return ModelHelper.validatePassword(value);
    return [];
  }, []);

  const firstNameFormInput = useFormInput({validate: validateFirstName});
  const lastNameFormInput = useFormInput({validate: validateLastName});
  const emailFormInput = useFormInput({validate: validateEmail});
  const passwordFormInput = useFormInput({validate: validatePassword});

  const buttonDisabled = firstNameFormInput.inputProps.error || lastNameFormInput.inputProps.error || emailFormInput.inputProps.error || passwordFormInput.inputProps.error;

  const handleNavigationHome = React.useCallback(() => {
    NavigationHelper.navigateTo({screen: "Public", params: {screen: "Welcome"}});
  }, []);

  const handleSignUp = React.useCallback(async () => {
    if (authenticationState.loadingSignUp) return;

    const signUpResponse = await dataStore.signUp({
      firstName: firstNameFormInput.inputProps.value,
      lastName: lastNameFormInput.inputProps.value,
      email: emailFormInput.inputProps.value,
      password: passwordFormInput.inputProps.value,
    });

    if (signUpResponse.success) Alert.alert(UIHelper.formatMessage("SignUp-successfulSignUpAlertTitle"), UIHelper.formatMessage("SignUp-successfulSignUpAlertMessage"), [{text: "OK", onPress: handleNavigationHome}]);
    else Alert.alert(UIHelper.formatMessage("SignUp-unsuccessfulSignUpAlertTitle"), UIHelper.formatMessage("SignUp-unsuccessfulSignUpAlertMessage"));
  }, [firstNameFormInput.inputProps.value, lastNameFormInput.inputProps.value, emailFormInput.inputProps.value, passwordFormInput.inputProps.value]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.scrollViewContentContainer} bounces={false}>
      <View style={styles.container}>
        <MainLogo style={styles.mainLogo} />

        <Input {...firstNameFormInput.inputProps} style={styles.input} label={UIHelper.formatMessage("SignUp-firstNameInputLabel")} placeholderTextColor="lightgray" />
        <Input {...lastNameFormInput.inputProps} style={styles.input} label={UIHelper.formatMessage("SignUp-lastNameInputLabel")} placeholderTextColor="lightgray" />

        <Input
          {...emailFormInput.inputProps}
          style={styles.input}
          label={UIHelper.formatMessage("SignUp-emailInputLabel")}
          placeholderTextColor="lightgray"
          textContentType="emailAddress"
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />

        <Input {...passwordFormInput.inputProps} style={styles.input} label={UIHelper.formatMessage("SignUp-passwordInputLabel")} secureTextEntry={true} placeholderTextColor="lightgray" />

        <Button containerStyle={styles.buttonContainer} isLoading={authenticationState.loadingSignUp} disabled={buttonDisabled} onPress={handleSignUp}>
          {UIHelper.formatMessage("SignUp-title")}
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
});
