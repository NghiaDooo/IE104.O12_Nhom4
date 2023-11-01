const CssFiles = [
    'components/navbar/globals.css',
    'components/navbar/styleguide.css',
    'components/navbar/style.css'
  ];
CssFiles.forEach(cssFile => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssFile;
    document.head.appendChild(link);
});
