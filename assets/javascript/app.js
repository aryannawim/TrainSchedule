  var config = {
    apiKey: "AIzaSyAdNHMfPyeKbgxqJ5W75qMTUpB9zmqI0is",
    authDomain: "train-schedule-6e3cf.firebaseapp.com",
    databaseURL: "https://train-schedule-6e3cf.firebaseio.com",
    storageBucket: "train-schedule-6e3cf.appspot.com",
    messagingSenderId: "24703974560"
  };
  firebase.initializeApp(config);

var database = firebase.database();



var today = moment().format("YYYY-MM-DD");
console.log(today);

var trainName = "";
var destination = "";
var firstTrain ="";
var frequency = 0;
// var arrival = 0;
// var waitTime = 0;

$("#add-train").on("click", function(){


	trainName = $("#name-input").val().trim();
	destination = $("#destination-input").val().trim();
	firstTrain = $("#firstTime-input").val().trim();
	frequency = $("#frequency-input").val().trim();

	console.log("Name: " + trainName);
	console.log("Destination: " + destination);
	console.log("First Train: " + firstTrain);
	console.log("Frequency: " + frequency); 

	database.ref().push({

		trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency



	});

	return false;



});

database.ref().on("child_added", function(childSnapshot){

	
	var userFrequency = $("#frequency-input").val().trim();
	console.log(userFrequency);
	var startTime = $("#firstTime-input").val().trim();
	console.log(startTime);
	var startTimeConverted = moment(startTime, "hh:mm");
	console.log(startTimeConverted);
	var currentTime = moment();
	console.log(currentTime);
	var timeDifference = moment().diff(moment(startTimeConverted), "minutes");
	console.log(timeDifference);
	var timeApart = timeDifference % userFrequency ; 
	console.log (timeApart);
	var minutesTillTrain = userFrequency - timeApart; 
	console.log(minutesTillTrain);
	var nextTrain = moment().add(minutesTillTrain, "minutes");
	var nextTrainDisplay = moment(nextTrain).format("hh:mm")
	console.log(nextTrainDisplay);
	// var startTime = $("#firstTime-input").val().trim();
	// var startTimeConverted = moment(startTime, "hh:mm"); 
	// console.log(startTimeConverted);
	// var test = today + " " + childSnapshot.val().firstTrain;
	// console.log(test);
	// // console.log( moment(test).format("X") );   // unix time stamp in seconds...

	// var startTime = moment(test).format("X");
	// console.log("-----------");
	// console.log("starttime " + startTime);
	// // console.log(today);
	// console.log(childSnapshot.val().firstTrain);

	// var currentTime = moment().format("X")
	// console.log("currenttime " + currentTime);
	// console.log(moment.unix(currentTime).format("hh:mm"));

	// var timeDifference = currentTime - startTime ; 
	// console.log("timedifferece " + timeDifference);

	// console.log("timeDifference in min " + timeDifference/60);
	
	

	// console.log(childSnapshot.val().frequency);

	// var next = (timeDifference%(childSnapshot.val().frequency * 60 ));
	// console.log(next);

	// var nextTime = ( (childSnapshot.val().frequency * 60 ) - next ) + currentTime
	// console.log("nexttime " + nextTime);
	// console.log(moment.unix(nextTime).format("hh:mm"));


 
	var trainDiv = $("<tr>");

	var displayName = $("<td>");
	displayName.append(childSnapshot.val().trainName);

	var displayDesination = $("<td>");
	displayDesination.append(childSnapshot.val().destination);

	var displayFrequency = $("<td>");
	displayFrequency.append(userFrequency);

	var displayNextTrain = $("<td>");
	displayNextTrain.append(nextTrainDisplay); 

	var displayMinutesAway = $("<td>");
	displayMinutesAway.append(minutesTillTrain);


	trainDiv.append(displayName);
	trainDiv.append(displayDesination);
	trainDiv.append(displayFrequency);
	trainDiv.append(displayNextTrain);
	trainDiv.append(displayMinutesAway);

	$("#contentTable").append(trainDiv); 



      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);





});

