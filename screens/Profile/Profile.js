import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";

export default function Profile() {
    const { isAuthenticated, name, lastName, email,logOut } = useAuth();
    const navigation = useNavigation();
    return (
        <View style={{ height: "100%" }}>
            {isAuthenticated ? (
                <>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 80,
                        }}
                        className="self-center"
                    >
                        <Image
                            style={{
                                height: 120,
                                width: 120,
                                borderRadius: 60,
                                backgroundColor: "grey",
                            }}
                            source={require("../../assets/profile.jpg")}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 50,
                        }}
                        className="self-center"
                    >
                        <Text
                            className="text-sky-400"
                            style={{ fontWeight: "400", fontSize: 25 }}
                        >
                            {name} {lastName}
                        </Text>
                    </View>
                    <View>
                        <Text
                            className="text-sky-500 self-center"
                            style={{
                                fontWeight: "400",
                                fontSize: 15,
                                marginTop: 8,
                            }}
                        >
                            9158755311
                        </Text>
                    </View>
                    <View>
                        <Text
                            className="text-sky-500 self-center"
                            style={{
                                fontWeight: "400",
                                fontSize: 15,
                                marginTop: 8,
                            }}
                        >
                            {email}
                        </Text>
                    </View>
                    <View className="flex justify-end mx-10 mt-10  w-3/4 self-center">
                        <TouchableOpacity
                            className="bg-sky-500 text-center  text-white font-bold py-3  rounded-lg "
                            onPress={() => {logOut()}}
                        >
                            <Text className="text-center text-white ">
                                Log Out
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) :
            <View style={{marginTop:'25%'}}>
                <Text className="text-center text-lg text-sky-200 mt-10">
                    Please have an account to view your profile 
                    <Text> Please </Text>
                    <Text className="text-sky-400" onPress={() => navigation.navigate("Login")}>
                        LogIn
                    </Text>
                </Text>
            </View> 
            }
        </View>
    );
}
