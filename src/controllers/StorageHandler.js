import { AsyncStorage } from "react-native";

const storeToken = async (data) => {
    try {
        await AsyncStorage.setItem('__token', data);
        console.log(`Successfully registered Token :  ${data}`)
    } catch (error) {
        // Error saving data
        console.log('An error Has Occured')
        console.log(error)
    }
};

const readToken = async (token) => {
    let readedToken;
    try {
       await AsyncStorage.getItem("__token", (error, result) => {
            error
                ? readedToken = null
                : result == null
                    ? readedToken = null
                    : readedToken = result;

           
        })
    } catch (error) {
        console.log('An error Has Occured')
        console.log(error)
    }
    return readedToken;
};


export {
    storeToken,
    readToken
}