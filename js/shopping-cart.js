function addProductOnCart(product) {
    // Get the tbody element
    let tbody = document.querySelector('#product-table tbody');

    // Create a new row
    let newRow = document.createElement('tr');

    // Add the HTML content for the new row based on product data
    newRow.innerHTML = `
                <td class="col-product">
                    <div class="product-media">
                        <a class="" href="product-detail.html?id=${product.id}">
                            <img class="" src="${product.img}" alt="${product.name}">
                        </a>
                        <div class="">
                            <h4 class=""><a href="product-detail.html?id=${product.id}">${product.name}</a></h4>
                        </div>
                    </div>
                </td>
                <td class="col-quantity"><input class="quantity" value="1" type="number" min="1" data-price="${product.price}"></td>
                <td class="col-price">
                    <p class="price_table">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</p>
                </td>
                <td class="col-total">
                    <p class="price_table">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</p>
                </td>
                <td class="col-action">
                    <button type="button" class="button-delete">
                        <img src="./assets/images/shopping-cart/trash.svg" alt="">
                        <div>Remove</div>
                    </button>
                </td>
            `;

    // Append the new row to the tbody
    tbody.appendChild(newRow);

    // Add an event listener to the quantity input for updating the total price
    let quantityInput = newRow.querySelector('.quantity');
    quantityInput.addEventListener('input', function () {
        updateTotalPrice(newRow);
    });

    // Add an event listener to the delete button for removing the row
    let deleteButton = newRow.querySelector('.button-delete');
    deleteButton.addEventListener('click', function () {
        removeProduct(newRow);
    });
}

function updateTotalPrice(row) {
    let quantityInput = row.querySelector('.quantity');
    let price = parseInt(quantityInput.getAttribute('data-price'));
    let quantity = parseInt(quantityInput.value);
    let totalPrice = price * quantity;

    // Update the total price in the row
    let totalCell = row.querySelector('.col-total .price_table');
    totalCell.textContent = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice);
    updateCartTotals()
}

function removeProduct(row) {
    row.remove();
    updateCartTotals()
}

function updateCartTotals() {
    let feeProductsElement = document.getElementById('fee-products');
    let feeShipElement = document.getElementById('fee-ship');
    let cartTotalElement = document.getElementById('cart-total');
    let productTable = document.getElementById("product-table");
    let productTableTBody = productTable.getElementsByTagName('tbody')[0];

    let productTotal = 0;
    let deliveryFee = 30000;

    if (productTableTBody.rows.length === 0) {
        feeProductsElement.innerHTML = "";
        feeShipElement.innerHTML = "";
        cartTotalElement.innerHTML = "";
        return;
    }

    // Lấy số hàng trong bảng
    var rowCount = productTableTBody.rows.length;

    for (var i = 0; i < rowCount; i++) {
        var cellIndex = productTableTBody.rows[i].cells.length - 2;
        if (cellIndex >= 0) {

            var integerValue = parseInt(productTableTBody.rows[i].cells[cellIndex].textContent.replace(/\./g, ''));

            if (!isNaN(integerValue)) {
                productTotal += integerValue;
                console.log("Giá trị số nguyên:", integerValue);
            } else {
                console.error("Không thể chuyển đổi thành số nguyên:", productTableTBody.rows[i].cells[cellIndex].textContent);
            }
        } else {
            console.error("Không có ô thứ hai từ cuối cùng trong hàng:", i);
        }
    }


    feeProductsElement.innerHTML = `${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(productTotal)}`;
    feeShipElement.innerHTML = `${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(deliveryFee)}`;
    cartTotalElement.innerHTML = `${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(productTotal + deliveryFee)}`;


}

addProductOnCart(data[1]);
addProductOnCart(data[2]);
updateCartTotals();

function updateTotalCartUI(productList) {
    // TODO: Cập nhật giao diện hiển thị giỏ hàng theo danh sách sản phẩm mới
    // Bạn có thể sử dụng DOM manipulation để làm điều này
}