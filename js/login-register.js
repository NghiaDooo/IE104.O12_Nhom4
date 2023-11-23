document.addEventListener('DOMContentLoaded', toggleTabs());
function toggleTabs() {
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const emailRegister = document.getElementById('register-email');
    const emailLogin = document.getElementById('login-email');

    // Hàm để thiết lập hiển thị và highlight cho tab và form tương ứng
    function setActiveTab(form, removeTab, addTab) {
        form.style.display = 'block';
        document.getElementById(removeTab).classList.remove('tab--highlight');
        document.getElementById(addTab).classList.add('tab--highlight');

    }

    // Sự kiện click cho tab "Login"
    loginTab.addEventListener('click', function () {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        var inputs = registerForm.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
        }

        setActiveTab(loginForm, 'signup-tab', 'login-tab');
    });

    // Sự kiện click cho tab "Sign Up"
    signupTab.addEventListener('click', function () {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        var inputs = loginForm.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
        }
        setActiveTab(registerForm, 'login-tab', 'signup-tab');
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

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const userList = getAllUsers();

    const user = userList.find(user => user.accountInfo.email === email && user.accountInfo.password === password);
    if (!validateEmail(email)) {
        alert("Email không hợp lệ");
        return;
    }

    if (user) {
        alert(`Đăng nhập thành công. Chào mừng, ${user.personalInfo.username}!`);
        setCurrentUser(user);
        window.location.href = 'home.html';
    } else
        alert("Đăng nhập thất bại. Vui lòng kiểm tra lại tên người dùng và mật khẩu.");

}

function register() {
    var username = document.getElementById("register-username").value;
    var email = document.getElementById("register-email").value;
    var password = document.getElementById("register-password").value;
    var confirmPassword = document.getElementById("confirm-password").value;

    if (username === "" || email === "" || password === "" || confirmPassword === "") {
        alert("Vui lòng điền đủ tất cả thông tin!");
        return;

    }
    if (!validateEmail(email)) {
        alert("Email không hợp lệ");
        return;
    }
    if (password !== confirmPassword) {
        alert("Mật khẩu và xác nhận mật khẩu không khớp.");
        return;
    }
    const userList = getAllUsers();
    const userExists = userList.some(user => user.accountInfo.email === email);

    if (userExists) {
        alert("Người dùng đã tồn tại.");
        return;
    }

    const newUser = {
        accountInfo: {
            email: email,
            password: password,
            role: 'user',
        },
        personalInfo: {
            username: username,
            address: '',
        },
        purchaseHistory: [],
        shoppingCart: []
    };

    if (addUser(newUser)) {
        alert("Đăng ký thành công.");
        setCurrentUser(newUser);
        window.location.href = 'home.html';
    } else
        alert("Oh no! đã có lỗi, chúng tôi sẽ sớm khắc phục!")


}

