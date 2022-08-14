import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
   btnStart: document.querySelector('button[data-start]'),
   inputData: document.querySelector('#datetime-picker'),
   days: document.querySelector('.value[data-days]'),
   hours: document.querySelector('.value[data-hours]'),
   minutes: document.querySelector('.value[data-minutes]'),
   seconds: document.querySelector('.value[data-seconds]'),
};


let timerTime = null;
let isStart = false;
let intervalId = null;
const TIMER_INRERVAL = 1000;

refs.btnStart.addEventListener('click', onBtnStartClick)

switchDisabledBtn(!isStart);

const options = {
   enableTime: true,
   time_24hr: true,
   defaultDate: new Date(),
   minuteIncrement: 1,
   onClose(selectedDates) {
      timerTime = selectedDates[0] - options.defaultDate;

      if (timerTime <= 0) {
         Notify.failure('Please choose a date in the future');
         return;
      };
      switchDisabledBtn(isStart);
   },
};

new flatpickr('#datetime-picker', options);

function onBtnStartClick() {
   redrawValues();

   switchDisabledBtn(!isStart);
   switchDisabledInput(!isStart)

   isStart = !isStart;

   intervalId = setInterval(resetInterval, TIMER_INRERVAL);
};

function resetInterval() {
   if (timerTime <= TIMER_INRERVAL) {
      clearInterval(intervalId);
      return;
   };

   timerTime -= TIMER_INRERVAL
   redrawValues();
};

function redrawValues() {
   const convertTime = convertMs(timerTime);
   refs.days.textContent = convertTime.days;
   refs.hours.textContent = convertTime.hours;
   refs.minutes.textContent = convertTime.minutes;
   refs.seconds.textContent = convertTime.seconds;
};

function switchDisabledInput(value) {
   refs.inputData.disabled = value;
};

function switchDisabledBtn(value) {
   refs.btnStart.disabled = value;
};

function convertMs(ms) {

   const second = 1000;
   const minute = second * 60;
   const hour = minute * 60;
   const day = hour * 24;

   // Remaining days
   const days = Math.floor(ms / day);
   // Remaining hours
   const hours = Math.floor((ms % day) / hour);
   // Remaining minutes
   const minutes = Math.floor(((ms % day) % hour) / minute);
   // Remaining seconds
   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

   return { days, hours, minutes, seconds };
};