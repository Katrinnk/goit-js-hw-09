function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let timerId;

function startSwitchColor(){
    btnStart.disabled = true;
    btnStop.disabled = false;

    timerId = setInterval(() => {
    let randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }, 1000);
}

function stopSwitchColor() {
    btnStart.disabled = false;
    btnStop.disabled = true;

    clearInterval(timerId);
}

btnStart.addEventListener('click', startSwitchColor);
btnStop.addEventListener('click', stopSwitchColor);
