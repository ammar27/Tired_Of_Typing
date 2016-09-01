var start_btn = $("#start")[0];
var stop_btn = $("#stop")[0];
var subscription = "b9ae29e86b0d42a7b7c2185cd566d57d";
var mode = Microsoft.ProjectOxford.SpeechRecognition.SpeechRecognitionMode.shortPhrase;
var client;
var request;
function start() {
    clearOutput();
    console.log("Starting");
    client = Microsoft.ProjectOxford.SpeechRecognition.SpeechRecognitionServiceFactory.createMicrophoneClient(mode, "en-us", subscription, subscription);
    client.startMicAndRecognition();
    setTimeout(function () {
        client.endMicAndRecognition();
    }, 5000);
    client.onPartialResponseReceived = function (response) {
        console.log("partial response: " + response);
        setOutput(response);
    };
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
    console.log("Stopping");
    client.endMicAndRecognition();
}
