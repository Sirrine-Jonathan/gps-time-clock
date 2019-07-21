const FormatStamp = {

	now: () => {
		return Date.now()
	},

	getUnix: (dateString) => {
		return new Date(dateString).getTime();
	},

	getDateString: (miliseconds) => {
		let date = new Date(miliseconds);
		let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		let months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		];
		let day = week[date.getDay()];
		let month = months[date.getMonth()];
		let year = date.getFullYear();
		// etc Monday: January 26, 2019
		return (day + ': ' + month + ' ' + date.getDate() + ', ' + year);
	},

	getHoursUnformatted: (stampOne, stampTwo) => {
		let hours =  stampTwo - stampOne;
		return (hours/1000/3600);
	},

	getHours: (stampOne, stampTwo) => {
		let hours =  stampTwo - stampOne;
		return (hours/1000/3600).toFixed(2);
	},

	getDifference: (stampOne, stampTwo) => {
		return Math.abs(stampOne - stampTwo);
	},

	getPrettyDifference: (stampOne, stampTwo) => {
		let diff = Math.abs(stampOne - stampTwo);
		let seconds = diff / 1000;
		let days = Math.floor(seconds / 86400);
		seconds -= days * 86400;
		let hours = Math.floor(seconds / 3600) % 24;
		seconds -= hours * 3600;
		let minutes = Math.floor(seconds / 60) % 60;
		seconds -= minutes * 60;
		seconds = Math.floor(seconds % 60);
		let time = hours + ":" + minutes + ":" + seconds;
		if (days > 1)
			return days + " days " + time;
		else if (days > 0)
			return days + " day " + time;
		else 
			return time;
	},

	getPrettyTotal: (stamp) => {
		let seconds = stamp / 1000;
		let days = Math.floor(seconds / 86400);
		seconds -= days * 86400;
		let hours = Math.floor(seconds / 3600) % 24;
		seconds -= hours * 3600;
		let minutes = Math.floor(seconds / 60) % 60;
		seconds -= minutes * 60;
		seconds = Math.floor(seconds % 60);
		let time = hours + ":" + minutes + ":" + seconds;
		if (days > 1)
			return days + " days " + time;
		else if (days > 0)
			return days + " day " + time;
		else 
			return time;
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

	getTime: (stamp) => {
		let str = new Date(stamp).toTimeString();
		let digits = str.split(' ')[0];
		let digitsArr = digits.split(':');
		digitsArr.pop();
		let hours = digitsArr[0];
		let mins = digitsArr[1];
		let AMorPM = 'AM';
		
		if (hours > 12){
			AMorPM = 'PM';
			hours %= 12;
		} 
		if (hours == 0)
			hours = 12;
		return hours + ":" + mins + " " + AMorPM;
	},

	getDateTime: (stamp) => {
		let str = new Date(stamp).toTimeString();
		let digits = str.split(' ')[0];
		let digitsArr = digits.split(':');
		digitsArr.pop();
		let hours = digitsArr[0];
		let mins = digitsArr[1];
		let AMorPM = 'AM';
		
		if (hours > 12){
			AMorPM = 'PM';
			hours %= 12;
		} 
		if (hours == 0)
			hours = 12;
		return hours + ":" + mins + " " + AMorPM + " " + new Date(stamp).toLocaleDateString();
	}
}

const twoDigits = (num) => {
	if (num < 10){
		return "0" + num;
	}
	return num;
}

export default FormatStamp;