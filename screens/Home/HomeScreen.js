import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
    Modal,
    TouchableOpacity
} from "react-native";
import React, { useState,useEffect} from "react";
import { FeaturedRow, Header, Movie, Statusbar } from "../../components";
import { Ionicons } from "@expo/vector-icons";
import useAuth from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(()=>{
      setModalVisible(true);
    },[])
    const {
        popular,
        topRated,
        trending,
        upcoming,
        loading,
        onRefresh,
        refreshing,
        isAuthenticated,
        name,
    } = useAuth();
    if (loading) {
        <SafeAreaView className="flex-1 bg-black grid items-center justify-center">
            <ActivityIndicator size={"large"} color={"white"} />
        </SafeAreaView>;
    }
    return (
        <SafeAreaView className="flex-1 bg-black">
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                showsVerticalScrollIndicator={false}
                >
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={{backgroundColor:"rgb(15, 23, 42)",}} className=" grayscale self-center drop-shadow-2xl  my-28  w-2/3 rounded-2xl p-16">
                        {!isAuthenticated ? (
                            <Text className="text-lime-300">Hello</Text>
                        ) : (
                            <Text className="text-teal-300 text-lg font-bold">Hello {name}</Text>
                        )}
                        <TouchableOpacity style={{backgroundColor:"rgb(40, 124, 167)"}} className="self-center mx-4 my-2 rounded-xl border-2 p-2 grayscale" onPress={()=>setModalVisible(false)} >
                            <Text className="text-center text-white w-14">Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Header />
                <FeaturedRow
                    lable={"upcoming"}
                    render={<Movie data={upcoming} />}
                    onPress={() =>
                        navigation.navigate("Listing", {
                            data: upcoming,
                            category: "upcoming",
                        })
                    }
                />
                <FeaturedRow
                    lable={"trending"}
                    render={<Movie data={trending} />}
                    onPress={() =>
                        navigation.navigate("Listing", {
                            data: trending,
                            category: "trending",
                        })
                    }
                />
                <FeaturedRow
                    lable={"popular"}
                    render={<Movie data={popular} />}
                    onPress={() =>
                        navigation.navigate("Listing", {
                            data: popular,
                            category: "popular",
                        })
                    }
                />
                <FeaturedRow
                    lable={"top rated"}
                    render={<Movie data={topRated} />}
                    onPress={() =>
                        navigation.navigate("Listing", {
                            data: topRated,
                            category: "top rated",
                        })
                    }
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const SearchInput = () => {
    return (
        <View className="my-3 bg-gray-300 px-2 py-1 mx-4 rounded-md flex-row items-center">
            <Ionicons name="search" size={20} color="gray" />
            <TextInput
                placeholder="Search Movies"
                className="flex-1 w-full px-2 py-2 text-white"
                placeholderTextColor={"gray"}
            />
        </View>
    );
};

export default HomeScreen;
