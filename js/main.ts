var start_btn = $("#start")[0];
var stop_btn = $("#stop")[0];
var subscription: string = "b9ae29e86b0d42a7b7c2185cd566d57d";

var mode : any = Microsoft.ProjectOxford.SpeechRecognition.SpeechRecognitionMode.shortPhrase;
var client : any;
var request : any;

function start(): void {
  clearOutput();
  console.log("Starting");
  // Possible error due to "Microsoft" not being found, but compiles into js and works
  client = Microsoft.ProjectOxford.SpeechRecognition.SpeechRecognitionServiceFactory.createDataClient(
      mode,
      "en-us",
      subscription,
      subscription);

  request = new XMLHttpRequest();
  request.open(
      'GET',
      "../whatstheweatherlike.wav",
      true);
  request.responseType = 'arraybuffer';
  request.onload = function () {
      if (request.status == 200) {
        client.sendAudio(request.response, request.response.length);
      } else if (request.status == 503){
        setOutput("Unable to receive audio file");
      } else {
        setOutput("Unable to receive audio file");
      }
  };

  request.send();

  client.onFinalResponseReceived = function (response) {
    console.log("final response: " + response);
    setOutput(JSON.stringify(response));
  }

  client.onIntentReceived = function (response) {
    setOutput(response);
  };

}

function clearOutput():void {
  (<HTMLInputElement> document.getElementById("output")).value = "";
}

function setOutput(output:string):void {
  console.log("Setting to: " + output);
  (<HTMLInputElement> document.getElementById("output")).value = output;
}

function stop(): void {

}
