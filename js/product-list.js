
const product = [
    { productImage: './assets/images/product/3b45a80aa15dd6606ef1562a06207fcc.png'},
    { productRateStars: 5 },
    { productRateNumber: 536 },
    { productInfomation: 'Samsung Electronics Samsung Galexy S21 5G' },
    { productPrice: '$2,300' }
]

var phone = []

function displayRateStars(rating, starRatingContainer) {
    starRatingContainer.innerHTML = '';

    const fullStarCount = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStarCount; i++) {
        const star = document.createElement('img');
        star.src = './assets/images/product/Star_Orange.svg';
        star.alt = 'star';
        star.className = 'icondetail-star';
        starRatingContainer.appendChild(star);
    }

    if (hasHalfStar) {
        const halfStar = document.createElement('img');
        halfStar.src = './assets/images/product/half-star.svg';
        halfStar.alt = 'half-star';
        halfStar.className = 'icondetail-star';
        starRatingContainer.appendChild(halfStar);
    }

    const emptyStarCount = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStarCount; i++) {
        const emptyStar = document.createElement('img');
        emptyStar.src = './assets/images/product/StarNope.svg';
        emptyStar.alt = 'non-star';
        emptyStar.className = 'icondetail-star';
        starRatingContainer.appendChild(emptyStar);
    }
}

function addProduct(productData) {
    // Create product item container
    const productItem = document.createElement('div');
    productItem.className = 'product-item';

    // Create product image
    const productImage = document.createElement('img');
    productImage.className = 'product-image';
    productImage.src = productData[0].productImage;

    // Create product content
    const productContent = document.createElement('div');
    productContent.className = 'product-content';

    // Create product rate
    const productRate = document.createElement('div');
    productRate.className = 'product-rate';

    // Create product rate stars
    const productRateStars = document.createElement('div');
    productRateStars.className = 'product-rate-stars';
    displayRateStars(productData[1].productRateStars, productRateStars);

    // Create product rate number
    const productRateNumber = document.createElement('div');
    productRateNumber.className = 'product-rate-number';
    productRateNumber.innerText = productData[2].productRateNumber + ' đánh giá';

    // Append rate stars and number to rate container
    productRate.appendChild(productRateStars);
    productRate.appendChild(productRateNumber);

    // Create product info
    const productInfo = document.createElement('div');
    productInfo.className = 'product-info';
    productInfo.innerText = productData[3].productInfomation;

    // Create product price
    const productPrice = document.createElement('div');
    productPrice.className = 'product-price';
    productPrice.innerText = productData[4].productPrice;

    // Append all elements to product content
    productContent.appendChild(productRate);
    productContent.appendChild(productInfo);
    productContent.appendChild(productPrice);

    // Append image and content to product item
    productItem.appendChild(productImage);
    productItem.appendChild(productContent);

    // Append product item to product list
    productList.appendChild(productItem);
}

var phone = product.concat(product, phoneData);
addProduct(product);

