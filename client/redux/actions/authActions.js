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
   .then((res) => {
      if (res.error){
         dispatch(loginFail(res.error));
      } else {
         dispatch(loginSuccess(res));
      }
   })
   .catch((error) => {
      dispatch(loginFail(error))
   });
}

const logout = () => async dispatch => {
   storeID(null);
   dispatch({
      type: LOGOUT
   })
}

const register = (username, email, company, password, secret) => async dispatch => {
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
          "secret": secret
      })
   })
   .then((response) => response.json())
   .then((res) => {
      if (res.error){
         dispatch(registerFail(res.error));
      } else {
         dispatch(registerSuccess(res));
      }
   })
   .catch((error) => {
     dispatch(registerFail(error));
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