const components = [
    {
      name: 'navbar',
      url: 'components/navbar/index.html',
      img: {
        pattern : 'img/',
        replacement : 'components/navbar/img/',
      },
      linkCSS: 'components/navbar/style.css'
    }
  ];

components.forEach(component => {
    fetch(component.url)
    .then(function (response) {
        return response.text();
    })
    .then(function (html) {
        const newElement = document.createElement("div");
        const regex = new RegExp(component.img.pattern, 'g');

        html = html.replace(regex, component.img.replacement);
        newElement.innerHTML = html;

        const oldElement = document.getElementById(component.name);
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

