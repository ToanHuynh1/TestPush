document.getElementById('audio-btn').addEventListener('click', function () {
    var speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.addEventListener('result', t => {
        const transcript = Array.from(t.results)
            .map(result => result[0])
            .map(result => result.transcript)
        document.getElementById('textEntry').value = transcript;

    });
    if (speech == true) {
        recognition.start();
    }
})


document.getElementById('mic-chat').addEventListener('click', function () {
    var speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.addEventListener('result', t => {
        const transcript = Array.from(t.results)
            .map(result => result[0])
            .map(result => result.transcript)
        document.getElementById('message-to-send').value = transcript;

    });
    if (speech == true) {
        recognition.start();
    }
})

document.getElementById('img-clear').addEventListener('click', function () {
    document.getElementById('message-to-send').value = '';
})




