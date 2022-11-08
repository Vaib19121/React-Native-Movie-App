import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import React from "react";
import axios from "axios";
import useAuth from '../../hooks/useAuth'

export default function Signup() {
    const [signUpForm, setSignUpForm] = React.useState({
        firstName: { value: "", error: "" },
        middleName: { value: "", error: "" },
        lastName: { value: "", error: "" },
        email: { value: "", error: "" },
        password: { value: "", error: "" },
        phoneNumber: { value: "", error: "" },
        gender: { value: "", error: "" },
        hearAboutUs: { value: "", error: "" },
    });
    const {setAuthenticated } = useAuth();
    const genders = ["male", "female", "non-binary"];

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
            if (value.trim().length < 6) {
                error = "Minimum character limit is 5";
            } else if (value.trim().length > 20) {
                error = "Maximum character limit is 20";
            } else if (
                !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
                    value
                )
            ) {
                error = "Bad Password";
            } else {
                error = "";
            }
        } else if (
            name === "firstName" ||
            name === "name" ||
            name === "lastName" ||
            name === "middleName"
        ) {
            if (value.trim().length < 2) {
                error = "Minimum character limit is 2";
            }
        } else if (name === "phoneNumber" || name === "phone") {
            if (value.match(/[a-z]/gi)) {
                error = "Must be a number";
            } else if (value.trim().length < 10 || value.trim().length > 12) {
                error = "invalid number";
            }
        } else if (name === "gender") {
            if (value.trim().length === 0) {
                error = "Select your gender";
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
                console.log("-->", err);
                error = true;
            }
        }
        return { formCopy, error };
    };

    const extractSignUpFormData = () => {
        const addressdata = {
            address : "at nagpur",
            city :"Nagpur",
            state : "Abia",
            zipcode : 441104,
            landmark : "near town",
            latitude : 6.4535,
            longitude : 3.44566,
            phoneNumber : "1234657890",
            name : "addressName"
        }
        let data = {info:{},address:addressdata};
        const infoProperties = [
            "firstName",
            "middleName",
            "lastName",
            "email",
            "password",
            "phoneNumber",
            "gender",
            "hearAboutUs",
        ];
        
        for (const [mainKey, mainValue] of Object.entries(signUpForm)) {
            if (infoProperties.includes(mainKey)) {
                data.info[mainKey] = mainValue.value;
            } 
        }
        console.log("hi")
        return data;
    };

    const postSignUpForm = async () => {
        try {
            const { formCopy, error } = formFinalValidation(signUpForm);
            const formCopyData = formCopy;
            
            if (error) {
                console.log("postsignupform: " + error)
                setSignUpForm(formCopyData);
                return;
            }
            
            console.log("btn clicked",error);
            const data = extractSignUpFormData();
            console.log(data);

            const res = await axios.post(
                "http://192.168.43.235:3000/api/customer/signup",
                data
            );
            console.log(res.data);
            setAuthenticated(true);
            navigation.navigate("Home", { screen: "Explore" });
        } catch (err) {
            alert("Login Failed-->", err);
            console.log(err.response.data)
        }
    };
    const handleSignUpForm = (name, value) => {
        let formCopy = { ...signUpForm };

        formCopy[name].value = value;
        formCopy[name].error = handleFormValidation(name, value);

        setSignUpForm(formCopy);
    };

    return (
        <ScrollView>
            <View className="flex flex-wrap w-full  mt-10 ">
                <View className=" text-center">
                    <Text className="block text-sky-300 text-2xl text-center font-bold mb-2">
                        SIGN UP
                    </Text>
                </View>
                <View className="pl-6 pr-3 w-8/10">
                    <Text className="block text-sky-200 text-sm font-bold mb-2">
                        First Name
                    </Text>
                    <TextInput
                        id="firstName"
                        className={
                            "border mb-2 py-2 px-3 rounded-lg border-teal-300 text-emerald-200 w-full focus:bg-primary " +
                            (signUpForm.firstName.error ? "border-red-500" : "")
                        }
                        type="text"
                        placeholder="e.g. some.example"
                        value={signUpForm.firstName.value}
                        onChangeText={(text) =>
                            handleSignUpForm("firstName", text)
                        }
                    />
                    {signUpForm.firstName.error ? (
                        <Text className="text-red-500 text-xs italic">
                            {signUpForm.firstName.error}
                        </Text>
                    ) : null}
                </View>
                <View className="pl-6 pr-3 w-8/10">
                    <Text className="block text-sky-200 text-sm font-bold mb-2">
                        Middle Name
                    </Text>
                    <TextInput
                        id="MiddleName"
                        className={
                            "border mb-2 py-2 px-3 rounded-lg border-teal-300 text-emerald-200 w-full focus:bg-primary " +
                            (signUpForm.middleName.error
                                ? "border-red-500"
                                : "")
                        }
                        type="text"
                        placeholder="e.g. some.example"
                        value={signUpForm.middleName.value}
                        onChangeText={(text) =>
                            handleSignUpForm("middleName", text)
                        }
                    />
                    {signUpForm.middleName.error ? (
                        <Text className="text-red-500 text-xs italic">
                            {signUpForm.middleName.error}
                        </Text>
                    ) : null}
                </View>
                <View className="pl-6 pr-3 w-8/10">
                    <Text className="block text-sky-200 text-sm font-bold mb-2">
                        Last Name
                    </Text>
                    <TextInput
                        id="lastName"
                        className={
                            "border mb-2 py-2 px-3 rounded-lg border-teal-300 text-emerald-200 w-full focus:bg-primary " +
                            (signUpForm.lastName.error ? "border-red-500" : "")
                        }
                        type="text"
                        placeholder="e.g. some.example"
                        value={signUpForm.lastName.value}
                        onChangeText={(text) =>
                            handleSignUpForm("lastName", text)
                        }
                    />
                    {signUpForm.lastName.error ? (
                        <Text className="text-red-500 text-xs italic">
                            {signUpForm.lastName.error}
                        </Text>
                    ) : null}
                </View>

                <View className="pl-6 pr-3 w-8/10">
                    <Text className="block text-sky-200 text-sm font-bold mb-2">
                        Email
                    </Text>
                    <TextInput
                        id="email"
                        className={
                            "border mb-2 py-2 px-3 rounded-lg border-teal-300 text-emerald-200 w-full focus:bg-primary " +
                            (signUpForm.email.error ? "border-red-500" : "")
                        }
                        keyboardType="email-address"
                        placeholder="e.g. some.example"
                        value={signUpForm.email.value}
                        onChangeText={(text) => handleSignUpForm("email", text)}
                    />
                    {signUpForm.email.error ? (
                        <Text className="text-red-500 text-xs italic">
                            {signUpForm.email.error}
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
                            (signUpForm.password.error ? "border-red-500" : "")
                        }
                        secureTextEntry={true}
                        placeholder="* * * * * * * *"
                        value={signUpForm.password.value}
                        onChangeText={(text) =>
                            handleSignUpForm("password", text)
                        }
                    />
                    {signUpForm.password.error && (
                        <Text className="text-red-500 text-xs italic">
                            {signUpForm.password.error}
                        </Text>
                    )}
                </View>
                <View className="pl-6 pr-3 w-8/10">
                    <Text className="block text-sky-200 text-sm font-bold mb-2">
                        Phone Number
                    </Text>
                    <TextInput
                        id="Phone Number"
                        className={
                            "border mb-2 py-2 px-3 rounded-lg border-teal-300 text-emerald-200 w-full focus:bg-primary " +
                            (signUpForm.phoneNumber.error
                                ? "border-red-500"
                                : "")
                        }
                        keyboardType = 'numeric'
                        placeholder="* * * * * * * *"
                        value={signUpForm.phoneNumber.value}
                        onChangeText={(text) =>
                            handleSignUpForm("phoneNumber", text)
                        }
                    />
                    {signUpForm.phoneNumber.error && (
                        <Text className="text-red-500 text-xs italic">
                            {signUpForm.phoneNumber.error}
                        </Text>
                    )}
                </View>
                <View className="pl-6 pr-3 w-8/10">
                    <Text className="block text-sky-200 text-sm font-bold mb-2">
                        Gender
                    </Text>
                    <SelectDropdown
                        data={genders}
                        onSelect={(selectedItem, index) => {
                            handleSignUpForm("gender", selectedItem);
                        }}
                        defaultButtonText="Choose Gender"
                        buttonTextStyle={{ color: "#5eead4" }}
                        buttonStyle={{
                            backgroundColor: "transparent",
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: "green",
                            width: "100%",
                        }}
                        dropdownStyle={{
                            backgroundColor: "#0e7490",
                            borderColor: "green",
                            borderWidth: 1,
                            borderRadius: 10,
                        }}
                        rowTextStyle={{
                            textAlign: "left",
                            color: "#5eead4",
                        }}
                    />
                </View>
                <View className="pl-6 pr-3 mt-2 w-8/10">
                    <Text className="block text-sky-200 text-sm font-bold mb-2">
                        How did you hear About Us
                    </Text>
                    <SelectDropdown
                        data={["Facebook", "Youtube"]}
                        onSelect={(selectedItem, index) => {
                            handleSignUpForm("hearAboutUs", selectedItem);
                        }}
                        defaultButtonText="Choose Option"
                        buttonTextStyle={{ color: "#5eead4" }}
                        buttonStyle={{
                            backgroundColor: "transparent",
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: "green",
                            width: "100%",
                        }}
                        dropdownStyle={{
                            backgroundColor: "#0e7490",
                            borderColor: "green",
                            borderWidth: 1,
                            borderRadius: 10,
                        }}
                        rowTextStyle={{
                            textAlign: "left",
                            color: "#5eead4",
                        }}
                    />
                </View>

                <View className="flex justify-end mx-10 mt-10  w-3/4 self-center">
                    <TouchableOpacity
                        className="bg-sky-800 text-center  text-white font-bold py-3  rounded-lg "
                        onPress={() => postSignUpForm()}
                    >
                        <Text className="text-center text-white ">Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
