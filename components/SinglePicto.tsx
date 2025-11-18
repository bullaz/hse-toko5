import { useState } from "react";
import { View, TouchableOpacity, StatusBar, Pressable, Modal, Button, Alert, Image, Platform } from "react-native";
import styles from "../styles";
import AnonymousHotSurfaceDanger from "../assets/Anonymous-hot-surface-danger.svg";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Text } from "react-native-paper";

type Props = NativeStackScreenProps<RootStackParamList>;

export default function SinglePicto({ navigation }: Props) {
    return (
        <>
            <StatusBar hidden={false} />
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center', // Changed from 'flex-start'
                    backgroundColor: 'ghostwhite',
                    ...Platform.select({
                        ios: { paddingTop: 40 },
                        android: { paddingTop: StatusBar.currentHeight }
                    }),
                }}
            >
                <View>
                    <Image source={require('../assets/pictogram/hotSurface.png')} style={{ width: 250, height: 250 }}></Image>
                </View>
                <View>
                    <Text variant="displaySmall">[Description]</Text>
                </View>
            </View>
        </>
    );
}