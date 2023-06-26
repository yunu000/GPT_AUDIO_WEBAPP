
//voice recognition and calling gpt api 
const recogniseSpeech = ()=>{
    document.getElementById('answer').innerHTML=""
    document.getElementById('voiceRecognitionText').innerHTML=""
    var SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;;
    var recognition = new SpeechRecognition()

    //span element for showing microphone status
    var action = document.getElementById('action')

    //start voice recognition 
    recognition.onstart = ()=>{
        console.log("starting")
        action.innerHTML='<h3>Listening</h3>'
    }

    //life cycle method which gets executed when speech ends
    recognition.onspeechend = ()=>{
        console.log("ending")
        action.innerHTML=''
    }

    //lifecycle method gets execute when you got the speech recognition result
    recognition.onresult = async (event)=>{

        let res = event.results[0][0].transcript;
        document.getElementById('voiceRecognitionText').innerHTML=`${res}`

        //api call for getting gpt response
        let query = `http://localhost:5000/response?query="${res}"`
        var gptResponse=await fetch(query)
        .then((res)=> res.json())
        .then((data) => {
            return data.response
        })
        document.getElementById('answer').innerHTML=gptResponse
        textToSpecch(gptResponse);
    }

    recognition.start();

}

// Function to convert text to audio
const textToSpecch = (text)=>{
    let utterance = new SpeechSynthesisUtterance(text)
    speechSynthesis.speak(utterance);
}

//Clear output fields on click of clear button
const clearText = ()=>{
    document.getElementById('voiceRecognitionText').innerHTML=""
    document.getElementById('answer').innerHTML=""
}