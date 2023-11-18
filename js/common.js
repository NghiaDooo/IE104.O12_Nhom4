document.addEventListener("DOMContentLoaded", function () {
    InitNavbar();
    InitFooter();
});

const userContainer = {
    currentUser: null
};
function getAllUsers() {
    return JSON.parse(localStorage.getItem('userList')) || [];
}

function addUser(user) {
    var userList = JSON.parse(localStorage.getItem('userList')) || [];
    var existingUser = userList.find(function (existingUser) {
        return existingUser.email === user.email;
    });
    if (!existingUser) {
        userList.push(user);
        localStorage.setItem('userList', JSON.stringify(userList));
        return true;
    } else {
        return false;
    }
}

function readJSON(path, callback) {
    var request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open('GET', path, true);
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var data = JSON.parse(request.responseText);
            callback(data);
        } else if (request.readyState == 4) {
            console.log('Không thể đọc tệp JSON');
        }
    };
    request.send(null);
}

function displayRateStars(rating, starRatingContainer) {
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

function addProduct(productData, productList) {
    // Create product item container
    const productItem = document.createElement('div');
    productItem.className = 'product-item';

    const productImageContainer = document.createElement('div');
    productImageContainer.className = 'overlap-group';

    // Create product image
    const productImage = document.createElement('img');
    productImage.className = 'product-image';
    productImage.src = productData.img; // Set the default image source

    // Create other div elements
    const hotProductDiv = document.createElement('div');
    hotProductDiv.id = 'hot-product';

    const saleProductDiv = document.createElement('div');
    saleProductDiv.id = 'sale-product';

    // Create product content
    const productContent = document.createElement('div');
    productContent.className = 'product-content';

    // Create product rate
    const productRate = document.createElement('div');
    productRate.className = 'product-rate';

    // Create product rate stars
    const productRateStars = document.createElement('div');
    productRateStars.className = 'product-rate-stars';
    displayRateStars(productData.star, productRateStars); // Use the 'star' property from the productData object

    // Create product rate number
    const productRateNumber = document.createElement('div');
    productRateNumber.className = 'product-rate-number';
    productRateNumber.innerText = `(${productData.rateCount} đánh giá)`; // Use the 'rateCount' property from the productData object

    // Append rate stars and number to rate container
    productRate.appendChild(productRateStars);
    productRate.appendChild(productRateNumber);

    // Create product info
    const productInfo = document.createElement('div');
    productInfo.className = 'product-name';
    productInfo.innerText = productData.title; // Use the 'title' property from the productData object

    // Create product price
    const productPrice = document.createElement('div');
    productPrice.className = 'product-price';
    productPrice.innerText = productData.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }); // Format price as currency

    // Append all elements to product content
    productContent.appendChild(productRate);
    productContent.appendChild(productInfo);
    productContent.appendChild(productPrice);

    // Append image and other div elements to the container
    productImageContainer.appendChild(productImage);
    productImageContainer.appendChild(hotProductDiv);
    productImageContainer.appendChild(saleProductDiv);

    // Append the entire container to the product item
    productItem.appendChild(productImageContainer);
    productItem.appendChild(productContent);

    // Add CSS
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = '../styles/product.css';
    document.head.appendChild(cssLink);

    // Add a click event listener to the product item
    productItem.addEventListener('click', function () {
        window.location.href = `product-detail.html?id=${productData.id}`;
    });

    // Append product item to product list
    productList.appendChild(productItem);
}
