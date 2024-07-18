let speechSynthesisUtterance = new SpeechSynthesisUtterance();
let timerInterval;
let elapsedTime = 0;
let pausedTime = 0;
let currentRate = 1;

function updateTimer() {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;
    document.getElementById('timer').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function setVoice() {
    const voices = window.speechSynthesis.getVoices();
    for (let voice of voices) {
        if (voice.lang === 'pl-PL') {
            speechSynthesisUtterance.voice = voice;
            break;
        }
    }
}

document.getElementById('start').addEventListener('click', () => {
    const text = document.getElementById('text-input').value;
    if (text) {
        speechSynthesis.cancel();
        speechSynthesisUtterance.text = text;
        speechSynthesisUtterance.rate = currentRate;
        setVoice();
        speechSynthesis.speak(speechSynthesisUtterance);

        elapsedTime = pausedTime;
        timerInterval = setInterval(() => {
            elapsedTime++;
            updateTimer();
        }, 1000);
    }
});

document.getElementById('pause').addEventListener('click', () => {
    speechSynthesis.pause();
    clearInterval(timerInterval);
});

document.getElementById('resume').addEventListener('click', () => {
    speechSynthesis.resume();
    timerInterval = setInterval(() => {
        elapsedTime++;
        updateTimer();
    }, 1000);
});

document.getElementById('stop').addEventListener('click', () => {
    speechSynthesis.cancel();
    clearInterval(timerInterval);
    pausedTime = 0;
    elapsedTime = 0;
    updateTimer();
});

document.getElementById('speed-x2').addEventListener('click', () => {
    currentRate = 2;
    speechSynthesisUtterance.rate = currentRate;
});

document.getElementById('speed-x3').addEventListener('click', () => {
    currentRate = 3;
    speechSynthesisUtterance.rate = currentRate;
});

document.getElementById('speed-x4').addEventListener('click', () => {
    currentRate = 4;
    speechSynthesisUtterance.rate = currentRate;
});

speechSynthesisUtterance.onend = () => {
    clearInterval(timerInterval);
};

// Load available voices and set default voice
window.speechSynthesis.onvoiceschanged = setVoice;