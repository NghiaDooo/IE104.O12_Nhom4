const components = [
    {
      name: 'navbar',
      url: 'components/navbar/index.html',
      img: 'components/navbar/img/',
      linksCSS: [
        'components/navbar/globals.css',
        'components/navbar/styleguide.css',
        'components/navbar/style.css'
      ]
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
        component.linksCSS.forEach(linkCSS =>{
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = linkCSS;
            document.head.appendChild(link);
        });
    })
    .catch(function (err) {
        console.error('Failed to fetch page: ', err);
    });
});

