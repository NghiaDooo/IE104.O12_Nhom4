const Pages = {
    USER_INFO: 'user-info',
    PURCHASED_ORDER: 'purchased-order'
};
const purchasedProducts = data;
var limitedProducts = 8;
var productsData = purchasedProducts;

function checkLoginState() {
    console.log(getCurrentUser());
    if (getCurrentUser() == null) {
        const parentContainer = document.querySelector('.user-container');
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        parentContainer.appendChild(overlay);
        createPopup("Bạn chưa đăng nhập!", "Đăng nhập", () => window.location.href = "login-register.html", () => window.location.href = "home.html");
        return;
    };
}

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
    console.log(btnSeeMore)
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
window.onload = checkLoginState();
document.addEventListener("DOMContentLoaded", () => {
    showLimitedProducts(data, document.getElementById("purchased-products"), limitedProducts);
    isShowedAllProducts();
})
