function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}


document.addEventListener("DOMContentLoaded", function () {
    InitNavbar();
    InitFooter();
});



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

// Hàm hiển thị số lượng nhất định sản phẩm
function showLimitedProducts(products, productList, limit) {
    for (let i = 0; i < limit && i < products.length; i++) {
        addProduct(products[i], productList);
    }
}

// Hàm hiển thị tất cả sản phẩm
function showAllProducts(products, productList) {
    productList.innerHTML = ''; // Xóa danh sách hiện tại

    // Hiển thị tất cả sản phẩm
    for (const product of products) {
        addProduct(product, productList);
    }
}

function addProductOnBasket(productData, productList) {
    // Tạo phần tử div chứa sản phẩm
    var productContainer = document.createElement('div');
    productContainer.className = 'product-on-basket';
    productContainer.id = productData.id; // Thêm id của sản phẩm vào productContainer

    // Tạo nút xóa
    var deleteButton = document.createElement('button');
    deleteButton.id = 'btn-delete';
    deleteButton.className = 'button';
    deleteButton.innerHTML = '<img src="img/regular-xcircle-1.svg" />';
    deleteButton.addEventListener('click', function () {
        deleteProductOnBasket(this);
    });
    productContainer.appendChild(deleteButton);

    // Tạo hình ảnh sản phẩm
    var productImage = document.createElement('img');
    productImage.className = 'product-image';
    productImage.src = productData.img;
    productContainer.appendChild(productImage);

    // Tạo tên sản phẩm
    var productName = document.createElement('p');
    productName.className = 'name';
    productName.textContent = productData.name;
    productContainer.appendChild(productName);

    // Tạo giá
    var priceContainer = document.createElement('div');
    priceContainer.className = 'price';

    var oldPrice = document.createElement('div');
    oldPrice.className = 'old-price';
    oldPrice.textContent = productData.promo.old_price;
    priceContainer.appendChild(oldPrice);

    var newPrice = document.createElement('div');
    newPrice.className = 'new-price';
    newPrice.textContent = productData.promo.new_price;
    priceContainer.appendChild(newPrice);

    productContainer.appendChild(priceContainer);


    // Tạo số lượng
    var quanty = document.createElement('input');
    quanty.type = 'number';
    quanty.id = 'quanty';
    quanty.className = 'quanty';
    quanty.value = '1';
    quanty.min = '1';
    productContainer.appendChild(quanty);

    // Tạo tổng giá
    var totalPrice = document.createElement('div');
    totalPrice.className = 'total-price';
    totalPrice.setAttribute('data', productData.price);
    totalPrice.textContent = productData.promo.new_price;
    productContainer.appendChild(totalPrice);
    // Thêm sản phẩm vào danh sách sản phẩm
    productList.appendChild(productContainer);
    quanty.addEventListener('input', () => {
        quanty.nextSibling.setAttribute('data', quanty.value * productData.price);
        quanty.nextSibling.textContent = quanty.nextSibling.getAttribute('data').toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + "₫";
    })
}

function deleteProductOnBasket(deleteButton) {
    var productContainer = deleteButton.closest('.product-on-basket');
    if (productContainer) {
        var productId = productContainer.id;
        productContainer.remove();
    }
}

function createPopup(message, continueText, continueCallback, cancelCallback) {
    // Tạo overlay
    var overlay = document.createElement('div');
    overlay.className = 'overlay-popup';

    // Tạo một thẻ div để chứa nội dung popup
    var popupDiv = document.createElement('div');
    popupDiv.className = 'popup';

    // Tạo nội dung thông báo
    var messageElement = document.createElement('p');
    messageElement.textContent = message;

    var buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    // Tạo nút "Tiếp tục"
    var continueButton = document.createElement('button');
    continueButton.textContent = continueText;
    continueButton.className = 'continue'
    continueButton.addEventListener('click', function () {
        // Gọi callback function khi nút "Tiếp tục" hoặc "Hủy" được nhấn
        if (continueCallback && typeof continueCallback === 'function') {
            continueCallback();
        }
        // Ẩn popup và overlay, sau đó xóa chúng khỏi DOM
        document.body.removeChild(overlay);
    });

    // Tạo nút "Hủy"
    var cancelButton = document.createElement('button');
    cancelButton.textContent = 'Hủy';
    cancelButton.className = 'cancel'
    cancelButton.addEventListener('click', function () {
        if (cancelCallback && typeof cancelCallback === 'function') {
            cancelCallback();
        }
        // Ẩn popup và overlay, sau đó xóa chúng khỏi DOM
        document.body.removeChild(overlay);
    });

    // Thêm nội dung và nút vào popup
    popupDiv.appendChild(messageElement);
    buttonContainer.appendChild(continueButton);
    buttonContainer.appendChild(cancelButton);
    popupDiv.appendChild(buttonContainer);
    overlay.appendChild(popupDiv)

    // Thêm overlay và popup vào body của trang
    document.body.appendChild(overlay);
}

const searchByNameLike = (keyword, listData) => {
    const regex = new RegExp(keyword, 'i'); // 'i' để không phân biệt chữ hoa và chữ thường
    return listData.filter(item => regex.test(item.name));
};


console.log(getAllUsers())