import { useState } from "react";
import { View, Text, TouchableOpacity, StatusBar, Pressable, Modal, Button, Alert } from "react-native";
import styles from "../styles";
import AnonymousHotSurfaceDanger from "../assets/Anonymous-hot-surface-danger.svg";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList>;

export default function SinglePicto({ navigation }: Props) {
    return (
        <>
            <>
                <View style={styles.pictoContainer}>
                    <StatusBar hidden={false} />
                    <View>
                        <AnonymousHotSurfaceDanger fill="blue" />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                </View>
            </>
        </>
    );
}