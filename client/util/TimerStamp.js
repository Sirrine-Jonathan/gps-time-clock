const TimerStamp = {
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
   getPrettyTime: (stamp) => {
      return new Date(stamp).toLocaleString('en-US', { 
         "hour12": true,
         "weekday": "short",
         "year": "2-digit",
         "month": "short",
         "day": "2-digit",
         "hour": "2-digit",
         "minute": "2-digit",
      });
   }
}

const twoDigits = (num) => {
   if (num < 10){
      return "0" + num;
   }
   return num;
}

export default TimerStamp;