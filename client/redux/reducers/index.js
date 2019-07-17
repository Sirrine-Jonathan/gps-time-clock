import {
   LOGIN,
   LOGIN_ERROR,
   LOGOUT,
   LOGOUT_ERROR,
   REGISTER,
   REGISTER_ERROR,
   STAGE_USERNAME,
   STAGE_EMAIL,
   STAGE_PASSWORD,
   STAGE_COMPANY,
   STAGE_SECRET,
   PUNCH,
   INIT,
   UPDATE_ERROR,
   UPDATE_USERS,
   REGISTER_LOADING,
   LOGIN_LOADING,
   SET_REPORTS_USER
} from '../types';
import { AsyncStorage } from 'react-native';

const initialState = {
   user: null,
   loginError: null,
   logoutError: null,
   registerError: null,
   punchedIn: null, // grab from db
   lastPunch: null, // grab from db
   username: "",
   email: "test@gmail.com",
   password: "password",
   company: "",
   secret: "",
   updateError: null,
   users: null,
   registerLoading: false,
   loginLoading: false,
   reportsUser: null,
   reportsUsersPunches: []
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
                reportsUser: action.payload,
                loginErr: null,
                loginLoading: false
            };
         case LOGIN_ERROR: 
            return {
               ...state,
               loginError: action.payload,
               loginLoading: false,
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
                registerError: null,
                registerLoading: false
            };
         case REGISTER_ERROR: 
            return {
               ...state,
               registerError: action.payload,
               registerLoading: false
            };
         case STAGE_USERNAME: 
            return {
               ...state,
               username: action.payload
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
            };
         case STAGE_COMPANY:
            return {
               ...state,
               company: action.payload
            };
         case STAGE_SECRET:
            return {
               ...state,
               secret: action.payload
            };
         case PUNCH:
            return {
              ...state,
              punchedIn: !state.punchedIn,
              lastPunch: action.payload
            };
         case INIT: 
            return {
              ...state,
              punchedIn: action.payload.punchedIn,
              lastPunch: action.payload.lastPunch
            };
         case UPDATE_ERROR:
            return {
              ...state,
              updateError: action.payload
            };
         case UPDATE_USERS:
            return {
              ...state,
              users: action.payload
            };
         case REGISTER_LOADING:
            return {
              ...state,
              registerLoading: action.payload
            };
         case LOGIN_LOADING:
            return {
              ...state,
              loginLoading: action.payload
            }
         case SET_REPORTS_USER:
            return {
              ...state,
              reportsUser: action.payload.user,
              reportsUsersPunches: action.payload.punches
            }
         default:
            return state;
    }
};

export default rootReducer;