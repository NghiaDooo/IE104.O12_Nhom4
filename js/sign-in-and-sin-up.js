const signInElement = document.getElementsByClassName('header-sign-in')[0]
const signUpElement = document.getElementsByClassName('header-sign-up')[0]
const containerSignUpElement = document.getElementsByClassName('container-sign-up')[0]
const containerSignInElement = document.getElementsByClassName('container-sign-in')[0]

// container-sign-up
signInElement.addEventListener('click', () => {
    containerSignUpElement.classList.add('hidden')
    containerSignInElement.classList.remove('hidden')

    // add code border and char color 
})

signUpElement.addEventListener('click', () => {
    containerSignInElement.classList.add('hidden')
    containerSignUpElement.classList.remove('hidden')

    // add code border and char color 

})