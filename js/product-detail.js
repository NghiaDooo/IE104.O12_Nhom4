document.addEventListener("DOMContentLoaded", () => {
    const product = loadProduct(data);
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("details-rate-totals").textContent = `(${product.rateCount} đánh giá)`;
    document.getElementById("main-image").src = product.img;
    document.getElementById("main-image").alt = product.name;

    displayRateStars(product.star, document.getElementById("detail-stars"));
    loadProductPrice(product.promo.value, product.promo.old_price, product.promo.new_price);
    createProductInfo(product.detail);
})

function loadProduct(products) {
    const currentURL = window.location.href;
    // const queryString = filterXSS(currentURL.split('?')[1]);
    const queryString = currentURL.split('?')[1];
    const queryParams = new URLSearchParams(queryString);
    const productId = queryParams.get('id');
    if (productId == null) {
        window.location.href = "home.html"
    }
    return products.find(product => product.id === productId)
}

function loadProductPrice(discount, old_price, new_price) {
    var productPriceDiv = document.getElementById("product-price");
    var pricePresentElement = productPriceDiv.querySelector(".price-present");
    var priceOldElement = productPriceDiv.querySelector(".price-old");
    var promotionElement = productPriceDiv.querySelector(".promotion");
    if (discount != 0) {
        pricePresentElement.textContent = new_price;
        priceOldElement.textContent = old_price;
        promotionElement.textContent = discount;
    } else {
        pricePresentElement.textContent = new_price;
        priceOldElement.style.display = "none";
        promotionElement.style.display = "none";
    }
}

function createProductInfo(productInfo) {
    const listInfo = document.getElementById("product-info");
    for (const key in productInfo) {
        if (Object.hasOwnProperty.call(productInfo, key)) {
            const info = productInfo[key];
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
        }
    }
}

console.log(loadProduct(data))


