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

const addPunch = (punchedIn, loc, email) => async (dispatch, getState) => {
   let url = null;
   if (punchedIn) {
      url = 'http://gps-time.herokuapp.com/time/addpunchin';
   } else {
      url = 'http://gps-time.herokuapp.com/time/addpunchout'
   }

   await fetch(url, {
     method: 'POST',
     headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
     },
     body: JSON.stringify({
         email: this.props.user.email,
         timestamp: Date.now(),
         location: loc.lat + ", " + loc.long,
     }),
   }).then((response) => {
      dispatch(punch(Date.now()));
   });
}

const initPunchedState = () => async (dispatch, getState) => {
   const user = getState().user;
   fetch ('http://gps-time.herokuapp.com/time/getLastPunch', {
      method: 'GET',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         email: user.email
      })
   }).then((res) => {
      dispatch(init({
         'punchedIn': res.punchedIn, 
         'lastPunch': res.lastPunch
      }));
   })
}

const updateUser = (email, username, password) => {
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