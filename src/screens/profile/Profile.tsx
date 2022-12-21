import {ReactNativeFile} from "apollo-upload-client";
import {observer} from "mobx-react-lite";
import * as React from "react";
import {Alert, Image, Text, TextStyle, TouchableOpacity, View} from "react-native";
import {Asset, launchImageLibrary} from "react-native-image-picker";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import Edit from "../../assets/edit.svg";
import {Button} from "../../components/button/Button";
import {Input} from "../../components/input/Input";
import {DataStore} from "../../core/stores/DataStore";
import {ModelHelper} from "../../core/utils/ModelHelper";
import {useFormInput} from "../../hooks/useFormInput";
import {useDynamicStyleSheet} from "../../style/darkMode";
import {UIHelper} from "../../utils/UIHelper";
import {themedStyles} from "./Profile.styles";

export const Profile: React.FC = observer(() => {
  const dataStore = DataStore.getInstance();
  const {authenticationState} = dataStore;
  const {user} = authenticationState;
  const styles = useDynamicStyleSheet(themedStyles);

  const validateFirstName = React.useCallback((value: string) => ModelHelper.validateFirstName(value), []);
  const validateLastName = React.useCallback((value: string) => ModelHelper.validateLastName(value), []);

  const firstNameFormInput = useFormInput({
    defaultValue: authenticationState.user!.firstName,
    validate: validateFirstName,
  });

  const lastNameFormInput = useFormInput({
    defaultValue: authenticationState.user!.lastName,
    validate: validateLastName,
  });

  const [newProfilePicture, setNewProfilePicture] = React.useState<Asset>();

  React.useEffect(() => {
    (async () => {
      const response = await dataStore.fetchUser({
        accessToken: dataStore.authenticationState.accessToken!,
      });

      if (!response.success) Alert.alert(UIHelper.formatMessage("Common-error"), UIHelper.formatMessage("Common-genericError"));
    })();
  }, []);

  const handleUpdateProfilePicture = React.useCallback(() => {
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: "photo",
      },
      (response) => {
        const asset = response.assets?.[0];
        if (asset) {
          setNewProfilePicture(asset);
        }
      }
    );
  }, []);

  const handleSaveChanges = React.useCallback(async () => {
    if (!user?.id || authenticationState.loadingUpdateUser) return;

    const updateUserResponse = await dataStore.updateUser({
      accessToken: authenticationState.accessToken!,
      id: user.id,
      firstName: authenticationState.user?.firstName !== firstNameFormInput.inputProps.value ? firstNameFormInput.inputProps.value : undefined,
      lastName: authenticationState.user?.lastName !== lastNameFormInput.inputProps.value ? lastNameFormInput.inputProps.value : undefined,
      upload: newProfilePicture?.uri
        ? new ReactNativeFile({
            uri: newProfilePicture.uri,
            name: newProfilePicture.fileName || "profile",
            type: newProfilePicture.type,
          })
        : undefined,
    });

    if (updateUserResponse.success) {
      Alert.alert(UIHelper.formatMessage("Common-success"), UIHelper.formatMessage("Profile-success"), [{text: "OK"}]);
      setNewProfilePicture(undefined);
    } else Alert.alert(UIHelper.formatMessage("Common-error"), UIHelper.formatMessage("Common-genericError"));
  }, [user?.id, firstNameFormInput.inputProps.value, lastNameFormInput.inputProps.value, newProfilePicture]);

  const submitButtonDisabled = !user?.id || (!newProfilePicture && authenticationState.user?.firstName === firstNameFormInput.inputProps.value && authenticationState.user?.lastName === lastNameFormInput.inputProps.value);
  const imageSource = React.useMemo(
    () => newProfilePicture || (authenticationState.user?.imageData ? {uri: `data:image/png;base64,${authenticationState.user.imageData}`} : undefined),
    [newProfilePicture, authenticationState.user?.imageData]
  );

  return (
    <KeyboardAwareScrollView bounces={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <View style={styles.profilePictureContainer}>{imageSource && <Image style={styles.profilePicture} source={imageSource} />}</View>

            <View style={styles.badge}>
              <TouchableOpacity style={styles.badgeButton} onPress={handleUpdateProfilePicture}>
                <Edit style={styles.editIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.nameText as TextStyle}>{authenticationState.user!.firstName}</Text>
          <Text style={styles.emailText as TextStyle}>{authenticationState.user!.email}</Text>
        </View>

        <View style={styles.profileInfoWrapper}>
          <View style={styles.profileInfoTitleContainer}>
            <Text style={styles.profileInfoText as TextStyle}>{UIHelper.formatMessage("Profile-title")}</Text>
          </View>

          <Input {...firstNameFormInput.inputProps} style={styles.input} label={UIHelper.formatMessage("Profile-firstName")} placeholderTextColor="lightgray" />
          <Input {...lastNameFormInput.inputProps} style={styles.input} label={UIHelper.formatMessage("Profile-lastName")} placeholderTextColor="lightgray" />
        </View>

        <Button containerStyle={styles.buttonContainer} disabled={submitButtonDisabled} onPress={handleSaveChanges}>
          {UIHelper.formatMessage("Common-saveChanges")}
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
});
