/* Posts Page JavaScript */

"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const postForm = document.getElementById("postForm");
    const postText = document.getElementById("postText");
    const postResult = document.getElementById("postResult");
    
    postForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const loginData = getLoginData();
        
        console.log(loginData);
        const formData = {
            text: postText.value
        };

        // Fetch to post data to the API endpoint
        fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${loginData.token}`,
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(result => {
            // Display the result on the screen
            const postResultHTML = `
                <div class="alert alert-success">
                    <p>Blog Posted Successfully:</p>
                    <p><strong>Text:</strong> ${result.text}</p>
                    <p><strong>Posted by:</strong> ${result.username}</p>
                    <p><strong>Created At:</strong> ${new Date(result.createdAt).toLocaleString()}</p>
                </div>
            `;
            postResult.innerHTML = postResultHTML;

            // Clear the form input
            postText.value = "";
        })
        .catch(error => {
            console.error("Error posting data:", error);
            postResult.innerHTML = `<div class="alert alert-danger">Error posting blog: ${error.message}</div>`;
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const postList = document.getElementById("postList");
    const loginData = getLoginData();

    // Fetch posts from the API endpoint
    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=20&offset=0", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${loginData.token}`,
        }
    })
    .then(response => response.json())
    .then(posts => {
        // Loop through the posts and display them
        posts.forEach(post => {
            const postCard = document.createElement("div");
            postCard.classList.add("card", "mb-3");

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            const postText = document.createElement("p");
            postText.classList.add("card-text");
            postText.textContent = post.text;

            const postUsername = document.createElement("p");
            postUsername.classList.add("card-text", "text-muted");
            postUsername.textContent = `Posted by ${post.username} on ${new Date(post.createdAt).toLocaleString()}`;

            cardBody.appendChild(postText);
            cardBody.appendChild(postUsername);
            postCard.appendChild(cardBody);

            postList.appendChild(postCard);
        });
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
});

function displayProfile() {
    let profile = document.getElementById("profile")
    const loginData = getLoginData();
    let profileName = loginData.username;
    profile.innerHTML = profileName;
    console.log(loginData);
}
displayProfile()