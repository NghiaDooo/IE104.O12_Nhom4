

// Đếm số cột của grid container rồi tính 
let gridContainer = document.querySelector('.list-product');
let computedStyle = window.getComputedStyle(gridContainer);
let gridColumnValue = computedStyle.getPropertyValue('grid-template-columns');
let gridColumnNumbers = gridColumnValue.split(' ').map(column => parseInt(column, 10)).length;
let limitedProducts = gridColumnNumbers * 2;

let listProduct = data;
console.log(limitedProducts)

document.addEventListener('DOMContentLoaded', async function () {
    let counter = 2;
    setInterval(function () {
        document.getElementById('radio' + counter).checked = true;
        counter++;
        if (counter > 4) {
            counter = 1;
        }
    }, 5000);
    filterProductsByUrl();

});

function loadFilterUI() {
    let currentUrl = window.location.href;
    let filterButtons = document.querySelectorAll('.filter-box .filter-button');

    // Kiểm tra nếu currentUrl không chứa bất kỳ giá trị nào trong href của thẻ "All"
    if (!currentUrl.includes('?')) {

        let allElements = document.querySelectorAll('.filter-list .filter-box a[href*="=all"]');

        allElements.forEach(function (element) {
            element.classList.add('filter-button-active');
        });
        return;
    }

    function paramsMatch(currentUrl, hrefValue) {
        // Escape các ký tự đặc biệt trong hrefValue để tránh chúng được hiểu là các biểu thức chính quy
        let escapedHrefValue = hrefValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        // Tạo biểu thức chính quy với hrefValue và không quan trọng đến dấu ? (không gian trắng không quan trọng)
        let regex = new RegExp(escapedHrefValue.replace(/\?/g, "\\?"), "i");

        // Kiểm tra xem regex có khớp với currentUrl hay không
        return regex.test(currentUrl);
    }

    filterButtons.forEach(function (button) {
        let hrefValue = button.getAttribute('href');

        if (!currentUrl.includes(hrefValue.toString().split('?')[1].split('=')[0])) {
            let filterBox = button.closest('.filter-box');
            let filterButton = filterBox.querySelector('a[href*="=all"]');
            if (filterButton) {
                filterButton.classList.add('filter-button-active');
            }
        }

        if (paramsMatch(currentUrl, hrefValue)) {
            button.classList.add('filter-button-active');
        }
    });
}


function handleFilterClick(event) {
    event.preventDefault();
    let filterBox = event.target.closest('.filter-box');
    if (filterBox) {
        let filterButtons = filterBox.querySelectorAll('.filter-button');
        filterButtons.forEach(function (button) {
            button.classList.remove('filter-button-active');
        });
        event.target.classList.add('filter-button-active');
    }

    const filterValue = event.currentTarget.getAttribute('href').split('=')[1];
    const filterType = event.currentTarget.getAttribute('href').split('=')[0].split('?')[1];
    if (filterType == 'brand') {
        if (event.currentTarget.classList.contains("filter-active")) {
            event.currentTarget.classList.remove("filter-active");
        } else {
            event.currentTarget.classList.add("filter-active");
        }
    }
    updateUrlParameter(filterType, filterValue);
    filterProductsByUrl()
}

function updateUrlParameter(param, value) {
    const url = new URL(window.location.href);
    // Kiểm tra nếu giá trị là 'all' thì xóa tham số khỏi URL
    if (value === 'all') {
        url.searchParams.delete(param);

    } else {
        if (param == 'brand') {
            const values = url.searchParams.getAll(param);
            const valuesArray = values.length > 0 ? values.toString().split(',') : [];

            if (valuesArray.includes(value)) {
                const index = valuesArray.indexOf(value);
                valuesArray.splice(index, 1);
            } else {

                valuesArray.push(value);
            }

            if (valuesArray.length > 0) {
                url.searchParams.set(param, valuesArray.join(','));
            }
            else
                url.searchParams.delete(param);
        } else {
            url.searchParams.set(param, value);
        }


    }
    history.pushState(null, null, url.href);
}

function filterProductsByUrl() {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1]);

    const typeParam = urlParams.get('type');
    const priceParam = urlParams.get('price');
    const brandParam = urlParams.get('brand');
    const keywordParam = urlParams.get('keyword');

    //translate type to Vietnamese
    let vietnameseType;
    switch (typeParam) {
        case 'phone':
            vietnameseType = 'Điện thoại';
            break;
        case 'headphone':
            vietnameseType = 'Tai nghe';
            break;
        case 'backup-charging':
            vietnameseType = 'Sạc dự phòng';
            break;
        case 'charging-cable':
            vietnameseType = 'Adapter sạc, chuyển đổi';
            break;
        default:
            vietnameseType = typeParam;
            break;
    }

    const priceRange = priceParam
        ? priceParam.split('-').map(value => (value.toLowerCase() === 'all' ? null : Number(value)))
        : null;

    // Filter products based on URL parameters
    const filteredProducts = data.filter(product => {
        const isTypeMatch =
            !typeParam || product.cate.toLowerCase() === vietnameseType.toLowerCase();

        const isPriceMatch =
            !priceRange ||
            (priceRange[0] === 0 || product.price >= priceRange[0]) &&
            (priceRange[1] === 0 || product.price <= priceRange[1]);

        const isBrandMatch =
            !brandParam || brandParam.includes(product.brand.toLowerCase());

        const regex = new RegExp(keywordParam, 'i'); // Sử dụng cờ 'i' để không phân biệt chữ hoa, chữ thường

        const isKeywordMatch = !keywordParam || regex.test(product.name);


        return isTypeMatch && isPriceMatch && isBrandMatch && isKeywordMatch;
    });
    limitedProducts = gridColumnNumbers * 4;
    listProduct = filteredProducts;
    updateProductList();
}

async function updateProductList() {
    await loadFilterUI();
    try {

        await (async () => {
            const productListContainer = document.getElementById('list-product');
            productListContainer.innerHTML = `<button id="btn-see-more" class="btn-see-more" onclick="loadMoreProduct()">Xem thêm</button>`;

        })();

        if (listProduct.length === 0) {
            alert("Không tìn thấy sản phẩm!");
            isShowedAllProducts();
        }
        else {
            const productListContainer = document.getElementById('list-product');
            console.log(limitedProducts)
            showLimitedProducts(listProduct, productListContainer, limitedProducts);
            isShowedAllProducts();
        }
    } catch (error) {
        console.error('Error:', error);
    }

}

function isShowedAllProducts() {
    const btnSeeMore = document.getElementById("btn-see-more");
    if (listProduct == null) {
        btnSeeMore.style.display = 'none';
        return
    }
    if (limitedProducts >= listProduct.length)

        btnSeeMore.style.display = 'none';
    else
        btnSeeMore.style.display = 'block';
}

function loadMoreProduct() {
    if (limitedProducts <= listProduct.length) {
        limitedProducts += gridColumnNumbers;
        showLimitedProducts(listProduct, document.getElementById("list-product"), limitedProducts);
    }
    isShowedAllProducts();

}

