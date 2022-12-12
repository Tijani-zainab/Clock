const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const secondEl = document.querySelector(".second");
const timeEl = document.querySelector(".time");
const dateEl = document.querySelector(".date");
const toggle = document.querySelector(".toggle");

// Create style element to hold keyframes
const clockKeyframe = document.createElement("style");
clockKeyframe.type = "text/css";
document.head.appendChild(clockKeyframe);

// Add animation to the clock hands. Keyframes are defined dynamically
hourEl.style.animation = "movehour .2s linear forwards";
minuteEl.style.animation = "movemin .2s linear forwards";
secondEl.style.animation = "movesec .2s linear forwards";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

toggle.addEventListener("click", (e) => {
  const html = document.querySelector("html");
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    e.target.innerHTML = "Dark mode";
  } else {
    html.classList.add("dark");
    e.target.innerHTML = "Light mode";
  }
});

function setTime() {
  const time = new Date();
  const month = time.getMonth();
  const day = time.getDay();
  const date = time.getDate();
  const hours = time.getHours();
  const hoursForClock = hours >= 13 ? hours % 12 : hours;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

// define keyframe to animate clock hands. 
  clockKeyframe.innerHTML = `
@keyframes movesec{
100%{
transform: translate(-50%, -100%) rotate(${scale(seconds, 0, 60, 0, 360)}deg);
}
}
@keyframes movemin{
  100%{
  transform: translate(-50%, -100%) rotate(${scale(minutes, 0, 60, 0, 360)}deg);
  }
  }
  @keyframes movehour{
    100%{
    transform: translate(-50%, -100%) rotate(${scale(
      hoursForClock,
      0,
      12,
      0,
      360
    )}deg);
    }
    }`;

  const ampm = hours >= 12 ? "PM" : "AM";

  timeEl.innerHTML = `${hoursForClock}:${
    minutes < 10 ? `0${minutes}` : minutes
  } ${ampm}`;
  dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`;
}

const scale = (num, in_min, in_max, out_min, out_max) => {
  const angle =
    ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  return angle;
};

setTime();

setInterval(setTime, 1000);
