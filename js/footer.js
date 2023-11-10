const InitFooter = () => {
    const footerContainer = document.getElementById('footer');
    console.log(footerContainer)
    const imageDirectory = '../assets/images/footer/';
    let footerHTML = `
 <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="footer__col">
                        <h4 class="footer__title">company</h4>
                        <ul class="footer__list">
                            <li class="footer__item"><a class="footer__link" href="#">about us</a></li>
                            <li class="footer__item"><a class="footer__link" href="#">our services</a></li>
                            <li class="footer__item"><a class="footer__link" href="#">privacy policy</a></li>
                            <li class="footer__item"><a class="footer__link" href="#">affiliate program</a></li>
                        </ul>
                    </div>
                    <div class="footer__col">
                        <h4 class="footer__title">get help</h4>
                        <ul class="footer__list">
                            <li class="footer__item"><a class="footer__link" href="#">FAQ</a></li>
                            <li class="footer__item"><a class="footer__link" href="#">shipping</a></li>
                            <li class="footer__item"><a class="footer__link" href="#">returns</a></li>
                            <li class="footer__item"><a class="footer__link" href="#">order status</a></li>
                            <li class="footer__item"><a class="footer__link" href="#">payment options</a></li>
                        </ul>
                    </div>
                    <div class="footer__col">
                        <h4 class="footer__title">online shop</h4>
                        <ul class="footer__list">
                            <li class="footer__item"><a class="footer__link" href="#">điện thoại</a></li>
                            <li class="footer__item"><a class="footer__link" href="#">tai nghe</a></li>
                            <li class="footer__item"><a class="footer__link" href="#">cáp sạc</a></li>
                            <li class="footer__item"><a class="footer__link" href="#">sạc dự phòng</a></li>
                        </ul>
                    </div>
                    <div class="footer__col">
                        <h4 class="footer__title">follow us</h4>
                        <div class="social-links">
                             <a class="social-link" href="https://twitter.com"><img class="follow-us__social-icon"
                                src="img/logo-twitter.png" /></a>
                        <a class="social-link" href="https://facebook.com"><img class="follow-us__social-icon"
                                src="img/logo-facebook.png" /></a>
                        <a class="social-link" href="https://pinterest.com"><img class="follow-us__social-icon"
                                src="img/logo-pinterest.png" /></a>
                        <a class="social-link" href="https://reddit.com"><img class="follow-us__social-icon"
                                src="img/logo-reddit.png" /></a>
                        <a class="social-link" href="https://youtube.com"><img class="follow-us__social-icon"
                                src="img/logo-youtube.png" /></a>
                        <a class="social-link" href="https://instagram.com"><img class="follow-us__social-icon"
                                src="img/logo-instagram.png" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
`;
    footerHTML = footerHTML.replace(/src="img\//g, `src="${imageDirectory}`);
    console.log(footerHTML)
    footerContainer.innerHTML = footerHTML;
    // Create a link element for the CSS file
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = '../styles/footer.css';

    // Append the link element to the head of the document
    document.head.appendChild(cssLink);

}


