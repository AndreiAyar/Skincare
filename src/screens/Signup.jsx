import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

import * as Icon from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import validate from '../../shared/validate'

const REGISTER_GQL = gql`
mutation register($username: String!, $password: String!, $email:String!) {
    register(username: $username, password:$password, email:$email) {
    user{
      username
      email
    }
    message
    success
  }
}
`;
let allowRegister = { allowUser: false, allowEmail: false, allowPassword: false, allowPasswordConfirm: false }

const Signup = () => {
    const [userName, setUserName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [passwordConfirm, setPasswordConfirm] = useState(null)
    let [message, setMessage] = useState({ userErr: '', emailErr: '', passErr: '', confirmPassErr: '', passwordMissmatchErr: '' })

    const [register, { data, loading }] = useMutation(REGISTER_GQL, {
        onCompleted(data) {
            console.log(data.register)
       //    setUserName(null)
       //     setEmail(null)
       //     setPassword(null)
        //    setPasswordConfirm(null)
        }
    })

    function messageHandler(message) {
        switch (message) {
            case 'emailErr':
                setMessage(prevState => ({
                    ...prevState,
                    emailErr: prevState.emailErr = 'Email must be of correct type.'
                }))
                break;
            case 'userErr':
                setMessage(prevState => ({
                    ...prevState,
                    userErr: prevState.userErr = 'Username must be 4 characters long.'
                }))
                break;
            case 'passErr':
                setMessage(prevState => ({
                    ...prevState,
                    passErr: prevState.passErr = 'Password must be 6 characters long.'
                }))
                break;
            case 'confirmPassErr':
                setMessage(prevState => ({
                    ...prevState,
                    confirmPassErr: prevState.confirmPassErr = 'Confirmation password must be 6 characters long.'
                }))
                break;
            case 'passwordMissmatchErr':
                setMessage(prevState => ({
                    ...prevState,
                    passwordMissmatchErr: prevState.passwordMissmatchErr = 'Both passwords must be identical.'
                }))
                break;
            default:
                break;
        }

    }
    const clearHandler = function (type) {
        setMessage(prevState => ({
            ...prevState,
            [type]: null
        }))
    }

    const allTrue = (obj) => {
        for (let key in obj) {
            if (!obj[key]) return false
        }
        return true;
    }
    const submitHandler = () => {
        if (userName == null || userName.length < 4) {
            messageHandler('userErr');
            allowRegister.allowUser = false;
        } else {
            clearHandler('userErr')
            allowRegister.allowUser = true;
        }
        if (email == null || email.length < 4 || !validate(email)) {
            messageHandler('emailErr')
            allowRegister.allowEmail = false;
        } else {
            clearHandler('emailErr')
            allowRegister.allowEmail = true;
        }
        if (password == null || password.length < 6) {
            messageHandler('passErr')
            allowRegister.allowPassword = false;
        } else if (password !== passwordConfirm && (password !== null || password.length < 0)) {
            messageHandler('passwordMissmatchErr')
            allowRegister.allowPassword = false;
        } else {
            clearHandler('passErr')
            clearHandler('passwordMissmatchErr')
            allowRegister.allowPassword = true;
        }
        if (passwordConfirm == null || passwordConfirm.length < 6) {
            messageHandler('confirmPassErr')
            allowRegister.allowPasswordConfirm = false;
        } else if (passwordConfirm !== password && (passwordConfirm !== null || passwordConfirm.length < 0)) {
            messageHandler('passwordMissmatchErr')
            allowRegister.allowPasswordConfirm = false;
        } else {
            clearHandler('confirmPassErr')
            clearHandler('passwordMissmatchErr')
            allowRegister.allowPasswordConfirm = true;
        }


        console.log(allTrue(allowRegister))//
        // console.log(`${userName} ${email} ${password} ${passwordConfirm} ${allowRegister}`)
        if (allTrue(allowRegister)) {
            register({ variables: { username: userName, email: email, password: password } })
        }

    }

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <Text style={styles.h1}>Signup !</Text>
                <View style={{ alignContent: 'center' }}>
                    {Object.values(message).map((value, id) => <Text style={{ alignSelf: 'center', fontStyle: 'italic', color: "#c21253" }} key={id}>{value}</Text>)}
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: data && data.register.success ? "#3ec1cf" : "#c21253"  }}>{allTrue(allowRegister) && data && data.register.message}</Text>
                </View>
                {/*Object.values(message).map((value, id) => <Text style={{ alignSelf: 'center', fontStyle: 'italic', color: "#c21253" }} key={id}>{value}</Text>)*/}
                <View style={styles.input_container}>
                    <Text style={styles.h2}>E-mail</Text>
                    <TextInput
                        label="E-mail"
                        placeholder='email@example.com'
                        autoCorrect={true}
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        defaultValue={email}
                        style={[styles.input, email != null && email.length == 0 && styles.input_empty]}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Text style={styles.h2}>Username</Text>
                    <TextInput
                        label="Username"
                        placeholder='Type your desired username'
                        defaultValue={userName}
                        style={[styles.input, (userName != null && userName.length == 0) && styles.input_empty]}
                        onChangeText={(text) => setUserName(text)}
                    />
                    <Text style={styles.h2}>Password</Text>
                    <TextInput
                        label="Password"
                        defaultValue={password}
                        placeholder="Please enter your password"
                        secureTextEntry
                        autoComplete="off"
                        multiline={false}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={[styles.input, password != null && password.length == 0 && styles.input_empty]}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Text style={styles.h2}>Repeat Password</Text>
                    <TextInput
                        label="Repeat password"
                        defaultValue={passwordConfirm}
                        placeholder='Please confirm your password'
                        secureTextEntry
                        autoComplete="off"
                        autoCapitalize="none"
                        multiline={false}
                        autoCorrect={false}
                        style={[styles.input, passwordConfirm != null && passwordConfirm.length == 0 && styles.input_empty]}
                        onChangeText={(text) => setPasswordConfirm(text)}
                    />
                    <TouchableOpacity onPress={() => submitHandler()} style={styles.auth_buttons_shadow} >
                        <LinearGradient
                            colors={['#5C258D', '#4389A2', '#5C258D']}
                            start={[0, 8]}
                            end={[4, 0]}
                            location={[0, 0.5, 1]}
                            style={styles.auth_buttons}>

                            <Text
                                style={{
                                    backgroundColor: 'transparent',
                                    fontSize: 15,
                                    color: '#fff',
                                }}>
                                Signup
                                   </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    h1: {
        color: '#323643',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 30,

        justifyContent: 'space-between'
    },
    h2: {
        color: '#C5CCD6',
        alignSelf: 'flex-start',
        marginLeft: 25,
    },
    input_container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',

    },
    input: {
        alignSelf: 'center',
        borderColor: '#979797',
        borderBottomWidth: 1,
        borderBottomColor: '#979797',
        width: 320,
        height: 35,
        marginBottom: 20
    },
    input_empty: {
        alignSelf: 'center',
        borderColor: 'red',
        borderBottomWidth: 1,
        borderBottomColor: 'red',
        width: 320,
        height: 35,
        marginBottom: 20
    },
    auth_buttons: {
        width: 275,
        padding: 15,
        height: 48,
        alignItems: 'center',
        borderRadius: 5,
        margin: 20,
    },
    auth_buttons_shadow: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    }
})

export default Signup;












