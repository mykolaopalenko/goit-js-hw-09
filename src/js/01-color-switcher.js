
const stopBtn = document.querySelector("[data-stop]");
const startBtn = document.querySelector("[data-start]");
const body = document.querySelector("body");
let backGround = null;


function getRandomHexColor() {
   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function onStartBtn() {
   startBtn.disabled = true;
   stopBtn.disabled = false;

   backGround = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor()
   }, 1000);
};

function onStopBtn() {
   clearInterval(backGround);

   stopBtn.disabled = true;
   startBtn.disabled = false;
};


startBtn.addEventListener('click', onStartBtn);

stopBtn.addEventListener('click', onStopBtn);

// document.addEventListener('keydown', (event) => {
//    if (event.code === "Space") {
//       onStartBtn();
//    };
// })
