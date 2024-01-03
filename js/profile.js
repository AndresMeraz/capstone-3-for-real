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
    // console.log(username);

    // Loop through the posts and display them
    let matching = posts.filter(user => user.username == username)
    // console.log(matching);

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

        const deletePost = document.createElement("button");
        deletePost.classList.add("deleteBtn");
        deletePost.id = `${matching._id}`;
        deletePost.textContent = "Delete"
        deletePost.addEventListener("click", function(event){
            let postID = event.currentTarget.id;
            console.log(postID)
            deleteThisPost(postID)
        })


        cardBody.appendChild(postText);
        cardBody.appendChild(postUsername);
        cardBody.appendChild(deletePost);
        postCard.appendChild(cardBody);
        
        postList.appendChild(postCard);
    });
}

function deleteThisPost(postID){
    let postId = postID;
    const loginData = getLoginData();
    console.log(postId)
    let baseURL = `http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts/${postId}`
        fetch(baseURL, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                "Authorization": `Bearer ${loginData.token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => console.log("Post Deleted Successfully"))
            .catch((error) => console.error(error))
}

function getProfileInfo() {
    const loginData = getLoginData();
    // let profile = document.getElementById("profile");
    // console.log(loginData);
    let profileName = loginData.username;
    // profile.innerHTML = profileName;

    let baseURL = `http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/${profileName}`;

    fetch(baseURL,{
        method: "GET",
        headers: { 
            Authorization: `Bearer ${loginData.token}`,
        }
    })
        .then((response) => response.json())
        .then((data) => displayProfile(data))
}
function displayProfile(data){
    console.log(data);
    let userName = data.username;
    console.log(userName);
    let region = getRegion(data.bio);
    console.log(region);

}

function getRegion(region){
    if(region == "Kanto"){
        return "Kanto"
    }
    else if(region == "Johto"){
        return "Johto"
    }
    else if(region == "Hoenn"){
        return "Hoenn"
    }
    else if(region == "Sinnoh"){
        return "Sinnoh"
    }
    else if(region == "Unova"){
        return "Unova"
    }
    else if(region == "Kalos"){
        return "Kalos"
    }
    else if(region == "Alola"){
        return "Alola"
    }
    else if(region == "Galar"){
        return "Galar"
    }
    else if(region == "Paldea"){
        return "Paldea"
    }
    else{
        return "Undisclosed"
    }
}

getProfileInfo();
