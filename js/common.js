document.addEventListener("DOMContentLoaded", function () {
    InitNavbar();
    InitFooter();
});

const curentUser = null;

function getAllUsers() {
    return JSON.parse(localStorage.getItem('userList')) || [];
}

function addUser(user) {
    var userList = JSON.parse(localStorage.getItem('userList')) || [];
    var existingUser = userList.find(function (existingUser) {
        return existingUser.email === user.email;
    });
    if (!existingUser) {
        userList.push(user);
        localStorage.setItem('userList', JSON.stringify(userList));
        return true;
    } else {
        return false;
    }
}


