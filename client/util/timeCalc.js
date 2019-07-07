let times = process.argv.slice(2);

if (times[0] == '-help' || times[0] == '-h'){
	console.log('node time_calc [mm.ss] [mm.ss] [mm.ss] [mm.ss] ...');
	return;
}

let totalSeconds = 0;

times.forEach((each) => {
	let arr = each.split('.');
	let min = parseFloat(arr[0]);
	let sec = parseFloat(arr[1]);
	totalSeconds += (min * 60) + sec;
})

let totalTime = Math.floor((totalSeconds / 60)) + "." + (totalSeconds % 60);

console.log(totalTime);