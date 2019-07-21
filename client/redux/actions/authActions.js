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
   LOGIN_LOADING,
   REGISTER_LOADING,
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

const stageUsername = (payload) => ({
   type: STAGE_USERNAME,
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

const stageCompany = (payload) => ({
   type: STAGE_COMPANY,
   payload: payload
})

const stageSecret = (payload) => ({
   type: STAGE_SECRET,
   payload: payload
})

const loginLoading = (payload) => ({
   type: LOGIN_LOADING,
   payload: payload
})

const registerLoading = (payload) => ({
   type: REGISTER_LOADING,
   payload: payload
})

const updateRegisterLoading = (isLoading) => {
  dispatch(registerLoading(isLoading));
}

const updateLoginLoading = (isLoading) => {
  dispatch(loginLoading(isLoading));
}

const sendRecoveryEmail = (email) => async dispatch => {
	console.log('redux sendRecoveryEmail');
	console.log('email', email);
	let msg = null;
	await fetch("https://gps-time.herokuapp.com/reset/forgotPassword", {
		method: 'POST',
		headers: {
		  "Content-Type": 'application/json',
		},
		body: JSON.stringify({
			"email": email,
		})
	})
	.then((response) => response.json())
	.then((res) => {
		msg = res;
	})
	.catch((error) => {
		msg = error;
	});
	return msg;
};

const login = (email, password) => async dispatch => { 
  dispatch(loginLoading(true));
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
    try {
        await AsyncStorage.removeItem('EMAIL', () => {
            console.log("Removed Email");
        });
        await AsyncStorage.removeItem('PASSWORD', () => {
            console.log("Removed Password");
        });
    } catch (error) {
        console.log(error);
    } finally {
        dispatch({
            type: LOGOUT
        })
    }
}

const register = (username, email, company, password, secret) => async dispatch => {
   dispatch(registerLoading(true));
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

const deleteAccount = () => async (dispatch, getState) => {
const user = getState().user;
fetch("https://gps-time.herokuapp.com/api/deleteUser", {
      method: 'POST',
      headers: {
          "Content-Type": 'application/json',
      },
      body: JSON.stringify({
          "email": user.email
      })
   })
   .then((response) => response.json())
   .then((res) => {
      if (res.error){
        console.log(res);
      } else {
        console.log(res);
        logout();
      }

   })
   .catch((error) => {
     console.log(error);
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
   stageUsername,
   stageEmail,
   stagePassword,
   stageCompany,
   stageSecret,
   sendRecoveryEmail,
   updateRegisterLoading,
   updateLoginLoading,
   deleteAccount,
}