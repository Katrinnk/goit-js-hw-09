import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const TIMER_DELAY = 1000;
let intervalId = null;
let selectedDate = null;
let currentDate = null;
const calendar = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start-timer]');
startBtn.disabled = true;


function updateStyles() {
    const fields = document.querySelectorAll('.field');
    fields.forEach((field) => {
    field.style.display = 'inline';
      const value = field.querySelector('.value');
      value.style.display = 'inline-block';
      value.style.fontSize = '24px';
      value.style.fontWeight = 'bold';
      value.style.padding = '10px';
      value.style.margin = '5px';
      value.style.border = '1px solid #ccc';
      value.style.borderRadius = '5px';
      const label = field.querySelector('.label');
      label.style.fontSize = '24px';
    });
  }
  
  updateStyles();

  Report.info(
    '👋 Greeting, my Friend!',
    'Please, choose a date and click on start',
    'Okay'
  );
  
  flatpickr(calendar, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0].getTime() < Date.now()) {
        Report.failure(
          '🥺 Ooops...',
          'Please, choose a date in the future and remember: "Knowledge rests not upon truth alone, but upon error also." - Carl Gustav Jung',
          'Okay'
        );
      } else {
        Report.success(
          '🥰 Congratulation! Click on start!',
          '"Do not try to become a person of success but try to become a person of value." <br/><br/>- Albert Einstein',
          'Okay'
        );
        startBtn.disabled = false;
        const setTimer = () => {
          selectedDate = selectedDates[0].getTime();
          timer.start();
        };
  
        startBtn.addEventListener('click', setTimer);
      }
    },
  });
  
  const timer = {
    rootSelector: document.querySelector('.timer'),
    start() {
      intervalId = setInterval(() => {
        startBtn.disabled = true;
        calendar.disabled = true;
        currentDate = Date.now();
        const delta = selectedDate - currentDate;
  
        if (delta <= 0) {
          this.stop();
          Report.info(
            '👏 Congratulation! Timer stopped!',
            'Please, if you want to start timer, choose a date and click on start or reload this page',
            'Okay'
          );
          return;
        }
        const { days, hours, minutes, seconds } = this.convertMs(delta);
        this.rootSelector.querySelector('[data-days]').textContent =
          this.addLeadingZero(days);
        this.rootSelector.querySelector('[data-hours]').textContent =
          this.addLeadingZero(hours);
        this.rootSelector.querySelector('[data-minutes]').textContent =
          this.addLeadingZero(minutes);
        this.rootSelector.querySelector('[data-seconds]').textContent =
          this.addLeadingZero(seconds);
      }, TIMER_DELAY);
    },
  
    stop() {
      clearInterval(intervalId);
      this.intervalId = null;
      startBtn.disabled = true;
      calendar.disabled = false;
    },
  
    convertMs(ms) {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
  
      const days = this.addLeadingZero(Math.floor(ms / day));
      const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
      const minutes = this.addLeadingZero(
        Math.floor(((ms % day) % hour) / minute)
      );
      const seconds = this.addLeadingZero(
        Math.floor((((ms % day) % hour) % minute) / second)
      );
  
      return { days, hours, minutes, seconds };
    },
  
    addLeadingZero(value) {
      return String(value).padStart(2, 0);
    },
  };