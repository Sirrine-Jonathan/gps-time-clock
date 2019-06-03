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

const initialState = {
   userID: null,
   loginError: null,
   logoutError: null,
   registerError: null,
}

const checkAuth = async () => {
   try {
      let userID = await AsyncStorage.getItem('@gps_time_clock_id');
      return userID;
   } catch (e) {
      return null;
   }
}

const rootReducer = (state = initialState, action) => {
    switch (action.type){
         case LOGIN:
            return {
                ...state,
                userID: action.payload,
            };
         case LOGIN_ERROR: 
            return {
               ...state,
               loginError: action.payload,
            };
         case LOGOUT:
            return {
                ...state,
                userID: null,
            };
         case LOGOUT_ERROR:
            return {
               ...state,
               logoutError: action.payload,
            }
         case REGISTER: 
            return {
                ...state,
                userID: action.payload,
            };
         case REGISTER_ERROR: 
            return {
               ...state,
               registerError: action.payload,
            }
         default:
            return state;
    }
};

export default rootReducer;