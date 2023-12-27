"use strict"


function getLoginData(){
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON) || {};
}

document.addEventListener("DOMContentLoaded", function () {
    const loginData = getLoginData();
    // Fetch posts from the API endpoint
    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=100&offset=0", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${loginData.token}`,
        }
    })
    .then(response => response.json())
    .then(posts => findMatching(posts))
    .catch(error => {
        console.error("Error fetching data:", error);
    })})


function findMatching(posts){
    const postList = document.getElementById("postList");
    const loginData = getLoginData();
    let username = loginData.username;
    console.log(username);

        // Loop through the posts and display them
        let matching = posts.filter(user => user.username == username)
        console.log(matching);

        matching.forEach(matching => {
            const postCard = document.createElement("div");
            postCard.classList.add("card", "mb-3");

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            const postText = document.createElement("p");
            postText.classList.add("card-text");
            postText.textContent = matching.text;

            const postUsername = document.createElement("p");
            postUsername.classList.add("card-text", "text-muted");
            postUsername.textContent = `Posted by ${matching.username} on ${new Date(matching.createdAt).toLocaleString()}`;

            cardBody.appendChild(postText);
            cardBody.appendChild(postUsername);
            postCard.appendChild(cardBody);

            postList.appendChild(postCard); 
        });
    }
