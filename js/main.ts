var fileList : HTMLInputElement = <HTMLInputElement> $("#fileItem")[0];
var start_btn = $("#start")[0];
var stop_btn = $("#stop")[0];
var subscription: string = "b9ae29e86b0d42a7b7c2185cd566d57d";
// Possible error due to "Microsoft" not being found, but compiles into js and works
var mode : any = Microsoft.ProjectOxford.SpeechRecognition.SpeechRecognitionMode.shortPhrase;
var client : any;
var request : any;

fileList.addEventListener("change", function() {
  processFile(function (file) {
    console.log("finished processing");
    start(file);
  });
});

function processFile(callback) : void {
  var file = fileList.files[0];  //get(0) is required as imgSelector is a jQuery object so to get the DOM object, its the first item in the object. files[0] refers to the location of the photo we just chose.
  var reader = new FileReader();
  if (file) {
    reader.readAsDataURL(file); //used to read the contents of the file
  } else {
    console.log("Invalid file");
  }
  reader.onloadend = function () {
    if (!file.name.match(/\.(wav)$/)){
      console.log("Please upload a wav file");
    } else {
      //if file is wav it sends the file reference back up
      callback(file);
    }
  }
}

function start(file): void {
  clearOutput();
  console.log("Starting");
  client = Microsoft.ProjectOxford.SpeechRecognition.SpeechRecognitionServiceFactory.createDataClient(
      mode,
      "en-us",
      subscription,
      subscription);

  request = new XMLHttpRequest();
  request.open(
      'GET',
      file.value,
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
  console.log("worked");
}
