let productsOnCart;

async function loadproductsOnCart() {
    user = await getCurrentUser();
    productsOnCart = user.shoppingCart;
    console.log(productsOnCart)
}


function activePayMethod(methodActive) {
    var buttons = document.querySelectorAll('.payment-method button');
    buttons.forEach(function (button) {
        button.classList.remove('selected');
        button.querySelector('img').src = './assets/images/shopping-cart/uncheck.svg';
    });
    methodActive.classList.add('selected');
    methodActive.querySelector('img').src = './assets/images/shopping-cart/checked.svg';
}

function renderCartProduct(data) {
    var productDiv = document.createElement('div');
    productDiv.classList.add('product-card');

    // Tạo một biến để lưu trữ quantity
    var quantity = 1;

    // Tạo nội dung HTML dựa trên dữ liệu được cung cấp
    var html = `
        <div class="card" product-id="${data.id}">
            <div class="img-box">
                <img src="${data.img}" width="80px" alt="${data.name}" class="product-img">
            </div>
            <div class="detail">
                <h4 class="product-name">${data.name}</h4>
                <div class="wrapper">
                    <div class="product-qty">
                        <button id="decrement" onclick="decrementQuantity(${data.price}, this)">-</button>
                        <span id="quantity">${quantity}</span>
                        <button id="increment" onclick="incrementQuantity(${data.price}, this)">+</button>
                    </div>
                    <div class="price">
                        <span id="price">${(data.price * quantity).toLocaleString('vi-VN')}₫</span>
                    </div>
                </div>
            </div>
            <button class="product-close-btn" onclick="removeProduct(this)">
                <img src="./assets/images/shopping-cart/trash.svg">
            </button>
        </div>
    `;

    // Đặt nội dung HTML vào đối tượng div
    productDiv.innerHTML = html;

    // Thêm đối tượng div vào vị trí mong muốn trong tài liệu
    document.getElementById("cart-item-box").appendChild(productDiv);
}




// Hàm tăng quantity
function incrementQuantity(price, incrementBtn) {
    var quantityElement = incrementBtn.previousElementSibling;
    var quantity = parseInt(quantityElement.textContent);
    quantity++;
    quantityElement.textContent = quantity;

    // Cập nhật giá sản phẩm dựa trên quantity mới
    var wrapperDiv = incrementBtn.parentElement;
    var priceElement = wrapperDiv.nextElementSibling; // 
    priceElement.textContent = (price * quantity).toLocaleString('vi-VN') + '₫';
    updateTotalAmount()
}

// Hàm giảm quantity
function decrementQuantity(price, decrementBtn) {
    var quantityElement = decrementBtn.nextElementSibling;
    var quantity = parseInt(quantityElement.textContent);

    // Đảm bảo quantity không thể nhỏ hơn 1
    if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;

        // Cập nhật giá sản phẩm dựa trên quantity mới
        var wrapperDiv = decrementBtn.parentElement;
        var priceElement = wrapperDiv.nextElementSibling; // 
        priceElement.textContent = (price * quantity).toLocaleString('vi-VN') + '₫';
        updateTotalAmount()
    }
}

// Hàm xóa sản phẩm khỏi giỏ hàng
async function removeFromCart(productId) {
    const user = await getCurrentUser();
    if (user) {
        const indexToRemove = user.shoppingCart.findIndex(item => item.id === productId);
        if (indexToRemove !== -1) {
            // Xóa sản phẩm khỏi giỏ hàng
            user.shoppingCart.splice(indexToRemove, 1);
            await setCurrentUser(user);
            setUser(await getCurrentUser());
        }
    }
}

// Hàm xóa sản phẩm
function removeProduct(element) {
    var productCard = element.parentElement.parentElement;
    const productId = element.parentElement.getAttribute('product-id');
    removeFromCart(productId);
    productCard.classList.add('removing');

    // Sử dụng setTimeout để chờ hiệu ứng kết thúc trước khi xóa phần tử
    setTimeout(function () {
        element.parentElement.remove();
        updateTotalAmount();
    }, 500);
}

function updateTotalAmount() {
    // Lấy tất cả các phần tử giá của sản phẩm
    var productPriceElements = document.getElementsByClassName("price");

    // Tính tổng giá từ các phần tử giá và cập nhật tổng giá
    totalAmount = Array.from(productPriceElements).reduce((sum, element) => {
        var price = parseInt(element.textContent.replace(/[^0-9]/g, ''));
        return sum + price;
    }, 0);

    // Cập nhật hiển thị tổng giá trên giao diện
    var totalAmountElement = document.getElementById("subtotal");
    console.log(totalAmountElement)
    totalAmountElement.textContent = totalAmount.toLocaleString('vi-VN') + '₫';
    if (totalAmount > 0) {
        var shipFeeElement = document.getElementById("shipping");
        shipFeeElement.textContent = Number(50000).toLocaleString('vi-VN') + '₫';
        var totalElement = document.getElementById("total");
        var total = totalAmount + 50000; // Giả sử shipFee là 50000
        totalElement.textContent = total.toLocaleString('vi-VN') + '₫';

    }
    else {
        var shipFeeElement = document.getElementById("shipping");
        shipFeeElement.textContent = Number(0).toLocaleString('vi-VN') + '₫';
        var totalElement = document.getElementById("total");
        totalElement.textContent = Number(0).toLocaleString('vi-VN') + '₫';
    }



}


function validateForm() {
    const name = document.getElementById('name').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const provinceCity = document.getElementById('province-city').value;
    const district = document.getElementById('district').value;
    const wards = document.getElementById('wards').value;
    const address = document.getElementById('address').value;

    // Perform your validation logic here
    if (!name || !phoneNumber || !provinceCity || !district || !wards || !address) {
        return false;
    }



    return true;
}

function clearAllOnShoppingCart() {

}

async function payButtonClick() {
    if (validateForm()) {
        alert('Đơn hàng của bạn đã được đặt!');
        const user = await getCurrentUser();
        if (user) {
            user.purchaseHistory.push(user.shoppingCart)
            user.shoppingCart = []
            await setCurrentUser(user);
            setUser(await getCurrentUser());
        }
        window.location.href = 'home.html'

    }
    else {
        alert('Vui lòng nhập đầy đủ thông tin!');
    }
}

window.onload = async function () {
    await checkLoginState()
};

document.addEventListener("DOMContentLoaded", async function () {
    var provinceSelect = document.getElementById("province-city");
    var districtSelect = document.getElementById("district");
    var wardSelect = document.getElementById("wards");

    await loadproductsOnCart();
    productsOnCart.forEach(product => renderCartProduct(product))


    // Hàm để điền dữ liệu vào dropdown
    function populateDropdown(selector, data) {
        console.log(data)
        var dropdown = document.getElementById(selector);
        dropdown.innerHTML = '<option value=""></option>';
        data.forEach(function (item) {
            var option = document.createElement("option");
            option.value = item.code;
            option.text = item.name;
            dropdown.appendChild(option);
        });
    }

    // Gọi API để lấy dữ liệu tỉnh/thành phố
    fetch("https://provinces.open-api.vn/api/")
        .then(response => response.json())
        .then(data => populateDropdown("province-city", data));

    // Sự kiện khi chọn tỉnh/thành phố để lấy dữ liệu quận/huyện
    provinceSelect.addEventListener("change", function () {
        var selectedProvince = this.value;
        console.log(selectedProvince)
        fetch(`https://provinces.open-api.vn/api/d/`)
            .then(response => response.json())
            .then(data => data.filter(item => item.province_code == selectedProvince))
            .then(data => populateDropdown("district", data));
        var selectElement = document.getElementById("wards");
        selectElement.innerHTML = '';
    });

    // Sự kiện khi chọn quận/huyện để lấy dữ liệu phường/xã
    districtSelect.addEventListener("change", function () {
        var selectedDistrict = districtSelect.value;
        fetch(`https://provinces.open-api.vn/api/w/`)
            .then(response => response.json())
            .then(data => data.filter(item => item.district_code == selectedDistrict))
            .then(data => populateDropdown("wards", data));
    });
    updateTotalAmount();
});