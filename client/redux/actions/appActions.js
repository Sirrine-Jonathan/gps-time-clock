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

addPunch(punchedIn, loc, email) {
   let url = null;
   if (punchedIn) {
      url = 'http://gps-time.herokuapp.com/time/addpunchin';
   } else {
      url = 'http://gps-time.herokuapp.com/time/addpunchout'
   }

   fetch(url, {
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
      console.log(response);
   });
}

initPunchedState(){
   fetch ('http://gps-time.herokuapp.com/time/getLastPunch', {
      method: 'GET',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         email: this.props.user.email
      }),
   }).then((res) => {
      dispatch(init({
         'punchedIn': res.punchedIn, 
         'lastPunch': new Date(res.lastPunch).getTime()
      }));
   })
}



module.exports = {
   addPunch,
   initPunchedState,
   initPunchedState,
}