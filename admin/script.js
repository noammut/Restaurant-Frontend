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
        window.location.href = 'dashboard.html'
        
    } catch (error) {
        alert('Login Failed');
        console.error('Login error: Invalid credentials', error);
    }

    
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

    // Fetch food types and set the current one
    fetchFoodTypes();
    let dropdown = document.getElementById("edit-food-type");
    for (let option of dropdown.options) {
        console.log(option.text, foodType);
        if (option.text.trim() === foodType.trim()) {
            console.log("Matched");
            option.selected = true;
            break;
        }
    }    
    dropdown.dispatchEvent(new Event('change'));
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

async function fetchFoodTypes() {
    try {
        const response = await axios.get(`http://${IP}:5000/foodtype`);
        const foodTypes = response.data;
        const dropdown = document.getElementById("edit-food-type");
        dropdown.innerHTML = ""; // Clear existing options

        for (const foodType of foodTypes) {
            const option = document.createElement("option");
            option.value = foodType.id;
            option.textContent = foodType.name;
            dropdown.appendChild(option);
        }
    }
    catch (error) {
        console.error("Error fetching food types:", error);
    }
}

async function saveEdit() {
    let id_label = document.getElementById('edit-id');
    let id = id_label.textContent.replace('ID: ', '');
    let name = document.getElementById("edit-name").value;
    let price = document.getElementById("edit-price").value;
    let description = document.getElementById("edit-description").value;
    let foodType = document.getElementById("edit-food-type").value;
    let imageUrl = document.getElementById("edit-image").value;

    try {
        const response = await axios.put(`http://${IP}:5000/meal`, {
            id: id,
            name: name,
            price: price,
            image: imageUrl,
            description: description,
            foodType: foodType
        });
        closeModal();
        if (response.status === 200) {
            alert("Meal updated successfully!");
            location.reload(); // Refresh to show changes
        } else {
            alert("Failed to update meal.");
        }
    } catch (error) {
        console.error("Error updating meal:", error);
    }
    
}


// Show modal with animation
function openModal(button) {
    editMeal(button);
    const modal = document.getElementById('editModal');
    modal.style.display = 'flex';
    setTimeout(() => {
      modal.classList.add('active');
    }, 10);
  }
  
  // Close modal with animation
function closeModal() {
    const modal = document.getElementById('editModal');
    const modalContent = document.querySelector('.modal-content');
    
    modalContent.classList.add('modal-closing');
    
    setTimeout(() => {
      modal.classList.remove('active');
      setTimeout(() => {
        modal.style.display = 'none';
        modalContent.classList.remove('modal-closing');
      }, 300);
    }, 300);
  }

async function addMeal() {
    const name = document.getElementById('meal-name').value;
    const price = document.getElementById('meal-price').value;
    const description = document.getElementById('meal-description').value;
    const food_type = document.getElementById('meal-food-type').value;
    const image_url = document.getElementById('meal-image').value;

    try {
        await axios.post(`http://${IP}:5000/meal`, {
            name: name,
            price: parseFloat(price),
            description: description,
            foodType: food_type,
            image: image_url
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

async function deleteMeal(id) {
    try {
        await axios.delete(`http://${IP}:5000/meal`, { 
            data: { id: id }
        });
        alert('Meal deleted successfully!');
        getMeals();
    } catch (error) {
        console.error('Error deleting meal:', error);
        alert('Failed to delete meal');
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
                <td><img src="${meal.image}" alt="${meal.name}" width="50"></td>
                <td><button onclick="openModal(this)">Edit</button></td>
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