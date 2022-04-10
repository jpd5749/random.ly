//json data
let data;
//variables that correspond to the elements in the HTML
let categoryList = document.getElementById("categoryList");
let description = document.getElementById("categoryDescription");
let searchBox = document.getElementById("searchBox");
let foundMealName = document.getElementById("foundMealName");
let foundMealDescription = document.getElementById("foundMealDescription");
let spotifyList = document.getElementById("spotifyList");
let movieList = document.getElementById("movieList");
let movieName = document.getElementById("movieName");
let movieDescription = document.getElementById("movieDescription");
let movieSearchBox = document.getElementById("movieSearchBox");
let movieImage = document.getElementById("movieImage");
let mealImage = document.getElementById("mealImage");
let spotifySearchBox = document.getElementById("spotifySearchBox");
let songName = document.getElementById("songName");
let songDescription = document.getElementById("songDescription");
let songImage = document.getElementById("songImage");
//spotify credentials
var client_id = 'd8cd43d646624fe085630310d15cc9e9';
var client_secret = '193c9a9963454cf488aaad0efdc54442';
var spotify_token;
var spotify_expire;
let spotifyListFilled = false;


//only called once when the page is loaded
function populateSelect()
{
    const request = new XMLHttpRequest();
    request.open("GET","https://www.themealdb.com/api/json/v1/1/categories.php",true);

    request.onload = function() {
        data = JSON.parse(this.response);
        if(request.status == 200)
        {
            //index value that iterates through the loop
            data.categories.forEach(
                category=>
                {
                    let option = document.createElement("option");
                    //set the value to the description for ease of use of the "selectCategory" function
                    option.value = category.strCategory;
                    option.innerHTML = category.strCategory;
                    categoryList.appendChild(option);
                }
            );
        }
        else{
            console.log(`Error occurced: Status: ${request.status}`);
        }
    };
    request.send();
}

function selectCategory()
{
    //variable that is the description of the selected
    let descriptionText = document.createTextNode(categoryList.value);
    //variable that is the first child of the paragraph
    let firstChild = description.childNodes[0];
    //now, replace the first child with the new text node
    description.replaceChild(descriptionText, firstChild);
}

function searchMeal()
{
    const request = new XMLHttpRequest();
    request.open("GET","https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchBox.value,true);

    request.onload = function() {
        data = JSON.parse(this.response);
        
        if(request.status == 200 && data.meals == null)
        {
            //variable that is the description of the selected
            let nameText = document.createTextNode("No Results");
            let descriptionText = document.createTextNode(" ");
            //variable that is the first child of the paragraph
            let firstChild = foundMealName.childNodes[0];
            foundMealName.replaceChild(nameText, firstChild);
            let secondChild = foundMealDescription.childNodes[0];
            foundMealDescription.replaceChild(descriptionText, secondChild);
        }

        else if(request.status == 200 && data.meals != null)
        {
            let foundMeal = data.meals[0];

            //variable that is the description of the selected
            let nameText = document.createTextNode(foundMeal.strMeal);
            let descriptionText = document.createTextNode(foundMeal.strInstructions);
            //variable that is the first child of the paragraph
            let firstChild = foundMealName.childNodes[0];
            //replace the first child of the paragraph element
            foundMealName.replaceChild(nameText, firstChild);
            let secondChild = foundMealDescription.childNodes[0];
            foundMealDescription.replaceChild(descriptionText, secondChild);
            mealImage.src = foundMeal.strMealThumb;
        }
        else{
            console.log(`Error occurced: Status: ${request.status}`);
            //variable that is the description of the selected
            let nameText = document.createTextNode("No Results");
            let descriptionText = document.createTextNode(" ");
            //variable that is the first child of the paragraph
            let firstChild = foundMealName.childNodes[0];
            foundMealName.replaceChild(nameText, firstChild);
            let secondChild = foundMealDescription.childNodes[0];
            foundMealDescription.replaceChild(descriptionText, secondChild);
            mealImage.src = null;
        }
    };

    request.send();
}

function randomMeal()
{
    const request = new XMLHttpRequest();
    request.open("GET","https://www.themealdb.com/api/json/v1/1/filter.php?c=" + categoryList.value,true);

    request.onload = function() {
        data = JSON.parse(this.response);
        
        if(request.status == 200 && data.meals == null)
        {
            //variable that is the description of the selected
            let nameText = document.createTextNode("No Results");
            let descriptionText = document.createTextNode(" ");
            //variable that is the first child of the paragraph
            let firstChild = foundMealName.childNodes[0];
            foundMealName.replaceChild(nameText, firstChild);
            let secondChild = foundMealDescription.childNodes[0];
            foundMealDescription.replaceChild(descriptionText, secondChild);
        }

        else if(request.status == 200 && data.meals != null)
        {
            //generate random number based on length of meals in category
            let random = Math.floor(Math.random() * data.meals.length);
            //let found meal be one of the randombly chosen meals from the category
            let foundMeal = data.meals[random];
            let randomMeal;

            //because foundMeal only has the meal ID, we have to call the API again to get the rest of the information.
            const request2 = new XMLHttpRequest();
            request2.open("GET","https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + foundMeal.idMeal,true);
        
            request2.onload = function() {
                data2 = JSON.parse(this.response);
                
                if(request2.status == 200 && data2.meals == null)
                {
                    //variable that is the description of the selected
                    let nameText = document.createTextNode("No Results");
                    let descriptionText = document.createTextNode(" ");
                    //variable that is the first child of the paragraph
                    let firstChild = foundMealName.childNodes[0];
                    foundMealName.replaceChild(nameText, firstChild);
                    let secondChild = foundMealDescription.childNodes[0];
                    foundMealDescription.replaceChild(descriptionText, secondChild);
                    mealImage.src = null;
                }
        
                else if(request2.status == 200 && data2.meals != null)
                {
                    //if it returns a request, it has found a random meal based on the category
                    let randomMeal = data2.meals[0];
                    console.log("Meal Name: " + randomMeal.strMeal + " Instructions: " + randomMeal.strInstructions);
                    //variable that is the description of the selected
                    let nameText = document.createTextNode("Meal Name: " + randomMeal.strMeal);
                    let descriptionText = document.createTextNode("Instructions: " + randomMeal.strInstructions);
                    //variable that is the first child of the paragraph element
                    let firstChild = foundMealName.childNodes[0];
                    //replace the first child with our new text node
                    foundMealName.replaceChild(nameText, firstChild);
                    let secondChild = foundMealDescription.childNodes[0];
                    foundMealDescription.replaceChild(descriptionText, secondChild);
                    mealImage.src = randomMeal.strMealThumb;
                }
                else{
                    console.log(`Error occurced: Status: ${request2.status}`);
                    //variable that is the description of the selected
                    let nameText = document.createTextNode("No Results");
                    let descriptionText = document.createTextNode(" ");
                    //variable that is the first child of the paragraph
                    let firstChild = foundMealName.childNodes[0];
                    foundMealName.replaceChild(nameText, firstChild);
                    let secondChild = foundMealDescription.childNodes[0];
                    foundMealDescription.replaceChild(descriptionText, secondChild);
                    mealImage.src = null;
                }
            };
            request2.send();
        }
        else{
            console.log(`Error occurced: Status: ${request.status}`);
            //variable that is the description of the selected
            let nameText = document.createTextNode("No Results");
            let descriptionText = document.createTextNode(" ");
            //variable that is the first child of the paragraph
            let firstChild = foundMealName.childNodes[0];
            foundMealName.replaceChild(nameText, firstChild);
            let secondChild = foundMealDescription.childNodes[0];
            foundMealDescription.replaceChild(descriptionText, secondChild);
            mealImage.src = null;
        }
    };

    request.send();
}

function spotifyToken()
{
    const request = new XMLHttpRequest();
    request.open("POST","https://accounts.spotify.com/api/token?grant_type=client_credentials&client_id=" + client_id + "&client_secret=" + client_secret,true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    request.onload = function() {
        data = JSON.parse(this.response);

        if(request.status == 200)
        {
            spotify_token = data.access_token;
            spotify_expire = data.expires_in;
        }
        else{
            console.log(`Error occurced: Status: ${request.status}`);
            console.log(data);
        }
    };
    request.send();
    spotifyWait();
}

function spotifyGetGenres()
{
    if (!spotifyListFilled)
    {
        const request = new XMLHttpRequest();
        request.open("GET","https://api.spotify.com/v1/recommendations/available-genre-seeds",true);
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Authorization", "Bearer " + spotify_token +"");

        request.onload = function() {
            data = JSON.parse(this.response);

            if(request.status == 200)
            {
                data.genres.forEach(
                    genre=>
                    {
                        console.log(genre);
                        let option = document.createElement("option");
                        //set the value to the description for ease of use of the "selectCategory" function
                        option.innerHTML = genre;
                        option.value = genre;
                        spotifyList.appendChild(option);
                    }
                );
            }
            else{
                console.log(`Error occurced: Status: ${request.status}`);
            }
        };
        request.send();
        spotifyListFilled = true;
    }
}

function spotifySearch()
{
    const request = new XMLHttpRequest();
        request.open("GET","https://api.spotify.com/v1/search?q=" + spotifySearchBox.value + "&type=track",true);
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Authorization", "Bearer " + spotify_token +"");

        request.onload = function() {
            data = JSON.parse(this.response);

            if(request.status == 200)
            {
                //variable that is the description of the selected
                let nameText = document.createTextNode(data.tracks.items[0].name);
                let descriptionText = document.createTextNode("Click Here to Open Spotify.");
                //variable that is the first child of the paragraph
                let firstChild = songName.childNodes[0];
                let secondFirstChild = songDescription.childNodes[0];
                //now, replace the first child with the new text node
                songName.replaceChild(nameText, firstChild);
                songDescription.replaceChild(descriptionText, secondFirstChild);
                songDescription.href = data.tracks.items[0].external_urls.spotify;
                songImage.src = data.tracks.items[0].album.images[0].url;
                
            }
            else{
                console.log(`Error occurced: Status: ${request.status}`);
                //variable that is the description of the selected
                let nameText = document.createTextNode("No Results");
                let descriptionText = document.createTextNode(" ");
                //variable that is the first child of the paragraph
                let firstChild = songName.childNodes[0];
                let secondFirstChild = songDescription.childNodes[0];
                //now, replace the first child with the new text node
                songName.replaceChild(nameText, firstChild);
                songDescription.replaceChild(descriptionText, secondFirstChild);
                songDescription.href = " ";
                songImage.src = " ";
            }
        };
    request.send();
}

function spotifyRandomize()
{
    const request = new XMLHttpRequest();
        request.open("GET","https://api.spotify.com/v1/recommendations?market=US&seed_genres=" + spotifyList.value,true);
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Authorization", "Bearer " + spotify_token +"");

        request.onload = function() {
            data = JSON.parse(this.response);

            if((request.status == 200) && (data.tracks[0] != null))
            {
                let random = Math.floor(Math.random() * data.tracks.length);
                //variable that is the description of the selected
                let nameText = document.createTextNode(data.tracks[random].name);
                let descriptionText = document.createTextNode("Click Here to Open Spotify.");
                //variable that is the first child of the paragraph
                let firstChild = songName.childNodes[0];
                let secondFirstChild = songDescription.childNodes[0];
                //now, replace the first child with the new text node
                songName.replaceChild(nameText, firstChild);
                songDescription.replaceChild(descriptionText, secondFirstChild);
                songDescription.href = data.tracks[random].external_urls.spotify;
                songImage.src = data.tracks[random].album.images[0].url;
                
            }
            else{
                console.log(`Error occurced: Status: ${request.status}`);
                //variable that is the description of the selected
                let nameText = document.createTextNode("No Results");
                let descriptionText = document.createTextNode(" ");
                //variable that is the first child of the paragraph
                let firstChild = songName.childNodes[0];
                let secondFirstChild = songDescription.childNodes[0];
                //now, replace the first child with the new text node
                songName.replaceChild(nameText, firstChild);
                songDescription.replaceChild(descriptionText, secondFirstChild);
                songDescription.href = null;
                songImage.src = null;
            }
        };
    request.send();
}

function spotifyWait()
{
    //loop that requests a new token every hour
    if(true)
    {
        setTimeout(function(){
            setTimeout(function(){
                spotifyToken();
            }, (spotify_expire * 1000) - 500);
        }, 500);

    }
}

function getMovieGenres()
{
    let data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
    });

    xhr.open("GET", "https://advanced-movie-search.p.rapidapi.com/genre/movie/list");
    xhr.setRequestHeader("X-RapidAPI-Host", "advanced-movie-search.p.rapidapi.com");
    xhr.setRequestHeader("X-RapidAPI-Key", "62ade45960mshc0aaf491884fb2ep14bc5cjsnef200e9e5f59");

    xhr.onload = function() {
        data = JSON.parse(this.response);

        if(xhr.status == 200)
        {
            data.genres.forEach(
                genre=>
                {
                    console.log(genre.name);
                    let option = document.createElement("option");
                    //set the value to the description for ease of use of the "selectCategory" function
                    option.innerHTML = genre.name;
                    option.value = genre.id;
                    movieList.appendChild(option);
                }
            );
        }
        else{
            console.log(`Error occurced: Status: ${xhr.status}`);
        }
    };

    xhr.send(data);
}

function selectMovieGenre()
{
    let data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
    });

    xhr.open("GET", "https://advanced-movie-search.p.rapidapi.com/discover/movie?with_genres=" + movieList.value);
    xhr.setRequestHeader("X-RapidAPI-Host", "advanced-movie-search.p.rapidapi.com");
    xhr.setRequestHeader("X-RapidAPI-Key", "62ade45960mshc0aaf491884fb2ep14bc5cjsnef200e9e5f59");

    xhr.onload = function() {
        data = JSON.parse(this.response);

        if(xhr.status == 200)
        {
            //first, generate random number based on how many elements are in the array
            let random = Math.floor(Math.random() * data.results.length);
            //variable that is the description of the selected
            let nameText = document.createTextNode(data.results[random].original_title);
            let descriptionText = document.createTextNode(data.results[random].overview);
            //variable that is the first child of the paragraph
            let firstChild = movieName.childNodes[0];
            let secondFirstChild = movieDescription.childNodes[0];
            //now, replace the first child with the new text node
            movieName.replaceChild(nameText, firstChild);
            movieDescription.replaceChild(descriptionText, secondFirstChild);
            movieImage.src = data.results[random].poster_path;
        }
        else{
            //variable that is the description of the selected
            let nameText = document.createTextNode("No Results");
            let descriptionText = document.createTextNode(" ");
            //variable that is the first child of the paragraph
            let firstChild = movieName.childNodes[0];
            movieName.replaceChild(nameText, firstChild);
            let secondChild = movieDescription.childNodes[0];
            movieDescription.replaceChild(descriptionText, secondChild);
            movieImage.src = "";
            console.log(`Error occurced: Status: ${xhr.status}`);
        }
    };

    xhr.send(data);
}

function searchMovie()
{
    let data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
    });

    xhr.open("GET", "https://advanced-movie-search.p.rapidapi.com/search/movie?query=" + movieSearchBox.value);
    xhr.setRequestHeader("X-RapidAPI-Host", "advanced-movie-search.p.rapidapi.com");
    xhr.setRequestHeader("X-RapidAPI-Key", "62ade45960mshc0aaf491884fb2ep14bc5cjsnef200e9e5f59");

    xhr.onload = function() {
        data = JSON.parse(this.response);

        if((xhr.status == 200) && (data.total_results != 0))
        {
            //variable that is the description of the selected
            let nameText = document.createTextNode(data.results[0].original_title);
            let descriptionText = document.createTextNode(data.results[0].overview);
            //variable that is the first child of the paragraph
            let firstChild = movieName.childNodes[0];
            let secondFirstChild = movieDescription.childNodes[0];
            //now, replace the first child with the new text node
            movieName.replaceChild(nameText, firstChild);
            movieDescription.replaceChild(descriptionText, secondFirstChild);
            movieImage.src = data.results[0].poster_path;
        }
        else{
            //variable that is the description of the selected
            let nameText = document.createTextNode("No Results");
            let descriptionText = document.createTextNode(" ");
            //variable that is the first child of the paragraph
            let firstChild = movieName.childNodes[0];
            movieName.replaceChild(nameText, firstChild);
            let secondChild = movieDescription.childNodes[0];
            movieDescription.replaceChild(descriptionText, secondChild);
            movieImage.src = "";
            console.log(`Error occurced: Status: ${xhr.status}`);
        }
    };

    xhr.send(data);
}

//populate the select when the page loads
populateSelect();
spotifyToken();
getMovieGenres();