hi = "";
objects = [];

function setup(){
    canvas = createCanvas(400, 350);
    canvas.center();
    webcam = createCapture(VIDEO);
    webcam.hide();
    webcam.size(550, 450);
    webcam.center();
    synth = window.speechSynthesis;

}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Object Detecting...";
    value = document.getElementById("value").value; 

    if(objects[0].label == value){
        webcam.stop();
        objectDetector.detect(gotResult);
        document.getElementById("status").innerHTML = value + "found";
        utter_this = new SpeechSynthesisUtterance(objects[0].label + "found");
        synth.speak(utter_this);
    }
}

function modelLoaded(){
    console.log("model Loaded!");
    hi = true;
}

function draw(){
    image(webcam, 0, 0, 400, 350);
    if(hi != ""){
        objectDetector.detect(webcam, gotResult);
    for(i = 0; i < objects.length; i++){
        
        document.getElementById("status").innerHTML = "Status : Objected Detected";
        document.getElementById("no_of_objects").innerHTML = "Number of Objectes Detected are : " + objects.length;

        fill("#FF0000");
        percent = floor(objects[i].confidence *100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
    }
}

function gotResult(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}