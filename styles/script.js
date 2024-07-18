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

function startTimer() {
    timerInterval = setInterval(() => {
        elapsedTime++;
        updateTimer();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    elapsedTime = 0;
    updateTimer();
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

function resetSpeedButtons() {
    document.getElementById('speed-normal').classList.remove('active');
    document.getElementById('speed-x2').classList.remove('active');
    document.getElementById('speed-x3').classList.remove('active');
    document.getElementById('speed-x4').classList.remove('active');
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
        startTimer();
    }
});

document.getElementById('pause').addEventListener('click', () => {
    speechSynthesis.pause();
    stopTimer();
});

document.getElementById('resume').addEventListener('click', () => {
    speechSynthesis.resume();
    startTimer();
});

document.getElementById('stop').addEventListener('click', () => {
    speechSynthesis.cancel();
    stopTimer();
    resetTimer();
    pausedTime = 0;
    resetSpeedButtons();
    document.getElementById('speed-normal').classList.add('active');
});

document.getElementById('speed-normal').addEventListener('click', () => {
    currentRate = 1;
    speechSynthesisUtterance.rate = currentRate;
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
        speechSynthesis.cancel();
        speechSynthesis.speak(speechSynthesisUtterance);
    }
    resetSpeedButtons();
    document.getElementById('speed-normal').classList.add('active');
});

document.getElementById('speed-x2').addEventListener('click', () => {
    currentRate = 2;
    speechSynthesisUtterance.rate = currentRate;
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
        speechSynthesis.cancel();
        speechSynthesis.speak(speechSynthesisUtterance);
    }
    resetSpeedButtons();
    document.getElementById('speed-x2').classList.add('active');
});

document.getElementById('speed-x3').addEventListener('click', () => {
    currentRate = 3;
    speechSynthesisUtterance.rate = currentRate;
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
        speechSynthesis.cancel();
        speechSynthesis.speak(speechSynthesisUtterance);
    }
    resetSpeedButtons();
    document.getElementById('speed-x3').classList.add('active');
});

document.getElementById('speed-x4').addEventListener('click', () => {
    currentRate = 4;
    speechSynthesisUtterance.rate = currentRate;
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
        speechSynthesis.cancel();
        speechSynthesis.speak(speechSynthesisUtterance);
    }
    resetSpeedButtons();
    document.getElementById('speed-x4').classList.add('active');
});

speechSynthesisUtterance.onend = () => {
    stopTimer();
};

// Load available voices and set default voice
window.speechSynthesis.onvoiceschanged = setVoice;

// Set default active speed
document.getElementById('speed-normal').classList.add('active');