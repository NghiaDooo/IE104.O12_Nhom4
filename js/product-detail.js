const imagesSrc = ["https://via.placeholder.com/96x96",
    "https://via.placeholder.com/96x96",
    "https://via.placeholder.com/616x464",
    "https://via.placeholder.com/96x96",
    "https://via.placeholder.com/96x96"];

const productInfo = [
    { label: 'Màn hình', value: 'IPS LCD, 5.8\', HD+' },
    { label: 'Hệ điều hành', value: 'Android One' },
    { label: 'Camera sau', value: '13 MP và 5 MP (2 camera)' },
    { label: 'Camera trước', value: '8 MP' },
    { label: 'CPU', value: 'MediaTek Helio P60 8 nhân 64-bit' },
    { label: 'RAM', value: '3 GB' },
    { label: 'Bộ nhớ trong', value: '32 GB' },
    { label: 'Thẻ nhớ', value: 'MicroSD, hỗ trợ tối đa 256 GB' },
    { label: 'Dung lượng pin', value: '3060 mAh, có sạc nhanh' },
];

let imagesIndex = 0;

document.addEventListener("DOMContentLoaded", () => {

    displayRateStars(3.5);
    loadProductPrice(19990000, 20);
    loadProductPreviewImages(imagesSrc);
    addEventListenerToImages();
    updateActivateImage(imagesIndex);
    createProductInfo(productInfo);
})

function updateBreadcrumb() {
    var url = window.location.href;
    var urlParts = url.split('/');
    var breadcrumbContainer = document.getElementById('breadcrumb');

    // Clear previous breadcrumb
    breadcrumbContainer.innerHTML = '';

    // Add home link
    var homeLink = document.createElement('a');
    homeLink.href = '/';
    homeLink.textContent = 'Home';
    breadcrumbContainer.appendChild(homeLink);

    var path = '';
    for (var i = 3; i < urlParts.length; i++) {
        path += '/' + urlParts[i];
        var link = document.createElement('a');
        link.href = path;
        link.textContent = urlParts[i];
        breadcrumbContainer.appendChild(document.createTextNode(' > '));
        breadcrumbContainer.appendChild(link);
    }
}

function loadProductPreviewImages(images) {
    const imagesContainer = document.getElementById("images-container");
    images.forEach((src, index) => {
        const newImage = document.createElement('img');
        newImage.src = src;
        newImage.classList.add("preview-img--small");
        imagesContainer.appendChild(newImage);
    });
}

function addEventListenerToImages() {
    const imagesContainer = document.getElementById("images-container");
    const images = imagesContainer.getElementsByClassName("preview-img--small");
    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener('click', function () {
            updateActivateImage(i);
        });
    }
}

function updateActivateImage(index) {
    const imagesContainer = document.getElementById("images-container");
    const images = imagesContainer.getElementsByClassName("preview-img--small");
    for (let i = 0; i < images.length; i++) {
        if (images[i].classList.contains("img-active")) {
            images[i].classList.remove("img-active");
        }
    }
    images[index].classList.add("img-active")
    updateMainImage(images[index]);
}

function updateMainImage(image) {
    const mainImage = document.getElementById("main-image");
    mainImage.src = image.src;
}

function nextImage() {
    const imagesContainer = document.getElementById("images-container");
    const Images = imagesContainer.getElementsByClassName("preview-img--small");
    imagesIndex = (imagesIndex + 1) % Images.length;
    updateActivateImage(imagesIndex)
}

function prevImage() {
    const imagesContainer = document.getElementById("images-container");
    const Images = imagesContainer.getElementsByClassName("preview-img--small");
    imagesIndex = (imagesIndex - 1 + Images.length) % Images.length;
    updateActivateImage(imagesIndex)
}

function displayRateStars(rating) {
    const starRatingContainer = document.getElementById('detail-stars');
    const listStars = Array.from(starRatingContainer.querySelectorAll('.icondetail-star'));
    starRatingContainer.innerHTML = '';

    const fullStarCount = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStarCount; i++) {
        const star = document.createElement('img');
        star.src = './assets/images/product-detail/star.svg';
        star.alt = 'star';
        star.className = 'icondetail-star';
        starRatingContainer.appendChild(star);
    }

    if (hasHalfStar) {
        const halfStar = document.createElement('img');
        halfStar.src = './assets/images/product-detail/half-star.svg';
        halfStar.alt = 'half-star';
        halfStar.className = 'icondetail-star';
        starRatingContainer.appendChild(halfStar);
    }

    const emptyStarCount = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStarCount; i++) {
        const emptyStar = document.createElement('img');
        emptyStar.src = './assets/images/product-detail/non-star.svg';
        emptyStar.alt = 'non-star';
        emptyStar.className = 'icondetail-star';
        starRatingContainer.appendChild(emptyStar);
    }
}

function loadProductPrice(originalPrice, discount) {
    var productPriceDiv = document.getElementById("product-price");
    var pricePresentElement = productPriceDiv.querySelector(".price-present");
    var priceOldElement = productPriceDiv.querySelector(".price-old");
    var promotionElement = productPriceDiv.querySelector(".promotion");
    if (discount > 0) {
        var newPrice = originalPrice * (1 - discount / 100);
        pricePresentElement.textContent = newPrice.toLocaleString() + "₫";
        priceOldElement.textContent = originalPrice.toLocaleString() + "₫";
        promotionElement.textContent = "-" + discount + "%";
    } else {
        pricePresentElement.textContent = originalPrice.toLocaleString() + "₫";
        priceOldElement.style.display = "none";
        promotionElement.style.display = "none";
    }
}

function createProductInfo(productInfo) {
    const listInfo = document.getElementById("product-info");
    productInfo.forEach(info => {
        const li = document.createElement('li');
        const label = document.createElement('p');
        const value = document.createElement('div');

        label.textContent = info.label;
        value.textContent = info.value;

        li.appendChild(label);
        li.appendChild(value);
        listInfo.appendChild(li);
    });
}
