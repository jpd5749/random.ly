//json data
let data;
//variables that correspond to the elements in the HTML
let categoryList = document.getElementById("categoryList");
let description = document.getElementById("categoryDescription");


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
                    console.log(`Category name: ${category.strCategory}, Desc: ${category.strCategoryDescription}`);
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

//populate the select when the page loads
populateSelect();