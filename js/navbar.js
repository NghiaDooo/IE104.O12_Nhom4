const InitNavbar = () => {
  const navbarContainer = document.getElementById('navbar');
  console.log(navbarContainer)
  const imageDirectory = '../assets/images/navbar/';
  let navbarHTML = `
  <div class="navigation">
            <div class="navigation__top-nav">
                <p class="top-nav__slogan">Welcome to AbcXyz online eCommerce store.</p>
                <div class="top-nav__right-content">
                    <div class="right-content__follow-us">
                        <div class="follow-us__text">Follow us:</div>
                        <a href="https://twitter.com"><img class="follow-us__social-icon"
                                src="img/logo-twitter.png" /></a>
                        <a href="https://facebook.com"><img class="follow-us__social-icon"
                                src="img/logo-facebook.png" /></a>
                        <a href="https://pinterest.com"><img class="follow-us__social-icon"
                                src="img/logo-pinterest.png" /></a>
                        <a href="https://reddit.com"><img class="follow-us__social-icon"
                                src="img/logo-reddit.png" /></a>
                        <a href="https://youtube.com"><img class="follow-us__social-icon"
                                src="img/logo-youtube.png" /></a>
                        <a href="https://instagram.com"><img class="follow-us__social-icon"
                                src="img/logo-instagram.png" /></a>
                    </div>
                    <img class="right-content__line-break" src="img/line-1.svg" />
                    <div class="right-content__call-now">
                        <img class="call-now__call-now-icon" src="img/icon-phone-call.png" />
                        <div class="call-now__call-now-number">123456789</div>
                    </div>
                </div>
            </div>
            <div class="navigation__middle-nav">
                <div class="middle-nav__logo">
                    <a href="link-to-homepage.html">
                        <img class="logo__logo-icon" src="img/logo.png" />
                        <div class="logo__logo-text">AbcXyz</div>
                    </a>
                </div>
                <div class="middle-nav__search">
                    <input type="text" id="search" name="search" class="search__search-input"
                        placeholder="Bạn tìm gì...">
                    <img id="search-icon" class="search__search-icon" src="img/icon-search.png " />
                </div>
                <div class="middle-nav__icons">
                    <a href="link-to-shopping-cart.html">
                        <img class="icons__img" src="img/icon-shopping-cart.png" />
                    </a>
                    <a href="link-to-help.html">
                        <img class="icons__img" src="img/icon-question.png" />
                    </a>
                    <a href="link-to-user-profile.html">
                        <img class="icons__img" src="img/icon-user.png" />
                    </a>
                </div>
            </div>
            <div class="navigation__bottom-nav">
                <div class="bottom-nav__item">
                    <a href="link-to-mobile-products.html">
                        <img class="item__item-icon" src="img/icon-mobile.png" />
                        <div class="item__item-title">ĐIỆN THOẠI</div>
                    </a>
                </div>
                <div class="bottom-nav__item">
                    <a href="link-to-earphone-products.html">
                        <img class="item__item-icon" src="img/icon-earphone.png" />
                        <div class="item__item-title">TAI NGHE</div>
                    </a>
                </div>
                <div class="bottom-nav__item">
                    <a href="link-to-backup-charger-products.html">
                        <img class="item__item-icon" src="img/icon-backup-charger.png" />
                        <div class="item__item-title">SẠC DỰ PHÒNG</div>
                    </a>
                </div>
                <div class="bottom-nav__item">
                    <a href="link-to-charger-cable-products.html">
                        <img class="item__item-icon" src="img/icon-charger-cable.png" />
                        <div class="item__item-title">SẠC, CÁP SẠC</div>
                    </a>
                </div>
                <div class="bottom-nav__item">
                    <a href="link-to-phone-case-products.html">
                        <img class="item__item-icon" src="img/icon-phone-case.png" />
                        <div class="item__item-title">ỐP LƯNG</div>
                    </a>
                </div>
                <div class="bottom-nav__item">
                    <a href="link-to-track-order.html">
                        <img class="item__item-icon" src="img/icon-track-order.png" />
                        <div class="item__item-title">THEO DÕI ĐƠN HÀNG</div>
                    </a>
                </div>
            </div>
        </div>
`;
  navbarHTML = navbarHTML.replace(/src="img\//g, `src="${imageDirectory}`);
  console.log(navbarHTML)
  navbarContainer.innerHTML = navbarHTML;
  // Create a link element for the CSS file
  const cssLink = document.createElement('link');
  cssLink.rel = 'stylesheet';
  cssLink.href = '../styles/navbar.css';

  // Append the link element to the head of the document
  document.head.appendChild(cssLink);
  const searchInput = document.getElementById('search');
  const searchIcon = document.getElementById('search-icon');

  searchIcon.addEventListener('click', function () {
    const searchValue = searchInput.value;
    alert('You searched for: ' + searchValue);
  });

}



