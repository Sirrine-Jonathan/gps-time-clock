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
   UPDATE_USER,
   UPDATE_USER_MSG,
   UPDATE_USER_LOADING,
   UPDATE_COMPANY,
   UPDATE_COMPANY_MSG,
   UPDATE_COMPANY_LOADING,
   REGISTER_LOADING,
   LOGIN_LOADING,
   SET_REPORTS_USER,
   EMAIL_MSG,
   EMAIL_LOADING,
   RECOVER_RESPONSE,
   RECOVER_LOADING,
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
   email: "jjreed05@gmail.com",
   password: "password",
   company: "",
   secret: "",
   updateError: null,
   users: null,
   registerLoading: false,
   loginLoading: false,
   reportsUser: null,
   reportsUsersPunches: [],
   emailMsg: null,
   emailLoading: false,
   recoverMsg: null,
   recoverLoading: false,
   updateUserMsg: null,
   updateUserLoading: false,
   updateCompanyMsg: null,
   updateCompanyLoading: false,
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
         case UPDATE_USER: 
            return {
              ...state,
              user: action.payload
            }
         case UPDATE_USER_LOADING:
            console.log('UPDATE_USER_LOADING');
            return {
              ...state,
              updateUserMsg: null,
              updateUserLoading: true
            }
         case UPDATE_USER_MSG:
            return {
              ...state,
              updateUserMsg: action.payload.message,
              updateUserLoading: false,
            }
         case UPDATE_COMPANY_LOADING:
            return {
              ...state,
              updateCompanyMsg: null,
              updateCompanyLoading: true,
            }
         case UPDATE_COMPANY_MSG:
            return {
              ...state,
              updateCompanyMsg: action.payload,
              updateCompanyLoading: false,
            }
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
            };
         case EMAIL_LOADING: 
            return {
                ...state,
                emailMsg: null,
                emailLoading: true,
            }
         case EMAIL_MSG:
            console.log(action);
            return {
                ...state,
                emailMsg: action.payload.message,
                emailLoading: false,
            };
         case RECOVER_LOADING: 
            return {
                ...state,
                recoverLoading: true,
                recoverMsg: null,
            }
         case RECOVER_RESPONSE: 
            return {
                ...state,
                recoverLoading: false,
                recoverMsg: action.payload
            }
         default:
            return state;
    }

};

export default rootReducer;