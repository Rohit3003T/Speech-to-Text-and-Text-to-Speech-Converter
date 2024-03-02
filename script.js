const startRecordingButton = document.getElementById('startRecording');
const stopRecordingButton = document.getElementById('stopRecording');
const transcribedText = document.getElementById('transcribedText');
const textInput = document.getElementById('textInput');
const speakButton = document.getElementById('speakButton');
let recognition;

// Speech to Text
startRecordingButton.addEventListener('click', () => {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
        console.log('Speech recognition started');
        transcribedText.innerHTML = '';
    };

    recognition.onresult = (event) => {
        const result = event.results[event.results.length - 1];
        const transcript = result[0].transcript;

        transcribedText.innerHTML = transcript;
    };

    recognition.start();
    startRecordingButton.disabled = true;
    stopRecordingButton.disabled = false;
});

stopRecordingButton.addEventListener('click', () => {
    recognition.stop();
    startRecordingButton.disabled = false;
    stopRecordingButton.disabled = true;
});

// Text to Speech
speakButton.addEventListener('click', () => {
    const text = textInput.value;
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Text-to-speech is not supported in this browser.');
    }
});