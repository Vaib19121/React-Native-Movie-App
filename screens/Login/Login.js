import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    AsyncStorage,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

export default function Login() {
    const [signInForm, setSignInForm] = React.useState({
        email: { value: "", error: "" },
        password: { value: "", error: "" },
    });
    const {setAuthenticated,setName } = useAuth();
    const [users, SetUsers] = React.useState([]);
    let navigation = useNavigation();

    const handleFormValidation = (name, value) => {
        let error = "";
        if (name === "email") {
            if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) {
                error = "Invalid Email";
            } else {
                error = "";
            }
        } else if (name === "password") {
            if (value.trim().length < 5) {
                error = "Minimum character limit is 5";
            } else if (value.trim().length > 20) {
                error = "Maximum character limit is 20";
            } else {
                error = "";
            }
        }

        return error;
    };

    const formEmptyAndErrorValidation = (form, key) => {
        let error = "";
        if (form.value.trim().length === 0 && form.error.trim().length === 0) {
            error = `${key} should not be empty`;
        } else if (
            form.value.trim().length === 0 &&
            form.error.trim().length !== 0
        ) {
            error = form.error;
        } else if (
            form.value.trim().length !== 0 &&
            form.error.trim().length !== 0
        ) {
            error = `${key} is not valid`;
        }
        return error;
    };

    const formFinalValidation = (form) => {
        let error = false;
        let formCopy = { ...form };

        for (const [mainKey, mainValue] of Object.entries(form)) {
            let err = "";

            err = formEmptyAndErrorValidation(mainValue, mainKey);

            formCopy[mainKey].error = err;
            if (err) {
                console.log("--->", err);
                error = true;
            }
        }
        return { formCopy, error };
    };

    const extractSignInFormData = () => {
        let data = {};

        for (const [mainKey, mainValue] of Object.entries(signInForm)) {
            const key = mainKey;
            data[key] = mainValue.value;
        }
        return data;
    };

    const postSignInForm = async () => {
        try {
            console.log("btn clicked");
            const { error, formCopy } = formFinalValidation(signInForm);
            const formCopyData = formCopy;

            if (error) {
                setSignInForm(formCopyData);
                return;
            }

            const data = extractSignInFormData();
            // console.log(data);

            const res = await axios.post(
                "http://192.168.43.235:3000/api/customer/login",
                data
            );
            setAuthenticated(true);
            console.log(res.data)
            setName(res.data.customer.firstName);
            navigation.navigate("Home", { screen: "Explore" });
        } catch (err) {
            alert("Login Failed-->", err);
        }
    };
    const handleSignInForm = (name, value) => {
        let formCopy = { ...signInForm };

        formCopy[name].value = value;
        formCopy[name].error = handleFormValidation(name, value);

        setSignInForm(formCopy);
    };

    return (
        <SafeAreaView className="mt-24">
            <View className="flex flex-wrap w-full  mt-20 ">
                <View className=" text-center">
                    <Text className="block text-sky-300 text-2xl text-center font-bold mb-2">
                        SIGN IN
                    </Text>
                </View>
                <View className="pl-6 pr-3 w-8/10">
                    <Text className="block text-sky-200 text-sm font-bold mb-2">
                        Email
                    </Text>
                    <TextInput
                        id="email"
                        className={
                            "border mb-2 py-2 px-3 rounded-lg border-teal-300 text-emerald-200 w-full focus:bg-primary " +
                            (signInForm.email.error ? "border-red-500" : "")
                        }
                        type="text"
                        placeholder="e.g. some.example"
                        value={signInForm.email.value}
                        onChangeText={(text) => handleSignInForm("email", text)}
                    />
                    {signInForm.email.error ? (
                        <Text className="text-red-500 text-xs italic">
                            {signInForm.email.error}
                        </Text>
                    ) : null}
                </View>
                <View className="pl-6 pr-3 w-8/10">
                    <Text className="block text-sky-200 text-sm font-bold mb-2">
                        Password
                    </Text>
                    <TextInput
                        id="password"
                        className={
                            "border mb-2 py-2 px-3 rounded-lg border-teal-300 text-emerald-200 w-full focus:bg-primary " +
                            (signInForm.password.error ? "border-red-500" : "")
                        }
                        type="password"
                        placeholder="* * * * * * * *"
                        value={signInForm.password.value}
                        onChangeText={(text) =>
                            handleSignInForm("password", text)
                        }
                    />
                    {signInForm.password.error && (
                        <Text className="text-red-500 text-xs italic">
                            {signInForm.password.error}
                        </Text>
                    )}
                </View>
                <View className="flex justify-end mx-10 mt-10  w-3/4 self-center">
                    <TouchableOpacity
                        className="bg-sky-800 text-center  text-white font-bold py-3  rounded-lg "
                        onPress={() => postSignInForm()}
                    >
                        <Text className="text-center text-white ">Sign in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
