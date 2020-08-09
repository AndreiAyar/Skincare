import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import * as Icon from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

//import {MainState}
import {storeToken, readToken} from "../controllers/StorageHandler";
import validate from "../../shared/validate";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { CommonActions } from "@react-navigation/native";
import { MainStateContext } from "../context/MainContext";


const LOGIN_GQL = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      message
      token
    }
  }
`;
let allowRegister = { allowEmail: false, allowPassword: false };

const Logon = ({ navigation }) => {
  const [email, setEmail] = useState("a@a.a"); //null
  const [password, setPasword] = useState("aaaaaa"); //null
  const [message, setMessage] = useState({ emailErr: "", passErr: "" });
  const mainStateContext = useContext(MainStateContext);
  
  const [login, { data, loading }] = useMutation(LOGIN_GQL, {
    onCompleted(data) {
      // console.log(data.login.token)
      if (data.login.success) {
        //     console.log(` A venit din backend: ${data.login.token}`)
        storeToken(data.login.token);
        mainStateContext.setStoredData(data.login.token);
        //     navigation.dispatch(
        //        CommonActions.reset({
        //         index: 1,
        //        routes: [
        //         { name: 'Main' },

        //       ],
        //     })
        //  );

        // navigation.navigate('Main')
      }
    },
  });
  // const _storeData = async (data) => {
  //     try {
  //         await AsyncStorage.setItem('__token', data.login.token);
  //         console.log(`Successfully registered Token :  ${data.login.token}`)
  //     } catch (error) {
  //         // Error saving data
  //         console.log('An error Has Occured')
  //         console.log(error)
  //     }
  // };

  function messageHandler(message) {
    switch (message) {
      case "emailErr":
        setMessage((prevState) => ({
          ...prevState,
          emailErr: (prevState.emailErr = "Email must be of correct type."),
        }));
        break;
      case "passErr":
        setMessage((prevState) => ({
          ...prevState,
          passErr: (prevState.passErr = "Password must be 6 characters long."),
        }));
        break;
        break;
      default:
        break;
    }
  }
  const clearHandler = function (type) {
    setMessage((prevState) => ({
      ...prevState,
      [type]: null,
    }));
  };
  const allTrue = (obj) => {
    for (let key in obj) {
      if (!obj[key]) return false;
    }
    return true;
  };
  const submitHandler = () => {
    if (email == null || email.length < 4 || !validate(email)) {
      messageHandler("emailErr");
      allowRegister.allowEmail = false;
    } else {
      allowRegister.allowEmail = true;
      clearHandler("emailErr");
    }
    if (password == null || password.length < 6) {
      messageHandler("passErr");
      allowRegister.allowPassword = false;
    } else {
      allowRegister.allowPassword = true;
      clearHandler("passErr");
    }
    if (allTrue(allowRegister)) {
      try {
        login({ variables: { email: email, password: password } });
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.h1}>Login !</Text>
        <View style={{ alignContent: "center" }}>
          {Object.values(message).map((value, id) => (
            <Text
              style={{
                alignSelf: "center",
                fontStyle: "italic",
                color: "#c21253",
              }}
              key={id}
            >
              {value}
            </Text>
          ))}
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "bold",
              color: data && data.login.success ? "#3ec1cf" : "#c21253",
            }}
          >
            {allTrue(allowRegister) && data && data.login.message}
          </Text>
        </View>
        <View style={styles.input_container}>
          <Text style={styles.h2}>E-mail</Text>
          <TextInput
            label="E-mail"
            autoCompleteType="email"
            defaultValue={email}
            onChangeText={(text) => setEmail(text)}
            style={[
              styles.input,
              email != null && email.length == 0 && styles.input_empty,
            ]}
          />
          <Text style={styles.h2}>Password</Text>
          <TextInput
            label="Password"
            defaultValue={password}
            secureTextEntry
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setPasword(text)}
            style={[
              styles.input,
              password != null && password.length == 0 && styles.input_empty,
            ]}
          />
          <TouchableOpacity
            style={styles.auth_buttons_shadow}
            onPress={() => submitHandler()}
          >
            <LinearGradient
              colors={["#5C258D", "#4389A2", "#5C258D"]}
              start={[0, 8]}
              end={[4, 0]}
              location={[0, 0.5, 1]}
              style={styles.auth_buttons}
            >
              <Text
                style={{
                  backgroundColor: "transparent",
                  fontSize: 15,
                  color: "#fff",
                }}
              >
                Login
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text>Forgot your password ?</Text>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h1: {
    color: "#323643",
    fontSize: 26,
    fontWeight: "bold",

    marginLeft: 30,
  },
  h2: {
    color: "#C5CCD6",
    alignSelf: "flex-start",
    marginLeft: 25,
  },
  input_container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    alignSelf: "center",
    borderColor: "#979797",
    borderBottomWidth: 1,
    borderBottomColor: "#979797",
    width: 320,
    height: 35,
    marginBottom: 20,
  },
  input_empty: {
    alignSelf: "center",
    borderColor: "red",
    borderBottomWidth: 1,
    borderBottomColor: "red",
    width: 320,
    height: 35,
    marginBottom: 20,
  },
  auth_buttons: {
    width: 275,
    padding: 15,
    height: 48,
    alignItems: "center",
    borderRadius: 5,
    margin: 20,
  },
  auth_buttons_shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});

export default Logon;
