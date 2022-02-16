//json data
let data;
//variables that correspond to the elements in the HTML
let categoryList = document.getElementById("categoryList");
let description = document.getElementById("categoryDescription");
let searchBox = document.getElementById("searchBox");
let foundMealDescription = document.getElementById("foundMealDescription");
//http request
const request = new XMLHttpRequest();


//only called once when the page is loaded
function populateSelect()
{
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
    request.open("GET","https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchBox.value,true);

    request.onload = function() {
        data = JSON.parse(this.response);
        
        if(request.status == 200 && data.meals == null)
        {
            //variable that is the description of the selected
            let descriptionText = document.createTextNode("No Results");
            //variable that is the first child of the paragraph
            let firstChild = foundMealDescription.childNodes[0];
            //now, replace the first child with the new text node
            foundMealDescription.replaceChild(descriptionText, firstChild);
        }

        else if(request.status == 200 && data.meals != null)
        {
            let foundMeal = data.meals[0];
            console.log("Meal Name: " + foundMeal.strMeal + " Instructions: " + foundMeal.strInstructions);
            //variable that is the description of the selected
            let descriptionText = document.createTextNode("Meal Name: " + foundMeal.strMeal + " Instructions: " + foundMeal.strInstructions);
            //variable that is the first child of the paragraph
            let firstChild = foundMealDescription.childNodes[0];
            //now, replace the first child with the new text node
            foundMealDescription.replaceChild(descriptionText, firstChild);
        }
        else{
            console.log(`Error occurced: Status: ${request.status}`);
        }
    };

    request.send();
}

//populate the select when the page loads
populateSelect();