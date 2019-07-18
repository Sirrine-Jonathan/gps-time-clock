import {
	PUNCH,
	INIT,
	UPDATE_ERROR,
	UPDATE_USERS,
	UPDATE_USER,
	UPDATE_USER_ERROR,
	UPDATE_COMPANY,
	UPDATE_COMPANY_ERROR,
	SET_REPORTS_USER
} from '../types';
import { AsyncStorage } from 'react-native';

const passReportsUser = (payload) => ({
	type: SET_REPORTS_USER,
	payload: payload,
})

const punch = (payload) => ({
	type: PUNCH,
	payload: payload,
})

const init = (payload) => ({
	type: INIT, 
	payload: payload,
})

const updateUsersFail = (payload) => ({
   type: UPDATE_ERROR,
   payload: payload
})

const updateUsers = (payload) => ({
   type: UPDATE_USERS,
   payload: payload
})

const updateUser = (payload) => ({
   type: UPDATE_USER,
   payload: payload
})

const updateUserFail = (payload) => ({
   type: UPDATE_USER_ERROR,
   payload: payload
})

const updateCompany = (payload) => ({
   type: UPDATE_COMPANY,
   payload: payload
})

const updateCompanyFail = (payload) => ({
   type: UPDATE_COMPANY_ERROR,
   payload: payload
})

const setReportsUser = (user) => async (dispatch) => {
   let punches = [];
   if (user.email){
      punches = await localGetPunches(user.email);
   }
   dispatch(passReportsUser({
      user,
      punches
   }));
};


const addPunch = (loc) => async (dispatch, getState) => {
   const user = getState().user;
   const punchedIn = getState().punchedIn;
   const stamp = Date.now();

   let data = {
      email: user.email,
      timestamp: stamp,
      location: loc.lat + ", " + loc.long,
   }

   console.log(data);

   let url = null;
   if (punchedIn) {
      url = 'https://gps-time.herokuapp.com/time/addPunchOut';
   } else {
      url = 'https://gps-time.herokuapp.com/time/addPunchIn';
   }

   console.log(url);

   fetch(url, {
     method: 'POST',
     headers: {
         'Content-Type': 'application/json',
     },
     body: JSON.stringify(data)
   })
   .then((response) => {
      console.log(response);
      dispatch(punch(stamp));
   }).catch((error) => {
      console.log(error);
   })
}

const getPunches = (email) => async (dispatch, getState) => {
   if (!email)
      email = getState().user.email;
   let url = "https://gps-time.herokuapp.com/time/getPunches?email=" + email;
   let punches = [];
   await fetch (url, {}).then((res) => {
      res.json().then((data) => {
         punches = data.punches;
      })
   }).catch((error) => {
      console.log(error);
      punches = error;
   })
   return punches;
}

const localGetPunches = async (email) => {
   if (!email)
      email = getState().user.email;
   let url = "https://gps-time.herokuapp.com/time/getPunches?email=" + email;
   let punches = [];
   await fetch (url, {}).then((res) => {
      res.json().then((data) => {
         punches = data.punches;
      })
   }).catch((error) => {
      console.log(error);
      punches = error;
   })
   return punches;
}

const initPunchedState = () => async (dispatch, getState) => {
   const user = getState().user;
   let url = "https://gps-time.herokuapp.com/time/getLastPunch?email=" + user.email;
   fetch (url, {}).then((res) => {
      res.json().then((data) => {
         dispatch(init({
            'punchedIn': data.punchedIn, 
            'lastPunch': data.lastPunch
         }));
      })
   }).catch((err) => {
      console.log(err);
   })
}

const getLastPunch = (email) => async (dispatch, getState) => {
   console.log("getLastPunch");
   console.log(email);
   let punchInfo = null;
   let url = "https://gps-time.herokuapp.com/time/getLastPunch?email=" + email;
   fetch (url, {}).then((res) => {
      res.json().then((data) => {
         if (!data.error)
            punchInfo = data;
      })
   }).catch((err) => {
      console.log('error');
      console.log(err);
   })
   return punchInfo;
}

const updateUserInfo = (email, username, password) => async (dispatch, getState) => {
   const user = getState().user;
   fetch('https://gps-time.herokuapp.com/api/updateUser', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         oldEmail: user.email,
         company: user.company,
         isAdmin: user.isAdmin,
         email: email,
         username: username,
         password: password,
      })
   }).then((res) => {
      console.log(res);
   }).catch((error) => {
     console.error(error);
     dispatch(updateUserFail(true));
   });
}

const updateCompanyInfo = (company, secret) => async (dispatch, getState) => {
   const user = getState().user;
   fetch('https://gps-time.herokuapp.com/api/updateCompany', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         oldCompany: user.company,
         company: company,
         secret: secret,
      })
   }).then((res) => {
      console.log(res);
      dispatch(updateCompany(res));
   }).catch((error) => {
      console.log(error);
      dispatch(updateCompanyFail(error));
   })
}

const getCompanyUsers = (company) => async (dispatch, getState) => {
   const company = company || getState().user.company;
   const current_user = getState().user;
   const url = 'https://gps-time.herokuapp.com/api/getCompanyUsers?company=' + company;
   fetch(url, {}).then((res) => {
      res.json().then((data) => {
         let employees = data.filter((user) => user.email != current_user.email);
         dispatch(updateUsers(employees));
      })
   }).catch((error) => {
      console.log(error);
   })
}

const isWorking = (email) => {
   const url = 'https://gps-time.herokuapp.com/api/isWorking?email=' + email;
   let isWorking = false;
   fetch(url, {}).then((res) => {
      isWorking = res;
   }).catch((error) => {
      console.log(error);
   })
   return isWorking;
}

module.exports = {
   addPunch,
   initPunchedState,
   updateUserInfo,
   updateCompanyInfo,
   getPunches,
   getCompanyUsers,
   getLastPunch,
   setReportsUser,
   isWorking
}