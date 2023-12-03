
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


function addSlides(slides) {
    const sliderContainer = document.querySelector('.slider-container');

    slides.forEach(slideData => {
        const a = document.createElement('a');
        a.href = slideData.link;

        const article = document.createElement('article');
        article.className = 'slide';

        const img = document.createElement('img');
        img.className = 'slide-img';
        img.src = slideData.imgSrc;
        img.alt = slideData.altText;

        article.appendChild(img);
        a.appendChild(article);
        sliderContainer.appendChild(a);
    });
}

function updateSmallWidget(index, data) {
    const smallWidgetSection = document.getElementById('small-widget');
    const imageLinks = smallWidgetSection.querySelectorAll('a');
    const images = smallWidgetSection.querySelectorAll('img');

    if (index >= 0 && index < imageLinks.length) {
        imageLinks[index].href = data.link;
    }

    if (index >= 0 && index < images.length) {
        images[index].src = data.imgSrc;
        images[index].alt = data.altText;
    }
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
}

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
