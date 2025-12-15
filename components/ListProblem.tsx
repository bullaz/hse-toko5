import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "react-native-paper";
import { RootStackParamList } from "../context";

type Props = NativeStackScreenProps<RootStackParamList, 'ListProblem'>;

export default function ListProblem({ navigation }: Props) {
    return (
        <Text>Test</Text>
    );
}