"use strict"
//creating canvas for trainer card
window.onload = function() {
    //placing the card
    const canvas = document.getElementById("trainerCanvas");
    const ctx = canvas.getContext("2d");
    const img = document.getElementById("trainerCard");
    ctx.drawImage(img, 0, 0);
    draw(ctx);
};

//structure of trainercard
const trainercard = [{
    'id': '',
    'name': '',
	'region': '',
	'hometown': '',
	'money': '',
	'pokedex': '',
	'badges': '',
	'trainer': '',
	'pokemon1': '',
	'pokemon2': '',
	'pokemon3': '',
	'pokemon4': '',
	'pokemon5': '',
	'pokemon6': ''
}]

// arrays for images
let trainer = [];
var pokemon = [];
var badge = [];

// initializinf variables
let myFont;
let card;

//pulling file location for images
function loadImage(src) {
    let img = new Image();
    img.src = src;
    return img;
}

// preloading images
function preload() {
    
    // Load trainer images
	for (let i = 0; i < 107; i++){
        trainer[i] = loadImage('./pokehasLibs/trainers/trainer' + i + '.png');
	}
    
	// Load pokemon images
	for (let i = 0; i < 252; i++){
        pokemon[i] = loadImage('./pokehasLibs/pokemons/pokemon' + i + '.png')
	}

	// Load Kanto badges
	for(let i = 0; i < 8; i++){
		badge[i] = loadImage('./pokehasLibs/badges/kanto/kanto' + i + '.png');
	}
    
	// Load Johto badges
	for(let i = 8; i < 16; i++){
        badge[i] = loadImage('./pokehasLibs/badges/johto/johto' + i + '.png');
	}
    
}

//*enabiling login and post functionality
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

    getProfileInfo();
    
//todo math algorithims for randomizing numbers 
    function createID(min, max) {
        min = 1000;
        max = 99999;
        return Math.floor(Math.random() * (max - min + 1)) + min;;
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


//TODO user information output
    function displayProfile(data){
        console.log(data);

        const userName = data.username;
        console.log(userName);

        const region = getRegion(data.bio);   //replaced region designation with user input
        console.log(region);

        const id = CreateTrainer(userName);
        console.log(id.id);

        const money = getThatBag();
        console.log(money);

        const pokedex = getPokedex();
        console.log(pokedex);

        //targeting location on html
        const canvas = document.getElementById("trainerCanvas");
        const ctx = canvas.getContext("2d");

        //loading font
        const pokeFont = new FontFace("pokeFont", "url(./pokehashLibs/pokedex.ttf)");
        pokeFont.load().then(function(font) {
            document.fonts.add(font);
            console.log('Font loaded');

            // adding text
            ctx.font = "16px pokeFont";
            ctx.fillText("IDNo. " + id.id, 263, 42);
            ctx.fillText("NAME: " + userName, 45, 84);
            ctx.fillText("REGION: " + region, 45, 138);
            ctx.fillText("MONEY: $" + money, 45, 170);
            ctx.fillText("POKEDéX: " + pokedex, 45, 202);
        })

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
        else{ //!currently for testing purposes. Should be "undisclosed"
            return "Kanto"
        }
    }

//adding images to canvas
function draw(ctx) {
    //coordinates based on card dimensions
        let pokegridW = 28;
        let pokegridH = 222;
        let offsetW = 84;
        let offsetH = 68;
    
    //pulling login data
        const loginData = getLoginData();
        let userCard = CreateTrainer(loginData.username);
        console.log(userCard.pokemon1)

    // adding pokemon images
        //!can this be merged with line 47?
        let pokemon1 = loadImage("pokehashLibs/pokemons/pokemon" + userCard.pokemon1 + ".png");
        pokemon1.onload = function() {
            ctx.drawImage(pokemon1, pokegridW, pokegridH);
        };
    
        let pokemon2 = loadImage("pokehashLibs/pokemons/pokemon" + userCard.pokemon2 + ".png");
        pokemon2.onload = function() {
            ctx.drawImage(pokemon2, pokegridW + (offsetW), pokegridH);
        };

        let pokemon3 = loadImage("pokehashLibs/pokemons/pokemon" + userCard.pokemon3 + ".png");
        pokemon3.onload = function() {
            ctx.drawImage(pokemon3, pokegridW + (offsetW*2), pokegridH);
        };
        
        let pokemon4 = loadImage("pokehashLibs/pokemons/pokemon" + userCard.pokemon4 + ".png");
        pokemon4.onload = function() {
            ctx.drawImage(pokemon4, pokegridW, pokegridH + (offsetH));
        };
        
        let pokemon5 = loadImage("pokehashLibs/pokemons/pokemon" + userCard.pokemon5 + ".png");
        pokemon5.onload = function() {
            ctx.drawImage(pokemon5, pokegridW + (offsetW),	pokegridH + (offsetH));
        };

        
        let pokemon6 = loadImage("pokehashLibs/pokemons/pokemon" + userCard.pokemon6 + ".png");
        pokemon6.onload = function() {
            ctx.drawImage(pokemon6, pokegridW + (offsetW*2), pokegridH + (offsetH));
        };
    
    // adding trainer images
        let trainerImg = loadImage("pokehashLibs/trainers/trainer" + userCard.trainer + ".png");
        trainerImg.onload = function() {
            ctx.drawImage(trainerImg, 260, 170 )
        }

    //? adding badges
        //setting coordinates
        let horizontal = 52;
        let offset = 48;

        //establishing variables
        const region = trainercard.region;
        let regionoffset = 0;

        //creating conditions for loop
        if(region == "Johto"){
            regionoffset = 8;
        }else{
            regionoffset = 0;
        }

        //loading badges async
            let pokeBadges = [];

            for (let j = 0; j < 8; j++) {
                pokeBadges.push(loadBadge(j + regionoffset, horizontal + (j*offset), 380, ctx));
            }

            Promise.all(pokeBadges).then(() => {
                console.log("Badges loaded");
            });
            
            function loadBadge(i, x, y, ctx) {
                return new Promise((resolve, reject) =>{
                    badge[i] = loadImage('./pokehashLibs/badges/kanto/kanto' + i + '.png');
                    badge[i].onload = function() {
                        ctx.drawImage(badge[i], x, y);
                        resolve();
                    };
                });
            }

        // for (let j = 0; j < 8; j++) {
        //     badge[j] = loadImage('pokehashLibs/badges/kanto/kanto' + j + '.png');
        // }
        
        // for (let j = 8; j < 16; j++) {
        //     badge[j] = loadImage('pokehashLibs/badges/johto/johto' + j + '.png');
        // }
        // for(let j = 0; j < 8; j++){
        //     badge[j] = new Image();
        //     badge[j].onload = function() {
        //         ctx.drawImage(badge[j+regionoffset], horizontal + (j*offset), 380);
        //     };
        // }
};

function CreateTrainer(name) {
    
        var hash = sha256(name);
        
        trainercard.name		= name;
        // trainercard.region		= getRegion(data.bio);
        // trainercard.hometown	= cities[		(parseInt('0x' + hash.substring(0, 4)) % 20)];
        trainercard.money		= 			(parseInt('0x' + hash.substring(5, 9)));
        trainercard.pokedex		= 			(parseInt('0x' + hash.substring(10, 14)) % 252);
        trainercard.badges		= 			(parseInt('0x' + hash.substring(15, 19)) % 9);
        trainercard.trainer		= 			(parseInt('0x' + hash.substring(20, 24)) % 107);
        trainercard.pokemon1	= 			(parseInt('0x' + hash.substring(25, 29)) % 252);
        trainercard.pokemon2	= 			(parseInt('0x' + hash.substring(30, 34)) % 252);
        trainercard.pokemon3	= 			(parseInt('0x' + hash.substring(35, 39)) % 252);
        trainercard.pokemon4	= 			(parseInt('0x' + hash.substring(40, 44)) % 252);
        trainercard.pokemon5	= 			(parseInt('0x' + hash.substring(45, 49)) % 252);
        trainercard.pokemon6	= 			(parseInt('0x' + hash.substring(50, 54)) % 252);
        trainercard.id 		= 			(parseInt('0x' + hash.substring(55, 59)));
    
        return trainercard;
    }
    
    // funcao para calcular o hash (SHA-256)
    var sha256 = function sha256(ascii) {
        function rightRotate(value, amount) {
            return (value>>>amount) | (value<<(32 - amount));
        };
    
        var mathPow = Math.pow;
        var maxWord = mathPow(2, 32);
        var lengthProperty = 'length'
        var i, j; // Used as a counter across the whole file
        var result = ''
    
        var words = [];
        var asciiBitLength = ascii[lengthProperty]*8;
    
        //* caching results is optional - remove/add slash from front of this line to toggle
        // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
        // (we actually calculate the first 64, but extra values are just ignored)
        var hash = sha256.h = sha256.h || [];
        // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
        var k = sha256.k = sha256.k || [];
        var primeCounter = k[lengthProperty];
        /*/
        var hash = [], k = [];
        var primeCounter = 0;
        //*/
    
        var isComposite = {};
        for (var candidate = 2; primeCounter < 64; candidate++) {
            if (!isComposite[candidate]) {
                for (i = 0; i < 313; i += candidate) {
                    isComposite[i] = candidate;
                }
                hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
                k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
            }
        }
    
        ascii += '\x80' // Append Ƈ' bit (plus zero padding)
        while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
        for (i = 0; i < ascii[lengthProperty]; i++) {
            j = ascii.charCodeAt(i);
            if (j>>8) return; // ASCII check: only accept characters in range 0-255
            words[i>>2] |= j << ((3 - i)%4)*8;
        }
        words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
        words[words[lengthProperty]] = (asciiBitLength)
    
        // process each chunk
        for (j = 0; j < words[lengthProperty];) {
            var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
            var oldHash = hash;
            // This is now the undefinedworking hash", often labelled as variables a...g
            // (we have to truncate as well, otherwise extra entries at the end accumulate
            hash = hash.slice(0, 8);
    
            for (i = 0; i < 64; i++) {
                var i2 = i + j;
                // Expand the message into 64 words
                // Used below if
                var w15 = w[i - 15], w2 = w[i - 2];
    
                // Iterate
                var a = hash[0], e = hash[4];
                var temp1 = hash[7]
                    + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
                    + ((e&hash[5])^((~e)&hash[6])) // ch
                    + k[i]
                    // Expand the message schedule if needed
                    + (w[i] = (i < 16) ? w[i] : (
                            w[i - 16]
                            + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
                            + w[i - 7]
                            + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
                        )|0
                    );
                // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
                var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
                    + ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
    
                hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
                hash[4] = (hash[4] + temp1)|0;
            }
            
            for (i = 0; i < 8; i++) {
                hash[i] = (hash[i] + oldHash[i])|0;
            }
        }
    
    
        for (i = 0; i < 8; i++) {
            for (j = 3; j + 1; j--) {
                var b = (hash[i]>>(j*8))&255;
                result += ((b < 16) ? 0 : '') + b.toString(16);
            }
        }
    
        return result;
    };

