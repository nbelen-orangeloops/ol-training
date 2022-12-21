import {observer} from "mobx-react-lite";
import * as React from "react";
import {ActivityIndicator, ActivityIndicatorProps} from "react-native";

export type SpinnerProps = ActivityIndicatorProps;

export const Spinner: React.FC<SpinnerProps> = observer((props) => <ActivityIndicator {...props} />);
