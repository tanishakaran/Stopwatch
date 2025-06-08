let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let display = document.getElementById("display");
let progress = document.getElementById("progress");
let interval = null;
const tick = document.getElementById("tickSound");

function vibrate(ms) {
  if (navigator.vibrate) navigator.vibrate(ms);
}

function updateDisplay() {
  let h = hours < 10 ? `0${hours}` : hours;
  let m = minutes < 10 ? `0${minutes}` : minutes;
  let s = seconds < 10 ? `0${seconds}` : seconds;
  let ms = milliseconds < 10 ? `0${milliseconds}` : milliseconds;

  display.innerText = `${h}:${m}:${s}.${ms}`;

  // Update circle for seconds only
  let total = (seconds % 60) * 100 + milliseconds;
  let offset = 565 - (565 * total) / 6000; // 60s = 6000 * 10ms
  progress.style.strokeDashoffset = offset;
}

function startTimer() {
  if (interval !== null) return;

  vibrate(100);
  interval = setInterval(() => {
    milliseconds += 1;
    if (milliseconds === 100) {
      milliseconds = 0;
      seconds++;
      if (tick) tick.play();
    }
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
    updateDisplay();
  }, 10); // 10ms for mini-seconds
}

function stopTimer() {
  clearInterval(interval);
  interval = null;
  vibrate(200);
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  updateDisplay();
  vibrate([100, 50, 100]);
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});