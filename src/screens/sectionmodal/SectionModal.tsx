import {StackScreenProps} from "@react-navigation/stack";
import {observer} from "mobx-react-lite";
import * as React from "react";
import {NativeScrollEvent, NativeSyntheticEvent, Text, View} from "react-native";
import {FlatList, TouchableOpacity} from "react-native-gesture-handler";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {useModalOnClose} from "../../hooks/useModalOnClose";
import {RootSwitchParamList} from "../../navigation/Root";
import {useDynamicStyleSheet} from "../../style/darkMode";
import {themedStyles} from "./SectionModal.styles";

export type ModalSectionData = {id: string; value: string};

export type SectionModalProps = StackScreenProps<RootSwitchParamList, "SectionModal">;

export const SectionModal: React.FC<SectionModalProps> = observer((props) => {
  const styles = useDynamicStyleSheet(themedStyles);

  const {data, selected, onSelect, onClose} = props.route.params;

  const handleSelection = React.useCallback(
    (value: ModalSectionData) => {
      onSelect(value);
      props.navigation.goBack();
    },
    [onSelect]
  );

  const safeAreaInsets = useSafeAreaInsets();

  useModalOnClose({navigation: props.navigation, onClose: onClose!});

  const gestureEnabledRef = React.useRef(true);
  const handleScroll = React.useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newGestureEnabled = e.nativeEvent.contentOffset.y <= 0;

    if (newGestureEnabled !== gestureEnabledRef.current) {
      props.navigation.setOptions({
        gestureEnabled: newGestureEnabled,
      });
      gestureEnabledRef.current = newGestureEnabled;
    }
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.handle} />

      <FlatList
        style={styles.list}
        bounces={false}
        data={data}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        onScrollToTop={handleScroll}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              style={styles.itemWrapper}
              onPress={() => {
                handleSelection(item);
              }}>
              <Text style={[styles.itemLabel, selected?.id === item.id && styles.selectedItemLabel]}>{item.value}</Text>
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={<View style={{paddingBottom: safeAreaInsets.bottom}} />}
      />
    </View>
  );
});
