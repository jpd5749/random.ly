//json data
let data;
//variables that correspond to the elements in the HTML
let categoryList = document.getElementById("categoryList");
let description = document.getElementById("categoryDescription");
let searchBox = document.getElementById("searchBox");
let foundMealName = document.getElementById("foundMealName");
let foundMealDescription = document.getElementById("foundMealDescription");
let spotifyList = document.getElementById("spotifyList");
//spotify credentials
var client_id = 'd8cd43d646624fe085630310d15cc9e9';
var client_secret = '193c9a9963454cf488aaad0efdc54442';
var spotify_token;


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
                    option.value = category.strCategoryDescription;
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
            let nameText = document.createTextNode("Meal Name: " + foundMeal.strMeal);
            let descriptionText = document.createTextNode("Instructions: " + foundMeal.strInstructions);
            //variable that is the first child of the paragraph
            let firstChild = foundMealName.childNodes[0];
            //replace the first child of the paragraph element
            foundMealName.replaceChild(nameText, firstChild);
            let secondChild = foundMealDescription.childNodes[0];
            foundMealDescription.replaceChild(descriptionText, secondChild);
        }
        else{
            console.log(`Error occurced: Status: ${request.status}`);
        }
    };

    request.send();
}

function randomMeal()
{
    const request = new XMLHttpRequest();
    request.open("GET","https://www.themealdb.com/api/json/v1/1/random.php",true);

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
            console.log("Meal Name: " + foundMeal.strMeal + " Instructions: " + foundMeal.strInstructions);
            //variable that is the description of the selected
            let nameText = document.createTextNode("Meal Name: " + foundMeal.strMeal);
            let descriptionText = document.createTextNode("Instructions: " + foundMeal.strInstructions);
            //variable that is the first child of the paragraph element
            let firstChild = foundMealName.childNodes[0];
            //replace the first child with our new text node
            foundMealName.replaceChild(nameText, firstChild);
            let secondChild = foundMealDescription.childNodes[0];
            foundMealDescription.replaceChild(descriptionText, secondChild);

        }
        else{
            console.log(`Error occurced: Status: ${request.status}`);
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
        }
        else{
            console.log(`Error occurced: Status: ${request.status}`);
            console.log(data);
        }
    };
    request.send();
}

function spotifyGetGenres()
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
                    spotifyList.appendChild(option);
                }
            );
        }
        else{
            console.log(`Error occurced: Status: ${request.status}`);
        }
    };
    request.send();
}

//populate the select when the page loads
populateSelect();
spotifyToken();