/* Landing Page JavaScript */

"use strict";

const loginForm = document.querySelector("#login");

loginForm.onsubmit = function (event) {
    // Prevent the form from refreshing the page,
    // as it will do by default when the Submit event is triggered:
    event.preventDefault();

    // We can use loginForm.username (for example) to access
    // the input element in the form which has the ID of "username".
    const loginData = {
        username: loginForm.username.value,
        password: loginForm.password.value,
    }

    // Disables the button after the form has been submitted already:
    loginForm.loginButton.disabled = true;

    // Time to actually process the login using the function from auth.js!
    login(loginData);
};

document.getElementById("loginBtn").addEventListener("click", function() {
    document.querySelector(".loginBox").classList.add("active");
    document.getElementById("welcomeMessage").style.visibility="hidden";
    document.getElementById("center").style.visibility="hidden";
    
});
document.querySelector(".loginBox .close-btn").addEventListener("click", function() {
    document.querySelector(".loginBox").classList.remove("active");
    document.getElementById("center").style.visibility="visible";
});

function disappear() {
    document.getElementById('showWelcomeButton').style.display="none";
    setTimeout(function(){document.querySelector('.center').style.display="block";}, 3500)
    
}