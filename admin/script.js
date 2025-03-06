let IP = '192.168.16.76'

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
        await axios.post(`http://192.168.16.76:5000/login`, {
            username: username,
            password: password,
        });
        alert('Login successful');
        // Clear form fields
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        
    } catch (error) {
        alert('Login Failed');
        console.error('Login error: Invalid credentials', error);
    }

    // window.location.href = 'dashboard.html'
}

function toggleMenu() {
    const menu = document.querySelector(".menu-options");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function editMeal(button) {
    // const mealDiv = button.parentElement;
    // const mealName = mealDiv.querySelector("h2").innerText;
    // const mealDesc = mealDiv.querySelector(".description").innerText;
    // const mealPrice = mealDiv.querySelector(".price").innerText.replace("$", "");

   

    // Get the row that contains the clicked button
    let row = button.parentElement.parentElement;

    // Extract meal data from the row cells
    let id = row.cells[0].textContent;
    let name = row.cells[1].textContent;
    let price = row.cells[2].textContent;
    let description = row.cells[3].textContent;
    let foodType = row.cells[4].textContent;
    let imageUrl = row.cells[5].querySelector("img").src;

    document.getElementById("edit-id").innerHTML = "ID: " + id;
    document.getElementById("edit-name").value = name;
    document.getElementById("edit-price").value = price.replace("$", ""); 
    document.getElementById("edit-description").value = description;
    document.getElementById("edit-image").value = imageUrl;


    let dropdown = document.getElementById("edit-food-type");
    dropdown.value = foodType;
    
}

function openEditForm(button) {
    
    editMeal(button)
    document.querySelector(".edit-modal").style.display = "block";
    // document.getElementById("edit-id").value = id;
    // document.getElementById("edit-name").value = name;
    // document.getElementById("edit-price").value = price.replace("$", ""); 
    // document.getElementById("edit-description").value = description;
    // document.getElementById("edit-image").value = imageUrl;

    // Fetch food types and set the current one
    // fetchFoodTypes().then(() => {
    //     let dropdown = document.getElementById("edit-food-type");
    //     dropdown.value = foodType;  
    // });

    
}

function fetchFoodTypeById(foodTypeId) {
    return axios.get(`http://${IP}:5000/food_types/${foodTypeId}`)  // Fetch specific food type by ID
        .then(response => {
            if (response.data && response.data.name) {
                return response.data.name; // Return the food type name
            } else {
                throw new Error("Invalid response format");
            }
        })
        .catch(error => {
            console.error("Error fetching food type:", error);
            return null; // Return null in case of an error
        });
}

function saveEdit() {
    let id = document.getElementById("edit-id").value;
    let name = document.getElementById("edit-name").value;
    let price = document.getElementById("edit-price").value;
    let description = document.getElementById("edit-description").value;
    let foodType = document.getElementById("edit-food-type").value;
    let imageUrl = document.getElementById("edit-image").value;

    axios.post('/update_meal', {
        id: id,
        name: name,
        price: price,
        description: description,
        food_type: foodType,
        image_url: imageUrl
    })
    .then(response => {
        if (response.data.success) {
            alert("Meal updated successfully!");
            location.reload(); // Refresh to show changes
        } else {
            alert("Failed to update meal.");
        }
    })
    .catch(error => console.error("Error updating meal:", error));
}


function closeModal() {
    document.querySelector(".edit-modal").style.display = "none";
}

async function addMeal() {
    const name = document.getElementById('meal-name').value;
    const price = document.getElementById('meal-price').value;
    const description = document.getElementById('meal-description').value;
    const food_type = document.getElementById('meal-food-type').value;
    const image_url = document.getElementById('meal-image').value;

    try {
        await axios.post(`http://${IP}:5000/meals`, {
            name: name,
            price: parseFloat(price),
            description: description,
            food_type: food_type,
            image_url: image_url
        });
        
        // Clear form fields
        document.getElementById('meal-name').value = '';
        document.getElementById('meal-price').value = '';
        document.getElementById('meal-description').value = '';
        document.getElementById('meal-food-type').value = '';
        document.getElementById('meal-image').value = '';

        // Refresh the games list
        getMeals();
        
        alert('Meal added successfully!');
    } catch (error) {
        console.error('Error adding meal:', error);
        alert('Failed to add meal');
    }
}

async function getMeals() {
    try {
        const response = await axios.get(`http://${IP}:5000/meal`);
        const mealsTableBody = document.getElementById('meals-list');
        mealsTableBody.innerHTML = '';
        
        for (const meal of response.data.meals) {
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${meal.id}</td>
                <td>${meal.name}</td>
                <td>$${meal.price}</td>
                <td>${meal.description}</td>
                <td>${meal.foodType}</td>
                <td><img src="${meal.image_url}" alt="${meal.name}" width="50"></td>
                <td><button onclick="openEditForm(this)">Edit</button></td>
                <td><button onclick="deleteMeal(${meal.id})">Delete</button></td>
            `;
            
            mealsTableBody.appendChild(row);
        }
    } catch (error) {
        console.error('Error fetching meals:', error);
        alert('Failed to fetch meals');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getMeals();
});