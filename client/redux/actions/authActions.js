import {
   LOGIN,
   LOGIN_ERROR,
   LOGOUT,
   LOGOUT_ERROR,
   REGISTER,
   REGISTER_ERROR,
   USERID
} from '../types';
import { AsyncStorage } from 'react-native';

const loginFail = (payload) => ({
   type: LOGIN_ERROR,
   payload: payload,
})

const loginSuccess = (payload) => ({
   type: LOGIN,
   payload: payload
})

const registerFail = (payload) => ({
   type: REGISTER_ERROR,
   payload: payload
})

const registerSuccess = (payload) => ({
   type: REGISTER,
   payload: payload
})

const login = (email, password) => async dispatch => {
  
     let res = null;
     fetch("https://gps-time.herokuapp.com/api/authenticate", {
         method: 'POST',
         headers: {
             Accept: 'application/json',
         },
         body: JSON.stringify({
             username: email,
             password: password,
         })
     })
         .then((response) => response.json())
         .then((responseJson) => {
            console.log('responseJson');
            console.log(responseJson);
            if (responseJson){
               res = responseJson;
               storeID(res);
               dispatch(loginSuccess(res));
            } else {
               dispatch(loginFail(true));
            }
         })
         .catch((error) => {
            dispatch(loginFail(true))
         });
}

const logout = () => async dispatch => {
   try {
      await AsyncStorage.setItem('@gps_time_clock_id', null);
   } catch (e) {
      console.log(e);
   }
   dispatch({
      type: LOGOUT
   })
}



const register = (username, email, company, password) => async dispatch => {

        fetch("https://gps-time.herokuapp.com/api/addUser", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: JSON.stringify({
                email: email,
                company: company,
                username: username,
                password: password,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
               console.log('responseJson');
               console.log(responseJson);
               if (responseJson){
                  res = responseJson;
                  storeID(res);
                  dispatch(registerSuccess(res));
               } else {
                  dispatch(registerFail(true));
               }
            })
            .catch((error) => {
              console.error(error);
              dispatch(registerFail(true));
            });
}

const storeID = async (id) => {
   try {
      await AsyncStorage.setItem('@gps_time_clock_id', id);
   } catch (e) {
      console.log(e);
   }
}

module.exports = {
   login, 
   logout,
   register
}