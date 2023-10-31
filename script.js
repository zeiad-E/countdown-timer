let timerInterval;
let timeLeft = 0;
let isPaused = false;

const timerDisplay = document.getElementById("timer");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resumeButton = document.getElementById("resume");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resumeButton.addEventListener("click", resumeTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

function startTimer() {
    stopTimer(); // Stop the timer if it's already running
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    
    if (minutes === 0 && seconds === 0) {
        alert("Please enter a valid positive number of minutes or seconds.");
        return;
    }

    timeLeft = minutes * 60 + seconds; // Convert minutes and seconds to seconds
    isPaused = false;
    updateDisplay();
    timerInterval = setInterval(updateDisplay, 1000);
    startButton.disabled = true;
    pauseButton.disabled = false;
    resumeButton.disabled = true;
    minutesInput.disabled = true;
    secondsInput.disabled = true;
}

function pauseTimer() {
    isPaused = true;
    clearInterval(timerInterval);
    pauseButton.disabled = true;
    resumeButton.disabled = false;
}

function resumeTimer() {
    isPaused = false;
    timerInterval = setInterval(updateDisplay, 1000);
    pauseButton.disabled = false;
    resumeButton.disabled = true;
}

function stopTimer() {
    clearInterval(timerInterval);
    startButton.disabled = false;
    pauseButton.disabled = true;
    resumeButton.disabled = true;
    minutesInput.disabled = false;
    secondsInput.disabled = false;
    timeLeft = 0;
    updateDisplay();
}

function resetTimer() {
    stopTimer();
    minutesInput.value = "";
    secondsInput.value = "";
    timeLeft = 0;
    updateDisplay();
}

function updateDisplay() {
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timerDisplay.textContent = "00:00";
    } else if (!isPaused) {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        timeLeft--;
    }
}
