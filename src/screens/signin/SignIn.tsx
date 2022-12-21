import {useHeaderHeight} from "@react-navigation/elements";
import {observer} from "mobx-react-lite";
import * as React from "react";
import {Alert, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import MainLogo from "../../assets/companyLogo.svg";
import {Button} from "../../components/button/Button";
import {Input} from "../../components/input/Input";
import {KeyboardAwareScrollView} from "../../components/keyboardawarescrollview/KeyboardAwareScrollView";
import {DataStore} from "../../core/stores/DataStore";
import {useFormInput} from "../../hooks/useFormInput";
import {NavigationHelper} from "../../navigation/NavigationHelper";
import {useDynamicStyleSheet} from "../../style/darkMode";
import {UIHelper} from "../../utils/UIHelper";
import {themedStyles} from "./SignIn.styles";

export const SignIn: React.FC = observer(() => {
  const dataStore = DataStore.getInstance();
  const {authenticationState} = dataStore;
  const styles = useDynamicStyleSheet(themedStyles);

  const safeAreaInsets = useSafeAreaInsets();

  const emailFormInput = useFormInput({defaultValue: "admin@orangeloops.com"});
  const passwordFormInput = useFormInput({defaultValue: "Password01"});

  const handleSignIn = React.useCallback(async () => {
    if (authenticationState.loadingSignIn) return;

    const signInResponse = await dataStore.signIn({
      email: emailFormInput.inputProps.value,
      password: passwordFormInput.inputProps.value,
    });

    if (signInResponse.success) NavigationHelper.navigateTo({screen: "Main", params: {screen: "Home"}});
    else Alert.alert(UIHelper.formatMessage("SignIn-unsuccessfulSignInMessage"));
  }, [emailFormInput.inputProps.value, passwordFormInput.inputProps.value]);

  const headerHeight = useHeaderHeight();

  return (
    <View style={styles.wrapper}>
      <View style={styles.backLogoContainer}>
        <MainLogo style={styles.backLogo} />
      </View>

      <KeyboardAwareScrollView scrollEnabled={true} contentContainerStyle={[styles.scrollViewContentContainer, {marginLeft: safeAreaInsets.left, marginRight: safeAreaInsets.right}]} keyboardShouldPersistTaps="handled">
        <MainLogo style={[styles.mainLogo, {marginTop: safeAreaInsets.top + headerHeight}]} />

        <View style={styles.inputContainer}>
          <Input
            {...emailFormInput.inputProps}
            style={styles.input}
            label={UIHelper.formatMessage("SignIn-emailInputLabel")}
            placeholderTextColor="lightgray"
            textContentType="emailAddress"
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />

          <Input {...passwordFormInput.inputProps} style={styles.input} label={UIHelper.formatMessage("SignIn-passwordInputLabel")} secureTextEntry={true} placeholderTextColor="lightgray" />
        </View>

        <View style={styles.buttonWrapper}>
          <Button containerStyle={styles.buttonContainer} isLoading={authenticationState.loadingSignIn} onPress={handleSignIn}>
            {UIHelper.formatMessage("SignIn-submitButtonLabel")}
          </Button>
        </View>

        <View style={{paddingBottom: safeAreaInsets.bottom}} />
      </KeyboardAwareScrollView>
    </View>
  );
});
