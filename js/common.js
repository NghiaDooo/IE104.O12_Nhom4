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

async function getCurrentUser() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser){
        return await decodedJwt(currentUser.JWT, currentUser.secretKey);
    }else{
        return currentUser;
    }
}

async function setCurrentUser(user) {
    if(user){
        const secretKey = await hashPassword(user.accountInfo.password);
        delete user.accountInfo.password;
        delete user.accountInfo.salt;
        const jwt = await encodedJWT(user, secretKey.hashedPassword);
        const currentUser = {
            JWT : jwt,
            secretKey: secretKey.hashedPassword,
        }
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }else{
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
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

async function checkLoginState() {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
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
    // Create product item container as a string
    let productItemHTML = `
        <div class="product-item">
            <div class="overlap-group">
                <img class="product-image" src="${productData.img}">
                <div id="hot-product"></div>
                <div id="sale-product"></div>
            </div>
            <div class="product-content">
                <div class="product-rate">
                    <div id="product-rate-stars" class="product-rate-stars"></div>
                    <div class="product-rate-number">(${productData.rateCount} đánh giá)</div>
                </div>
                <div class="product-name">${productData.title}</div>
                <div class="product-price">
                    ${productData.promo.old_price !== 0 ? `<div class="old-product-price">${productData.promo.old_price}</div>` : ''}
                    <div class="new-product-price">${productData.promo.new_price}</div>
                </div>
            </div>
        </div>
    `;



    // Create a temporary container element
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = productItemHTML;

    // Get the first child, which is the product item
    const productItem = tempContainer.firstElementChild;;
    // load rate star
    displayRateStars(productData.star, productItem.querySelector('#product-rate-stars'));

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