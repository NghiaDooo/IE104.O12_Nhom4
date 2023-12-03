
var purchasedProducts;
var limitedProducts = 8;
var productsData;

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

async function checkUserRole() {
    const currentUser = await getCurrentUser();
    if (currentUser && currentUser.accountInfo.role == 'admin') {
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
    if (limitedProducts >= productsData.length) {
        console.log(1)

        btnSeeMore.style.display = 'none';
    }
    else
        btnSeeMore.style.display = 'block';
}

function loadMoreProduct() {
    limitedProducts += 8;
    showLimitedProducts(data, document.getElementById("purchased-products"), limitedProducts);
    isShowedAllProducts();

}

async function loadUserProfile() {
    const user = await getCurrentUser();
    if (user) {
        const userName = document.getElementById('user-name');
        const userEmail = document.getElementById('user-email');
        const userAddress = document.getElementById('user-address');
        console.log(typeof user)
        userName.value = user.personalInfo.username || '';
        userEmail.textContent = user.accountInfo.email || '';
        userAddress.value = user.personalInfo.address || '';
    }
}

async function updateUserProfile() {
    const user = await getCurrentUser();
    const userName = document.getElementById('user-name');
    const userAddress = document.getElementById('user-address');

    if (userName.value == '') {
        alert("Tên người dùng không thể bị trống!");
        return;
    }

    console.log(user)
    if (userName.value == user.personalInfo.username && userAddress.value == user.personalInfo.address)
        return;
    user.personalInfo.username = filterXSS(userName.value);
    user.personalInfo.address = filterXSS(userAddress.value);
    console.log(user);
    await setCurrentUser(user);
    await setUser(user);
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

window.onload = async function () {
    await checkLoginState()
};
document.addEventListener("DOMContentLoaded", async () => {
    await checkUserRole();
    await loadUserProfile();
    if (getCurrentUser != null) {
        let user = await getCurrentUser()
        purchasedProducts = user.purchaseHistory;
        productsData = purchasedProducts;
        console.log(productsData)

        showLimitedProducts(productsData, document.getElementById("purchased-products"), limitedProducts);
        isShowedAllProducts();
    }

});