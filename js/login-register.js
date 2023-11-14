document.addEventListener('DOMContentLoaded', toggleTabs());
function toggleTabs() {
    document.getElementById('login-tab').addEventListener('click', function () {
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('login-tab').classList.add('tab--highlight');
        document.getElementById('signup-tab').classList.remove('tab--highlight');
    });

    document.getElementById('signup-tab').addEventListener('click', function () {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'block';
        document.getElementById('signup-tab').classList.add('tab--highlight');
        document.getElementById('login-tab').classList.remove('tab--highlight');
    });
}

function togglePasswordVisibility(toggleIcon) {
    const passwordInput = toggleIcon.previousElementSibling;
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.src = "./assets/images/login-register/eye-svgrepo-com.svg";
    } else {
        passwordInput.type = "password";
        toggleIcon.src = "./assets/images/login-register/eye-closed-svgrepo-com.svg";
    }
}

function togglePasswordVisibilityRefresh(passwordInput) {
    passwordInput.type = "password";
    toggleIcon.src = "./assets/images/login-register/eye-closed-svgrepo-com.svg";
}

function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const userList = getAllUsers();

    const user = userList.find(user => user.accountInfo.email === email && user.accountInfo.password === password);

    if (user) {
        alert(`Đăng nhập thành công. Chào mừng, ${email}!`);
        curentUser = user;
        window.location.href = 'product-detail.html';
    } else {
        alert("Đăng nhập thất bại. Vui lòng kiểm tra lại tên người dùng và mật khẩu.");
        return false;
    }
    return true;
}

function register() {
    var username = document.getElementById("register-username").value;
    var email = document.getElementById("register-email").value;
    var password = document.getElementById("register-password").value;
    var confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Mật khẩu và xác nhận mật khẩu không khớp.");
        return;
    }
    const userList = getAllUsers();
    const userExists = userList.some(user => user.accountInfo.email === email);

    if (userExists) {
        alert("Tên người dùng đã tồn tại. Vui lòng chọn một tên người dùng khác.");
        return false;
    }

    const newUser = {
        accountInfo: {
            email: email,
            password: password,
            roll: 'user'
        },
        personalInfo: {
            username: username,
            address: null,
        },
        purchaseHistory: [],
        shoppingCart: []
    };

    addUser(newUser)
    alert("Đăng ký thành công.");
    window.location.href = 'product-detail.html';

    return true;
}


