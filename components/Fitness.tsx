import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Text } from "react-native";



type Props = NativeStackScreenProps<RootStackParamList>;

export default function Fitness({ navigation }: Props) {


    return (
        <><Text>test</Text></>
    )
}