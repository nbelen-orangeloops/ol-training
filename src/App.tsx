import { observer } from "mobx-react-lite";
import * as React from "react";
import RNBootSplash from "react-native-bootsplash";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { CarouselComp } from "./components/carousel/CarouselData";
import { Welcome } from "./screens/welcome/Welcome";
import { AppStore } from "./stores/AppStore";
import { DarkModeProvider } from "./style/darkMode";
export const App: React.FC<React.PropsWithChildren<{}>> = observer((props) => {
  const appStore = AppStore.getInstance();

  const [shouldRender, setShouldRender] = React.useState(false);

  React.useEffect(() => {
    if (appStore.state.initialized) {
      if (!shouldRender) setShouldRender(true);

      return;
    }

    if (appStore.state.initializing) return;

    const initializeAppStore = async () => {
      await appStore.initialize();

      setShouldRender(true);
    };

    initializeAppStore();
  }, [shouldRender, appStore.state.initializing, appStore.state.initialized]);

  React.useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  if (!shouldRender) return null;

  return (
    <DarkModeProvider>
      <SafeAreaProvider>
        <Welcome />
        <CarouselComp />
      </SafeAreaProvider>
    </DarkModeProvider>
  );
});
