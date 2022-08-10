video = "";
objects = [];
status_model = "";
song = "";

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    object_Detector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function preload(){
song = loadSound("alarm.wav");
}

function modelLoaded(){
    console.log("Model loaded");
    status_model = true;
}

function gotResults(error, results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    objects = results;
}
}

function draw(){
    image(video, 0, 0,380,380)
    if(status_model != ""){
        object_Detector.detect(video, gotResults);
      for(i = 0;i < objects.length; i++){
        document.getElementById("status").innerHTML = "Status: Objects detected";
        fill("skyblue");
        var percent = Math.floor(objects[i].confidence * 100);
        text(objects[i].label + " " +percent+"%",objects[i].x,objects[i].y + 15);
        noFill();
    stroke("purple");
    rect(objects[i].x - 50,objects[i].y,objects[i].width,objects[i].height);
    if(objects[i].label == "person"){
        document.getElementById("stnot").innerHTML = "Baby Found";
        song.stop();
    }
    else{
        song.play();
        document.getElementById("stnot").innerHTML = "Baby not Found";
    }
    }
}
}


