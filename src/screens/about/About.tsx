import {observer} from "mobx-react-lite";
import * as React from "react";
import {Linking, Text, TextStyle, TouchableOpacity, View} from "react-native";

import ChevronUp from "../../assets/chevronRight.svg";
import {useDynamicStyleSheet} from "../../style/darkMode";
import {UIHelper} from "../../utils/UIHelper";
import {themedStyles} from "./About.styles";

export const About: React.FC = observer(() => {
  const styles = useDynamicStyleSheet(themedStyles);

  const handleTermsAndConditions = React.useCallback(() => {
    Linking.openURL("https://orangeloops.com/about.html");
  }, []);

  const handleContactUs = React.useCallback(() => {
    Linking.openURL("mailto:contact@orangeloops.com");
  }, []);

  const handlePrivacyPolicy = React.useCallback(() => {
    Linking.openURL("https://orangeloops.com/about.html");
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <TouchableOpacity>
          <Text style={styles.textStyle as TextStyle} onPress={handleTermsAndConditions}>
            {UIHelper.formatMessage("About-termsAndConditions")}
          </Text>
        </TouchableOpacity>

        <ChevronUp style={styles.chevronDefault} />
      </View>

      <View style={styles.itemContainer}>
        <TouchableOpacity>
          <Text style={styles.textStyle as TextStyle} onPress={handleContactUs}>
            {UIHelper.formatMessage("About-contactUs")}
          </Text>
        </TouchableOpacity>

        <ChevronUp style={styles.chevronDefault} />
      </View>

      <View style={styles.itemContainer}>
        <TouchableOpacity>
          <Text style={styles.textStyle as TextStyle} onPress={handlePrivacyPolicy}>
            {UIHelper.formatMessage("About-privacyPolicy")}
          </Text>
        </TouchableOpacity>

        <ChevronUp style={styles.chevronDefault} />
      </View>
    </View>
  );
});
