'use strict'
window.onload = init;

function init(){
    const regForm = document.getElementById("registrationForm");
    regForm.addEventListener("submit", registerNewUser);
}

async function registerNewUser(event) {
    event.preventDefault()
    
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password != confirmPassword) {
        alert('Passwords mismatch!');
        // Add your form submission logic here
    } 
    else {
        try {
            const response = await fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/users', {
                method:'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: document.getElementById("userName").value,
                    fullName: document.getElementById("fullName").value,
                    password: document.getElementById("password").value,
                })
            })
            const data = await response.json();  
            alert(`User added succesfully`)
            console.log(data);
            window.location.href = "login.html"
        }
        catch (error) {
            console.error('Error', error)
        }
    }
}