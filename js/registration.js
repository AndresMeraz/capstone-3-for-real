'use strict'
window.onload = init;

function init(){
    const regForm = document.getElementById("registrationForm");
    regForm.addEventListener("submit", registerNewUser);
}

async function registerNewUser(event) {
    event.preventDefault();
    class user{
        constructor(username, fullName, password){
        this.username = username;
        this.fullName = fullName
        this.password = password;
        }
    }

    const newUser = new UserActivation(document.getElementById("userName").value, document.getElementById("fullName").value, document.getElementById("password").value)
    
    try {
        const response = await fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/users', {
            method:'POST',
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0cmluZyIsImlhdCI6MTcwMzE3NzA0NiwiZXhwIjoxNzAzMjYzNDQ2fQ.aMFLOT7Yj9T_YwcVNrY7Tc-iSlqafB1nT0yzgucSsGM",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
            })
        const data = await response.json();  
        console.log(`User ${user} added succesfully`)
    }
        catch (error) {
            console.error('Error', error)
        }
    }