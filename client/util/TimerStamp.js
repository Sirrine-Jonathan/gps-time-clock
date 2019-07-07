const TimerStamp = {

   now: () => {
      return Date.now()
   },

   getHours: () => {
      return 'test';
   },
   getDifference: (stampOne, stampTwo) => {
      return Math.abs(stampOne - stampTwo);
   },
   getCounter: (now, lastPunch) => {
      let diff  = now - lastPunch;
      let sec   = Math.floor(diff / 1000);
      let min   = Math.floor(sec / 60);
      let hour  = Math.floor(min / 60);

      let secD  = twoDigits(sec % 60);
      let minD  = twoDigits(min % 60);
      let hourD = twoDigits(hour);
      return hourD + ":" + minD + ":" + secD;
   },

   // HH:MM:SS PM
   getPrettyTime: (stamp) => {
      return new Date(stamp).toLocaleTimeString('en-US', {
         'hour12': true
      }).toString();
   },

   // 
   getPrettyDate: (stamp) => {
      return new Date(stamp).toLocaleDateString('en-US');
   },

   // HH:MM PM
   getPrettyTimeTrimmed: (stamp) => {
      let arr = new Date(stamp).toLocaleTimeString('en-US', {
         'hour12': true
      }).split(':');
      let last = arr.pop();
      let lastSplit = last.split(' ');
      let final = arr.join(':') + " " + lastSplit[1];
      return final;
   },

   //
   getPrettyDateTime: (stamp) => {
      return new Date(stamp).toLocaleString('en-US', {
         'hour12': true
      });
   },

   //
   getPrettyDateTimeTrimmed: (stamp) => {
      let arr = new Date(stamp).toLocaleString('en-US', {
         'hour12': true
      }).split(':');
      let last = arr.pop();
      let lastSplit = last.split(' ');
      let final = arr.join(':') + " " + lastSplit[1];
      return final;
   }
}

const twoDigits = (num) => {
   if (num < 10){
      return "0" + num;
   }
   return num;
}

export default TimerStamp;