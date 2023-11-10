document.addEventListener('DOMContentLoaded', toggleTabs());
function toggleTabs() {
    console.log(1)
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