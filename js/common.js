document.addEventListener("DOMContentLoaded", function () {
    InitNavbar();
    InitFooter();
    addGoToTopBTN();
});

function addGoToTopBTN() {
    const goToTopBtn = document.createElement('button');
    const goToTopImg = document.createElement('img');

    // Cấu hình các thuộc tính và nội dung của button
    goToTopBtn.classList.add('go-to-top-btn');
    goToTopBtn.style.display = 'none';
    //thêm ảnh vào nút
    goToTopImg.src = "../assets/images/arrow-up.svg"
    goToTopBtn.appendChild(goToTopImg);

    goToTopBtn.addEventListener('click', function () {
        document.body.scrollIntoView({
            behavior: 'smooth', // Làm cho cuộn mượt mà
            block: 'start' // Cuộn đến đầu của phần tử mục tiêu
        });
    });


    // Thêm sự kiện cuộn để ẩn/hiển thị nút
    window.addEventListener('scroll', function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            goToTopBtn.style.display = 'block';
        } else {
            goToTopBtn.style.display = 'none';
        }
    });

    // Thêm button vào body
    document.body.appendChild(goToTopBtn);
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}


function getAllUsers() {
    return JSON.parse(localStorage.getItem('userList')) || [];
}

function setUser(userUpdate) {
    const users = getAllUsers();
    for (let i = 0; i < users.length; i++) {
        if (users[i].accountInfo.email === userUpdate.accountInfo.email) {
            users[i] = userUpdate;
            break;
        }
    }
    localStorage.setItem('userList', JSON.stringify(users));
}

function addUser(user) {
    var userList = JSON.parse(localStorage.getItem('userList')) || [];
    var existingUser = userList.find(function (existingUser) {
        return existingUser.email === user.accountInfo.email;
    });

    if (!existingUser) {
        userList.push(user);
        localStorage.setItem('userList', JSON.stringify(userList));
        return true;
    } else {
        return false;
    }
}

function checkLoginState() {
    if (getCurrentUser() == null) {
        var parentContainer = document.querySelector('body > :nth-child(2)');
        const overlay = document.createElement('div');
        overlay.classList.add('overlay-unlogged');
        parentContainer.appendChild(overlay);
        createPopup("Bạn chưa đăng nhập!", "Đăng nhập", () => window.location.href = "login-register.html", () => window.location.href = "home.html");
        return;
    };
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


    // Append all elements to product content
    productContent.appendChild(productRate);
    productContent.appendChild(productInfo);
    productContent.appendChild(productPrice);

    if (productData.promo.old_price != 0) {
        const oldPrice = document.createElement('div');
        oldPrice.className = 'old-product-price';
        oldPrice.innerText = productData.promo.old_price;
        productPrice.appendChild(oldPrice);
    }

    const newPrice = document.createElement('div');
    newPrice.className = 'new-product-price';
    newPrice.innerText = productData.promo.new_price;
    productPrice.appendChild(newPrice);


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
    if (products == null) {
        return;
    }
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

function searchByNameLike(keyword, listData) {
    const regex = new RegExp(keyword, 'i'); // 'i' để không phân biệt chữ hoa và chữ thường
    return listData.filter(item => regex.test(item.name));
};


console.log(getAllUsers())