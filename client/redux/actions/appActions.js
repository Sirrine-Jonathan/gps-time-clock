import {
   PUNCH,
   INIT,
   UPDATE_ERROR
} from '../types';
import { AsyncStorage } from 'react-native';

const punch = (payload) => ({
   type: PUNCH,
   payload: payload,
})

const init = (payload) => ({
   type: INIT, 
   payload: payload,
})

const updateFail = (payload) => ({
   type: UPDATE_ERROR,
   payload: payload
})

const addPunch = (loc, ) => async (dispatch, getState) => {
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

const initPunchedState = () => async (dispatch, getState) => {
   const user = getState().user;
   let url = "https://gps-time.herokuapp.com/time/getLastPunch?email=" + user.email;
   fetch (url, {}).then((res) => {
      res.json().then((data) => {
         console.log(data);
         console.log(data.punchedIn);
         console.log(data.lastPunch);
         dispatch(init({
            'punchedIn': data.punchedIn, 
            'lastPunch': data.lastPunch
         }));
      })
   })
}

const updateUser = (email, username, password) => async (dispatch, getState) => {
   const user = getState().user;
   fetch('http://gps-time.herokuapp.com/api/updateUser', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         newEmail: email,
         newUsername: username,
         newPassword: password,
         email: user.email,
         company: user.company,
         isAdmin: user.isAdmin
      })
   }).then((res) => {
      console.log(res);
   }).catch((error) => {
     console.error(error);
     dispatch(updateFail(true));
   });
}


module.exports = {
   addPunch,
   initPunchedState,
   updateUser,
   getPunches
}