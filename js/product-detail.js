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


    displayRateStars(3.5, document.getElementById("detail-stars"));
    loadProductPrice(19990000, 15);
    loadProductPreviewImages(imagesSrc);
    addEventListenerToImages();
    updateActivateImage(imagesIndex);
    createProductInfo(productInfo);
})

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
        if (info.value !== null) {
            const li = document.createElement('li');
            const label = document.createElement('p');
            const value = document.createElement('div');

            label.textContent = info.label;
            value.textContent = info.value;

            li.appendChild(label);
            li.appendChild(value);
            listInfo.appendChild(li);
        }
    });
}

