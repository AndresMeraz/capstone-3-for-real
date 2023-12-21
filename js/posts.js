/* Posts Page JavaScript */

"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const postForm = document.getElementById("postForm");
    const postText = document.getElementById("postText");
    const postResult = document.getElementById("postResult");

    postForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = {
            text: postText.value
        };

        // Fetch to post data to the API endpoint
        fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0cmluZyIsImlhdCI6MTcwMzE3NzA0NiwiZXhwIjoxNzAzMjYzNDQ2fQ.aMFLOT7Yj9T_YwcVNrY7Tc-iSlqafB1nT0yzgucSsGM",
                "Content-Type": "application/json"
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

    // Fetch posts from the API endpoint
    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=100&offset=0", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0cmluZyIsImlhdCI6MTcwMzE3NzA0NiwiZXhwIjoxNzAzMjYzNDQ2fQ.aMFLOT7Yj9T_YwcVNrY7Tc-iSlqafB1nT0yzgucSsGM"
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
