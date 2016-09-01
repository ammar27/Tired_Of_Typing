var fileList = $("#fileItem")[0];
var start_btn = $("#start")[0];
var stop_btn = $("#stop")[0];
var subscription = "b9ae29e86b0d42a7b7c2185cd566d57d";
var mode = Microsoft.ProjectOxford.SpeechRecognition.SpeechRecognitionMode.shortPhrase;
var client;
var request;
fileList.addEventListener("change", function () {
    processFile(function (file) {
        console.log("finished processing");
        start(file);
    });
});
function processFile(callback) {
    var file = fileList.files[0];
    var reader = new FileReader();
    if (file) {
        reader.readAsDataURL(file);
    }
    else {
        console.log("Invalid file");
    }
    reader.onloadend = function () {
        if (!file.name.match(/\.(wav)$/)) {
            console.log("Please upload a wav file");
        }
        else {
            callback(file);
        }
    };
}
function start(file) {
    clearOutput();
    console.log("Starting " + file.name);
    client = Microsoft.ProjectOxford.SpeechRecognition.SpeechRecognitionServiceFactory.createDataClient(mode, "en-us", subscription, subscription);
    request = new XMLHttpRequest();
    request.open('GET', file.name, true);
    request.responseType = 'arraybuffer';
    request.onload = function () {
        if (request.status == 200) {
            client.sendAudio(request.response, request.response.length);
        }
        else if (request.status == 503) {
            setOutput("Unable to receive audio file");
        }
        else {
            setOutput("Unable to receive audio file");
        }
    };
    request.send();
    client.onFinalResponseReceived = function (response) {
        console.log("final response: " + response);
        setOutput(JSON.stringify(response));
    };
    client.onIntentReceived = function (response) {
        setOutput(response);
    };
}
function clearOutput() {
    document.getElementById("output").value = "";
}
function setOutput(output) {
    console.log("Setting to: " + output);
    document.getElementById("output").value = output;
}
function stop() {
    console.log("worked");
}
