
const purchasedProducts = data;
var limitedProducts = 8;
var productsData = purchasedProducts;

function showTab(tabId, div) {
    document.querySelectorAll('.tab-active').forEach(function (div) {
        div.classList.remove('tab-active');
    });
    div.classList.add("tab-active");
    // Ẩn tất cả các tab
    document.querySelectorAll('article').forEach(function (article) {
        article.classList.remove('article-active');
    });

    // Hiển thị tab được chọn
    document.getElementById(tabId).classList.add('article-active');
    loadUserProfile()
}

function checkUserRole() {
    if (getCurrentUser().accountInfo.role == 'admin') {
        var logOutButton = document.querySelector('.box-left section div:last-child');
        var newDiv = document.createElement('div');
        newDiv.textContent = 'Trang admin';
        newDiv.addEventListener('click', () => {
            window.location.href = "admin.html"
        })
        logOutButton.parentNode.insertBefore(newDiv, logOutButton);
    }
}

function logOut() {
    setCurrentUser(null);
    window.location.href = "home.html"
}

/* Tab purchased order*/
function searchPurhasedProduct() {
    const searchKey = document.getElementById("search-purchased-product-text");
    if (searchKey.value == null) {
        document.getElementById("purchased-products").innerHTML = ''
        productsData = purchasedProducts;
        showLimitedProducts(productsData, document.getElementById("purchased-products"), limitedProducts);
        isShowedAllProducts();
        return;
    }
    document.getElementById("purchased-products").innerHTML = ''
    productsData = searchByNameLike(searchKey.value, purchasedProducts);
    if (productsData.length == 0)
        alert('Không tìm thấy sản phẩm!');
    showLimitedProducts(productsData, document.getElementById("purchased-products"), limitedProducts);
    isShowedAllProducts();
};

function isShowedAllProducts() {
    const btnSeeMore = document.getElementById("btn-see-more");
    if (productsData == null) {
        btnSeeMore.style.display = 'none';
        return
    }
    if (limitedProducts >= productsData.length)

        btnSeeMore.style.display = 'none';
    else
        btnSeeMore.style.display = 'block';
}

function loadMoreProduct() {
    limitedProducts += 8;
    showLimitedProducts(data, document.getElementById("purchased-products"), limitedProducts);
    isShowedAllProducts();

}

function loadUserProfile() {
    const user = getCurrentUser();
    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');
    const userAddress = document.getElementById('user-address');
    userName.value = user.personalInfo.username || '';
    userEmail.textContent = user.accountInfo.email || '';
    userAddress.value = user.personalInfo.address || '';
}

async function updateUserProfile() {
    const user = getCurrentUser();
    const userName = document.getElementById('user-name');
    const userAddress = document.getElementById('user-address');

    if (userName.value == '') {
        alert("Tên người dùng không thể bị trống!");
        return;
    }
    if (userName.value == user.personalInfo.username && userAddress.value == user.personalInfo.address)
        return;
    user.personalInfo.username = userName.value;
    user.personalInfo.address = userAddress.value;
    await setCurrentUser(user);
    setUser(user);
    loadUserProfile();
    alert("Cập nhật thông tin tài khoản thành công!");

}

function changeAvatar(event) {
    const input = event.target;
    const reader = new FileReader();

    reader.onload = function () {
        const avatarImg = document.getElementById('avatar-img');
        avatarImg.src = reader.result;
    };
    reader.readAsDataURL(input.files[0]);
}

window.onload = function () {
    checkLoginState()
};
document.addEventListener("DOMContentLoaded", () => {
    checkUserRole();
    loadUserProfile()
    showLimitedProducts(productsData, document.getElementById("purchased-products"), limitedProducts);
    isShowedAllProducts();
});