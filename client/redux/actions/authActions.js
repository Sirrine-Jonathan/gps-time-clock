import {
   LOGIN,
   LOGIN_ERROR,
   LOGOUT,
   LOGOUT_ERROR,
   REGISTER,
   REGISTER_ERROR,
   STAGE_EMAIL,
   STAGE_PASSWORD
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


const stageEmail = (payload) => ({
   type: STAGE_EMAIL,
   payload: payload
})

const stagePassword = (payload) => ({
   type: STAGE_PASSWORD,
   payload: payload
})

const login = (email, password) => async dispatch => { 
  console.log('email', email);
  console.log('password', password);
  fetch("https://gps-time.herokuapp.com/api/authenticate", {
      method: 'POST',
      headers: {
          "Content-Type": 'application/json',
      },
      body: JSON.stringify({
          "username": email,
          "password": password,
      })
  })
   .then((response) => response.json())
   .then((responseJson) => {
      console.log('responseJson');
      console.log(responseJson);
      if (responseJson){
         console.log('login successful');
         let res = responseJson;
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
   storeID(null);
   dispatch({
      type: LOGOUT
   })
}

const register = (username, email, company, password) => async dispatch => {
   fetch("https://gps-time.herokuapp.com/api/addUser", {
      method: 'POST',
      headers: {
          "Content-Type": 'application/json',
      },
      body: JSON.stringify({
          "email": email,
          "company": company,
          "username": username,
          "password": password,
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
      console.log('login state stored in local storage');
   } catch (e) {
      console.log(e);
   }
}

module.exports = {
   login, 
   logout,
   register,
   stageEmail,
   stagePassword
}