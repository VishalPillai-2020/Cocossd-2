status="";
objects=[];
function preload(){
    img = loadImage("dog_cat.jpg");
}
function setup(){
    canvas = createCanvas(500,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500,400);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("l1").innerHTML = "Status:Detecting Objects";

}
function modelLoaded(){
    console.log("Model Is Loaded");
    status=true;

}
function gotResults(error, results){
if (error){
    console.error(error);

}
else{
    console.log(results);
    objects = results;
}
}
function draw(){
 image(video, 0, 0 , 500, 400);
if (status !=""){
    r=random(255);
    g=random(255);
    b=random(255);
    objectDetector.detect(video, gotResults);
for (i=0; i<objects.length; i++){
    document.getElementById("l1").innerHTML = "Status : Objects Detected";
    document.getElementById("l2").innerHTML = "Number of objects detected : "+objects.length;
    percent = floor(objects[i].confidence * 100);
    fill(r,g,b);
    text(objects[i].label + " "+ percent + "%", objects[i].x+15,objects[i].y+15 );
    stroke(r,g,b);
    noFill();
    rect(objects[i].x, objects[i].y, objects[i].width,objects[i].height);
}
}
}
