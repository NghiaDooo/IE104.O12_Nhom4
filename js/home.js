
document.addEventListener("DOMContentLoaded", () => {
    var counter = 2;
    setInterval(function () {
        document.getElementById('radio' + counter).checked = true;
        counter++;
        if (counter > 4) {
            counter = 1;
        }
    }, 5000);
    countdownTimeDeals();
})


function countdownTimeDeals() {
    const dealExpirationDate = new Date("2023-12-31T23:59:59").getTime();

    const countdownInterval = setInterval(function () {
        const currentDate = new Date().getTime();
        const timeRemaining = dealExpirationDate - currentDate;

        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        const countdownElement = document.getElementById("deals-countdown");
        countdownElement.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
        countdownElement.classList.add('text-wraper')

        if (timeRemaining < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "Deal expired!";
        }
    }, 1000);
}
