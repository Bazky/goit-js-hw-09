import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

flatpickr(inputEl, {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  minDate: 'today',
  onClose: function (selectedDates, dateStr, instance) {
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future.');
      startBtn.disabled = true;
    } else if (inputEl.value === '') {
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
});

startBtn.disabled = true;

let countdownIntervalId;

startBtn.addEventListener('click', () => {
  const endDate = flatpickr.parseDate(inputEl.value, 'Y-m-d H:i');
  startBtn.disabled = true;
  countdownIntervalId = setInterval(() => {
    const timeLeft = endDate - new Date();
    if (timeLeft <= 0) {
      clearInterval(countdownIntervalId);
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      startBtn.disabled = false;
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeLeft);
      daysEl.textContent = addLeadingZero(days);
      hoursEl.textContent = addLeadingZero(hours);
      minutesEl.textContent = addLeadingZero(minutes);
      secondsEl.textContent = addLeadingZero(seconds);
    }
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
