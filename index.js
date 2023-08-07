let startStopBtn = document.getElementById("startStop");
let resetBtn = document.getElementById("reset");
let lapBtn = document.getElementById("lap");
let lapList = document.getElementById("lapList");
let display = document.getElementById("display");

let startTime = 0;
let timerInterval = null;
let elapsed = 0;
let laps = [];
let previousLapTime = 0;

startStopBtn.addEventListener("click", function () {
  if (timerInterval === null) {
    startTimer();
    startStopBtn.textContent = "Stop";
    lapBtn.style.display = "inline-block";
  } else {
    stopTimer();
    startStopBtn.textContent = "Start";
  }
});

resetBtn.addEventListener("click", function () {
  stopTimer();
  display.textContent = "00:00:00:00";
  laps = [];
  lapList.innerHTML = "";
  startStopBtn.textContent = "Start";
  elapsed = 0; // Reset the elapsed time to 0 when the timer is reset
  previousLapTime = 0; // Reset the previous lap time
});

lapBtn.addEventListener("click", function () {
  if (timerInterval !== null) {
    laps.push(getElapsedTime());
    let lapTime = formatTime(laps[laps.length - 1]);
    let lapItem = document.createElement("li");
    if (laps.length === 1) {
      lapItem.textContent = lapTime;
      let lapHeading = document.createElement("h4");
      lapHeading.textContent = "Laps";
      lapList.appendChild(lapHeading);
    } else {
      let lapDifference = laps[laps.length - 1] - previousLapTime;
      let lapDifferenceTime = formatTime(lapDifference);
      lapItem.textContent = lapDifferenceTime;
    }
    lapList.appendChild(lapItem);
    previousLapTime = laps[laps.length - 1];
  }
});

function startTimer() {
  if (elapsed === 0) {
    startTime = Date.now() - (laps.length > 0 ? laps[laps.length - 1] : 0);
  } else {
    startTime = Date.now() - elapsed; // Use the stored elapsed time as the start time
  }
  timerInterval = setInterval(updateTimer, 10);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsed = getElapsedTime(); // Store the elapsed time when the timer is stopped
}

function updateTimer() {
  let elapsedTime = getElapsedTime();
  display.textContent = formatTime(elapsedTime);
}

function getElapsedTime() {
  return Date.now() - startTime;
}

function formatTime(time) {
  let hours = Math.floor(time / 3600000);
  let minutes = Math.floor((time % 3600000) / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  let centiseconds = Math.floor((time % 1000) / 10);

  return (
    padNumber(hours) +
    ":" +
    padNumber(minutes) +
    ":" +
    padNumber(seconds) +
    ":" +
    padNumber(centiseconds)
  );
}

function padNumber(num) {
  return num.toString().padStart(2, "0");
}
