import {
   LOGIN,
   LOGIN_ERROR,
   LOGOUT,
   LOGOUT_ERROR,
   REGISTER,
   REGISTER_ERROR,
   STAGE_EMAIL,
   STAGE_PASSWORD,
   PUNCH,
   INIT
} from '../types';
import { AsyncStorage } from 'react-native';

const initialState = {
   user: null,
   loginError: null,
   logoutError: null,
   registerError: null,
   punchedIn: null, // grab from db
   lastPunch: null, // grab from db
   email: "test@gmail.com",
   password: "password",
}

const checkAuth = async () => {
  try {
    let user = await AsyncStorage.getItem('@gps_time_clock_id');
    return user;
  } catch (e) {
    return null;
  }
}

const rootReducer = (state = initialState, action) => {
    switch (action.type){
         case LOGIN:
            return {
                ...state,
                user: action.payload,
                loginErr: null
            };
         case LOGIN_ERROR: 
            return {
               ...state,
               loginError: action.payload,
            };
         case LOGOUT:
            return {
                ...state,
                user: null,
                logoutError: null
            };
         case LOGOUT_ERROR:
            return {
               ...state,
               logoutError: action.payload,
            }
         case REGISTER: 
            return {
                ...state,
                user: action.payload,
                registerError: null
            };
         case REGISTER_ERROR: 
            return {
               ...state,
               registerError: action.payload
            };
         case STAGE_EMAIL:
            return {
               ...state,
               email: action.payload
            };
         case STAGE_PASSWORD:
            return {
               ...state,
               password: action.payload
            }
         case PUNCH:
            console.log("Punched: " + new Date().toLocaleTimeString())
            console.log("punchedIn: " + !state.punchedIn);
            console.log("lastPunch: " + action.payload);
            return {
              ...state,
              punchedIn: !state.punchedIn,
              lastPunch: action.payload
            }
         case INIT: 
            console.log('state init to:');
            console.log('punchedIn: ' + payload.punchedIn);
            console.log('lastPunch: ' + payload.lastPunch);
            return {
              ...state,
              punchedIn: payload.punchedIn,
              lastPunch: payload.lastPunch
            }
         default:
            return state;
    }
};

export default rootReducer;