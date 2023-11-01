const components = [
    {
        name: 'navbar',
        url: 'components/navbar.html',
        img: 'assets/images/navbar/',
        linkCSS: 'styles/navbar.css'
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

