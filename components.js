const components = [
    {
        name: 'navbar',
        url: 'components/navbar.html',
        img: 'assets/images/navbar/',
        linkCSS: 'styles/navbar.css'
    },

    {
        name: 'breadcrumb',
        url: 'components/breadcrumb.html',
        img: 'assets/images/breadcrumb/',
        linkCSS: 'styles/breadcrumb.css'
    },

    {
        name: 'product',
        url: 'components/product.html',
        img: 'assets/images/product/',
        linkCSS: 'styles/product.css'
    },

    {
        name: 'sale-off',
        url: 'components/sale-off.html',
        img: 'assets/images/product/',
        linkCSS: 'styles/sale-off.css'
    },

    {
        name: 'best-deals',
        url: 'components/best-deals.html',
        img: 'assets/images/best-deals/',
        linkCSS: 'styles/best-deals.css'
    }
];

components.forEach(component => {
    fetch(component.url)
        .then(function (response) {
            return response.text();
        })
        .then(function (html) {
            var newElement = document.createElement("div");
            html = html.replace(/img\//g, component.img);
            newElement.innerHTML = html;

            var oldElement = document.getElementById(component.name);
            if (oldElement) {
                oldElement.parentNode.replaceChild(newElement, oldElement);
            } else {
                console.log(`Element with ID '${component.name}' not found.`);
            }
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = component.linkCSS;
            document.head.appendChild(link);
        })
        .catch(function (err) {
            console.error('Failed to fetch page: ', err);
        });
});

