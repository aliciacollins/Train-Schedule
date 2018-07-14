
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBLnhkfnhTlC3OzI_cE3c8_hrX-grtZH8E",
    authDomain: "my-train-project-32429.firebaseapp.com",
    databaseURL: "https://my-train-project-32429.firebaseio.com",
    projectId: "my-train-project-32429",
    storageBucket: "my-train-project-32429.appspot.com",
    messagingSenderId: "1052226411038"
};
firebase.initializeApp(config);

var database = firebase.database();




$("#submit-button").on("click", function () {
    var name = $("#submitTrainName").val().trim();
    var destination = $("#submitDestination").val().trim();
    var time = $("#submitTrainTime").val().trim();
    var frequency = $("#submitFrequency").val().trim();


    database.ref().push({
        Name: name,
        Destination: destination,
        Time: time,
        Frequency: frequency

    });


});

database.ref().on("child_added", function (childSnapshot) {
    // storing the snapshot.val() in a variable for convenience

    console.log("snapshot", childSnapshot.val());
    var train = childSnapshot.val();
    console.log("var trainFreq", train.Frequency);
    console.log("trainTime",train.Time);
    var firstTimeConverted = moment(train.Time, "HH:mm").subtract(1,"years");
    console.log("firstTimeConverted", firstTimeConverted);
    
    var currentTime = moment().format("HH:mm");

    var diffTime = moment().diff(moment(firstTimeConverted),"minutes");
    console.log('diffTime' + diffTime);

    var remainder =diffTime % train.Frequency;
    console.log("remainder", remainder);

    var minutesTillTrain = train.Frequency - remainder;
    console.log("minutes till train", + minutesTillTrain);

    var nextTrain = moment().add(minutesTillTrain, "minutes");

    
    
    
    
    
    var arrivalTime = moment(train.Time, 'HH:mm').add(train.Frequency, 'minutes').format('HH:mm');
    
    console.log("arrivalTime",arrivalTime);
    
    console.log ("currentTime",currentTime);

//    var fromNow = moment().subtract(arrivalTime,'minutes').format("HH:mm");
//THIS SHOULD WORK!!!!!
    // console.log("fromNOw", fromNow);
    

    // var diff = moment(arrivalTime,"HH:mm")-moment(currentTime,"HH:mm");
   
    // console.log("diff",diff);
    // var minutesAway = moment(diff).format('MMMM Do YYYY, h:mm:ss a');
    // console.log("minutes away",minutesAway)
    // var remainder = diff % train.Frequency;
    // console.log("remainder", remainder);
    var tBody = $("#table-results");
    var tRow = $("<tr>");

    var colName = $("<td>").text(train.Name);
    var colDestination = $("<td>").text(train.Destination);
    var colTime = $("<td>").text(train.Time);
    var colFrequency = $("<td>").text(train.Frequency);
    var colArrivalTime = $("<td>").text(arrivalTime);
    var colMinTilTrain = $("<td>").text(minutesTillTrain);
    console.log("colName", colName);
    ;

    tRow.append(colName, colDestination, colFrequency,colArrivalTime,colMinTilTrain);
    tBody.append(tRow);



    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

 


;


        // var diff = parseInt((Math.abs(new Date() - new Date(sv.StartDate.replace(/-/g,' '))))/1000/60/60/24/365*12);
        // console.log("Difference: ", diff);
        // var MonthsWorked = diff;
        // console.log("Rate: ", sv.MonthlyRate);
        // var TotalBilled = parseInt(sv.MonthlyRate)*parseInt(MonthsWorked);
        // console.log(TotalBilled);
