const hoursSelect = document.querySelector("#hours");
const minutesSelect = document.querySelector("#minutes");
const secondsSelect = document.querySelector("#seconds");
const ampmSelect = document.querySelector("#ampm");
const setAlarmBtn = document.querySelector("#set-alarm");
const clearAlarmBtn = document.querySelector("#clear-alarm");
const alarmStatus = document.querySelector("#alarm-status");
const timeDisplay = document.querySelector("#current-time");
const alarmSound = document.querySelector("#alarm-sound");

let alarmTime = null;
let isAlarmSet = false;

// Display current time
const updateCurrentTime = () => {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  timeDisplay.textContent = `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}:${seconds < 10 ? "0" : ""}${seconds} ${ampm}`;

  checkAlarm(hours, minutes, seconds, ampm);
};

// Update the current time every second
setInterval(updateCurrentTime, 1000);

// Add options to the dropdowns
window.addEventListener("DOMContentLoaded", () => {
  populateDropdown(1, 12, hoursSelect);
  populateDropdown(0, 59, minutesSelect);
  populateDropdown(0, 59, secondsSelect);
});

const populateDropdown = (start, end, element) => {
  for (let i = start; i <= end; i++) {
    const option = document.createElement("option");
    const value = i < 10 ? "0" + i : i;
    option.value = value;
    option.textContent = value;
    element.appendChild(option);
  }
};

// Set the alarm
setAlarmBtn.addEventListener("click", () => {
  const hour = hoursSelect.value;
  const minutes = minutesSelect.value;
  const seconds = secondsSelect.value;
  const ampm = ampmSelect.value;

  alarmTime = `${hour}:${minutes}:${seconds} ${ampm}`;
  isAlarmSet = true;
  alarmStatus.textContent = `Alarm set for ${alarmTime}`;
});

// Check if it's time to ring the alarm
const checkAlarm = (hours, minutes, seconds, ampm) => {
  const currentTime = `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}:${seconds < 10 ? "0" : ""}${seconds} ${ampm}`;
  if (isAlarmSet && currentTime === alarmTime) {
    alarmSound.play();
    isAlarmSet = false;
    alarmStatus.textContent = `Alarm ringing! Time: ${alarmTime}`;
  }
};

// Clear the alarm
clearAlarmBtn.addEventListener("click", () => {
  alarmTime = null;
  isAlarmSet = false;
  alarmSound.pause();
  alarmSound.currentTime = 0;
  alarmStatus.textContent = "";
});
