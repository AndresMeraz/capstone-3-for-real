"use strict"

window.onload = function() {
    //placing the card
    const canvas = document.getElementById("trainerCanvas");
    const ctx = canvas.getContext("2d");
    const img = document.getElementById("trainerCard");
    ctx.drawImage(img, 0, 0);

    
    //adding text
    ctx.font = "24px Roboto";
    ctx.fillText("IDNo. " + "Trainer ID", 263, 42);
    ctx.fillText("NAME: " + "Trainer Name", 45, 84);
    ctx.fillText("Bio Information Here", 45, 138);
    ctx.fillText("MONEY: $" + "12345", 45, 170);
    ctx.fillText("POKEDéX: " + "12345", 45, 202);

    draw(ctx);
};

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
    let id = createID();
    console.log(id);
    let money = getThatBag();
    console.log(money);
    let pokedex = getPokedex();
    console.log(pokedex);
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

function createID(min, max) {
    min = 1000;
    max = 99999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getThatBag(min, max) {
    min = 100;
    max = 99999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getPokedex(min, max) {
    min = 1;
    max = 999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

getProfileInfo();


            
            function draw(ctx) {
                //coordinates based on card dimensions
                let pokegridW = 28;
                let pokegridH = 222;
    
                let offsetW = 84;
                let offsetH = 68;

                function loadImage(src) {
                    let img = new Image();
                    img.src = src;
                    return img;
                }
                
                // adding pokemon
                let pokemon1 = new Image();
                pokemon1.onload = function() {
                    ctx.drawImage(pokemon1, pokegridW, pokegridH);
                };
                pokemon1.src = "pokehashLibs/pokemons/pokemon1.png";
                
                let pokemon2 = new Image();
                pokemon2.onload = function() {
                    ctx.drawImage(pokemon2, pokegridW + (offsetW), pokegridH);
                };
                pokemon2.src = "pokehashLibs/pokemons/pokemon2.png";
  
                let pokemon3 = new Image();
                pokemon3.onload = function() {
                    ctx.drawImage(pokemon3, pokegridW + (offsetW*2), pokegridH);
                };
                pokemon3.src = "pokehashLibs/pokemons/pokemon3.png";
               
                let pokemon4 = new Image();
                pokemon4.onload = function() {
                    ctx.drawImage(pokemon4, pokegridW, pokegridH + (offsetH));
                };
                pokemon4.src = "pokehashLibs/pokemons/pokemon6.png";
              
                let pokemon5 = new Image();
                pokemon5.onload = function() {
                    ctx.drawImage(pokemon5, pokegridW + (offsetW),	pokegridH + (offsetH));
                };
                pokemon5.src = "pokehashLibs/pokemons/pokemon5.png";
              
                let pokemon6 = new Image();
                pokemon6.onload = function() {
                    ctx.drawImage(pokemon6, pokegridW + (offsetW*2), pokegridH + (offsetH));
                };
                pokemon6.src = "pokehashLibs/pokemons/pokemon6.png";
    
                // adding badges
                let horizontal = 52;
                let offset = 48;
                let badge = [];

                for (let j = 0; j < 8; j++) {
                    badge[j] = loadImage('pokehashLibs/badges/kanto/kanto' + j + '.png');
                }

                for (let j = 8; j < 16; j++) {
                    badge[j] = loadImage('pokehashLibs/badges/johto/johto' + j + '.png');
                }


                //!PLACEHOLDER USER SELECTION
                let region = "Kanto";

                let regionoffset = 0;
                if(region == "Johto"){
                    regionoffset = 8;
                }else{
                    regionoffset = 0;
                }
                for(j = 0; j < 8; j++){
                    badge[j] = new Image();
                    badge[j].onload = function() {
                        ctx.drawImage(badge[j+regionoffset], horizontal + (j*offset), 380);
                    };
                }
            };
            
            