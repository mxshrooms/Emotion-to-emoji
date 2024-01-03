Webcam.set({
    width:350, height:350, image_format:'png', png_quality: 100
});

var camera = document.getElementById("camera");

Webcam.attach('#camera');

function captureimage() {
    Webcam.snap(function (datauri){
        document.getElementById("outputdiv").innerHTML = '<img id="capture" src="'+datauri+'">';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/egO_kaM9c/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function predictemotion() {
    img = document.getElementById('capture');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if(error){
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("emotion").innerHTML = results[0].label;
        if(results[0].label) {
            document.getElementById("emoji").innerHTML = "&#128578;";
        }
        else if(results[1].label) {
            document.getElementById("emoji").innerHTML = "&#128577;";
        }
        else if(results[2].label) {
            document.getElementById("emoji").innerHTML = "&#128544;";
        }
    }
}