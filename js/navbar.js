document.addEventListener("DOMContentLoaded", function () {
    InitNavbar();
});
const InitNavbar = () => {

    const searchInput = document.getElementById('search');
    const searchIcon = document.getElementById('search-icon');

    searchIcon.addEventListener('click', function (event) {
        event.preventDefault();
        const searchValue = searchInput.value;
        window.location.href = `list-product.html?keyword=${searchValue.toLowerCase()}`;
    });

    const searchInput2 = document.getElementById('search-2');
    const searchIcon2 = document.getElementById('search-icon-2');

    searchIcon2.addEventListener('click', function (event) {
        event.preventDefault();
        const searchValue = searchInput2.value;
        window.location.href = `list-product.html?keyword=${searchValue.toLowerCase()}`;
    });

}



