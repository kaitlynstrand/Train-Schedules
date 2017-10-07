  
  var config = {
    apiKey: "AIzaSyDABOKRYZ2H89i83dSv5pA70MBJhtZjxaI",
    authDomain: "train-schedule-ec318.firebaseapp.com",
    databaseURL: "https://train-schedule-ec318.firebaseio.com",
    projectId: "train-schedule-ec318",
    storageBucket: "",
    messagingSenderId: "272955608446"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  database.ref().on("child_added", function(snapshot) {

  	//console.log(snapshot.val().train_name)

  	var tableRow = $("<tr>");
  	$("tbody").append(tableRow);

  	//train name from form input
  	var trainName = $("<td>")
  	trainName.text(snapshot.val().train_name);
  	tableRow.append(trainName);  	

  	//train destination from form input
  	var trainDestination = $("<td>")
  	trainDestination.text(snapshot.val().destination);
  	tableRow.append(trainDestination);

  	//train frequency from form input (also need for minute difference for current time)  	
		var tableTrainFrequency = $("<td>")
		var trainFrequency = snapshot.val().frequency_min;
		tableTrainFrequency.text(trainFrequency);		
		tableRow.append(tableTrainFrequency);

		//current time calcs in one section then formatting in another
		var currentTime = moment();

		var trainFirst = snapshot.val().first_train;

  	var formatTrainFirst = moment(trainFirst, "HH:mm").subtract(1, "day");
  	var minDifference = currentTime.diff(formatTrainFirst, "minutes");
  	var minRemainder = minDifference % trainFrequency
  	var trainWaitMin = trainFrequency - minRemainder;

		// while (formatTrainFirst < currentTime) {
  //   	formatTrainFirst.add(trainFrequency, 'minutes')
		// }
		
		var trainNext = currentTime.add(trainWaitMin, "minutes").format('dddd HH:mm');
  	
  	//formatting first train time form input by user

  	//difference in minutes between first train "minutes" and current time "minutes" 	

  	console.log(minRemainder)
  	console.log(minDifference)
  	console.log(trainFrequency)
 	
  	var tableTrainNext = $("<td>");
  	tableTrainNext.text(trainNext);
  	tableRow.append(tableTrainNext);


//above should display DAY OF WEEK and HOUR (military time) and MIN to next train

  	var tableTrainWaitMin = $("<td>");
  	tableTrainWaitMin.text(trainWaitMin);
  	tableRow.append(tableTrainWaitMin);  	
  

  })

  $("#add-info").on('click',function(event){
  	event.preventDefault();

  	var trainName = $("#train-name").val();
  	var trainDestination = $("#destination").val();
  	var trainFirst = $("#first-train").val();
  	var trainFrequency = $("#frequency-min").val();

  		database.ref().push({
  			train_name: trainName,
  			destination: trainDestination,
  			first_train: trainFirst,
  			frequency_min: trainFrequency,
  		})
  })
