import {
   PUNCH,
   INIT
} from '../types';
import { AsyncStorage } from 'react-native';

const punch = (payload) => ({
   type: PUNCH,
   payload: payload,
})

/*
   payload.punchedIn boolean
   payload.lastPunch timestamp
*/
const init = (payload) => ({
   type: INIT, 
   payload: payload,
})

const addPunch = (loc, ) => async (dispatch, getState) => {
   const user = getState().user;
   const punchedIn = getState().punchedIn; console.log(punchedIn);
   const stamp = Date.now();

   let data = {
      email: user.email,
      timestamp: stamp,
      location: loc.lat + ", " + loc.long,
   };

   let url = null;
   if (punchedIn) {
      url = 'https://gps-time.herokuapp.com/time/addPunchIn';
   } else {
      url = 'https://gps-time.herokuapp.com/time/addPunchOut'
   }

   fetch(url, {
     method: 'POST',
     headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
     },
     body: JSON.stringify(data)
   }).then((response) => {
      console.log(response);
      dispatch(punch(stamp));
   });
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
         Accept: 'application/json',
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
   })
}


module.exports = {
   addPunch,
   initPunchedState,
   updateUser
}