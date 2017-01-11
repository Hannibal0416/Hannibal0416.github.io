var nhours;
var nmins;
var nsec;
var today;

function initialiseClock() {
	//Set the two dates
	var startdate =new Date(2004, 0, 1); //Month is 0-11 in JavaScript
	today=new Date();
	
	// time in seconds bewteen today and start
	var secondsToDate = (Math.ceil((today.getTime()/1000)-(startdate.getTime()/1000)));
	
	// assume that 220 days per year spent working with 7.5 hours per day
	var secondsPerYear = 220*7.5*3600;
	var secondsInYear = 365*24*3600;
	var workPercentage = Math.ceil((secondsPerYear/secondsInYear)*100);
	var secondsSpentWorking = secondsToDate * (workPercentage/100);
	
	nhours=Math.floor(secondsSpentWorking/3600); 
	nmins=Math.floor(secondsSpentWorking/60)-(nhours*60); 
	nsec=Math.ceil(secondsSpentWorking-(nhours*3600)-(nmins*60));
	
	nmins = nmins + "";
	nsec = nsec + "";
	
	if(nmins.length == 1) { nmins = "0"+nmins; }
	if(nsec.length == 1) { nsec = "0"+nsec; }
	
	$("span#time").html(nhours+":"+nmins+":"+nsec);
	clockTick();
}


function clockTick() {

	// Don't tick when I'm not working!
	currentDay = today.getDay();
	currentHour = today.getHours();
	if(((currentDay == 0) || (currentDay == 6)) || ((currentHour < 9) || (currentHour > 17))) {
		return 0;
	}
	
	nsec = parseInt(nsec);
	nmins = parseInt(nmins);
	nhours = parseInt(nhours);
	
	nsec = nsec + 1;
	
	if(nsec == 60) {
		nsec = 0; 
		nmins = nmins + 1;
		if(nmins == 60) {
			nhours = nours + 1;
			nmins == 0;
		}
	}
	
	nmins = nmins + "";
	nsec = nsec + "";

	if(nmins.length == 1) { nmins = "0"+nmins; }
	if(nsec.length == 1) { nsec = "0"+nsec; }
	
	$("span#time").html(nhours+":"+nmins+":"+nsec);
	setTimeout("clockTick()", 1000);
}
	
$(document).ready(function() {
	initialiseClock();
});