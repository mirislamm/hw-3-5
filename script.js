
let holiday = "Новый год";
document.getElementById("title").innerText = "Отсчет до: " + holiday;

let dateInput = document.getElementById("dateInput");
let startBtn = document.getElementById("startBtn");
let stopBtn = document.getElementById("stopBtn");
let countdown = document.getElementById("countdown");
let clock = document.getElementById("clock");
let daySpan = document.getElementById("day");

let timer = null;

let days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

function updateClock() {
    let now = new Date();
    
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    if (h < 10) h = "0" + h;
    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;

    clock.innerText = h + ":" + m + ":" + s;
    daySpan.innerText = days[now.getDay()];
}

updateClock();
setInterval(updateClock, 1000);

startBtn.onclick = function() {
    if (timer !== null) {
        return;
    }

    if (dateInput.value === "") {
        alert("Выберите дату!");
        return;
    }

    timer = setInterval(function() {
        let now = new Date();
        let target = new Date(dateInput.value);
        target.setHours(0, 0, 0, 0); 

        let diff = target - now;
        if (diff <= 0) {
            countdown.innerText = "Дата уже прошла";
            countdown.style.color = "black";
            clearInterval(timer);
            timer = null;
            return;
        }
        if (diff < 86400000) {
            countdown.style.color = "red";
        } else {
            countdown.style.color = "black";
        }
        let d = Math.floor(diff / (1000 * 60 * 60 * 24));
        let h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        let m = Math.floor((diff / (1000 * 60)) % 60);
        let s = Math.floor((diff / 1000) % 60);

        countdown.innerText = "Дней: " + d + ", часов: " + h + ", минут: " + m + ", секунд: " + s;
    }, 1000);
};

stopBtn.onclick = function() {
    clearInterval(timer);
    timer = null;
};
