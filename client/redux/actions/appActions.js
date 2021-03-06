import {
   PUNCH,
   INIT,
   UPDATE_USER,
   UPDATE_USER_MSG,
   UPDATE_USER_LOADING,
   UPDATE_COMPANY,
   UPDATE_COMPANY_MSG,
   UPDATE_COMPANY_LOADING,
   UPDATE_USERS,
   UPDATE_ERROR,
   UPDATE_USERS_LOADING,
   SET_REPORTS_USER, 
   EMAIL_MSG,
   EMAIL_LOADING
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


const updateCompany = (payload) => ({
   type: UPDATE_COMPANY,
   payload: payload
})

const updateCompanyFail = (payload) => ({
   type: UPDATE_COMPANY_ERROR,
   payload: payload
})

// payload will have message property
const updateEmailMsg = (payload) => ({
   type: EMAIL_MSG,
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

   let url = null;
   if (punchedIn) {
      url = 'https://gps-time.herokuapp.com/time/addPunchOut';
   } else {
      url = 'https://gps-time.herokuapp.com/time/addPunchIn';
   }

   fetch(url, {
     method: 'POST',
     headers: {
         'Content-Type': 'application/json',
     },
     body: JSON.stringify(data)
   })
   .then((response) => {
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

const updateUserInfo = (email, username, password) => async (dispatch, getState) => {
   const user = getState().user;
   dispatch({
      type: UPDATE_USER_LOADING
   })
   fetch('https://gps-time.herokuapp.com/api/updateUser', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         oldEmail: user.email,
         email: email,
         username: username,
         password: password,
      })
   }).then((res) => {
      res.json().then((data) => {
         console.log(data);
         let newUserObj = user;
         newUserObj['username'] = data.user.username;
         newUserObj['email'] = data.user.email;
         dispatch(updateUser(newUserObj));
         dispatch({
            type: UPDATE_USER_MSG,
            payload: res,
         })
      })
   }).catch((error) => {
      console.error(error);
      dispatch({
         type: UPDATE_USER_MSG,
         payload: error
      });
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
         console.log('getCompanyUsers', employees);
         dispatch(updateUsers(employees));
      })
   }).catch((error) => {
      console.log(error);
   })
}

const toggleAdmin = (user) => async (dispatch, getState)  => {
   console.log('user', user);
   const url = "https://gps-time.herokuapp.com/api/toggleAdmin";
   await fetch(url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
   }).then((res) => {
      res.json().then((data) => {
         console.log({
            "modifiedCount": data.modifiedCount,
            "matchedCount": data.matchedCount
         });
      })
   }).catch((error) => {
      console.log(error);
      dispatch(updateCompanyFail(error));
   })
}

const isWorking = (email) => {
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
   return punchInfo.punchedIn;
}

const sendCSVEmail = (dateOne, dateTwo) => async (dispatch, getState) => {
   console.log(dateOne);
   console.log(dateTwo);
   dispatch({ type: EMAIL_LOADING })
   let email = getState().user.email;
   let company = getState().user.company;
   console.log(email);
   console.log(company);
   let url = "http://gps-time.herokuapp.com/time/sendcsvemail";
   fetch(url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         email: email,
         company: company,
         dateOne: dateOne,
         dateTwo: dateTwo
      })
   }).then((res) => {
      res.json().then( (data) => {
         console.log('heres the data', data);
         dispatch(updateEmailMsg(data));
      })
   }).catch( (err) => {
      dispatch(updateEmailMsg({ message: err.message }));
   })
}

module.exports = {
   addPunch,
   initPunchedState,
   updateUserInfo,
   updateCompanyInfo,
   getPunches,
   getCompanyUsers,
   setReportsUser,
   isWorking,
   toggleAdmin,
   sendCSVEmail
}