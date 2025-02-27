async function login() {
    // const username = document.getElementById('username').value;
    // const password = document.getElementById('password').value;
    // try {
    //     await axios.post('http://127.0.0.1:5000/login', {
    //         username: username,
    //         password: password,
    //     });
        
    //     // Clear form fields
    //     document.getElementById('username').value = '';
    //     document.getElementById('password').value = '';
        
    // } catch (error) {
    //     alert('Login Failed');
    //     console.error('Login error: Invalid credentials', error);
    // }

    window.location.href = 'dashboard.html'
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

    document.getElementById("meal-name").value = name;
    document.getElementById("meal-description").value = description;
    document.getElementById("meal-price").value = price;

    document.querySelector(".edit-modal").style.display = "block";
}

function saveMeal() {
    const mealName = document.getElementById("meal-name").value;
    const mealDesc = document.getElementById("meal-description").value;
    const mealPrice = document.getElementById("meal-price").value;

    console.log(`Updated Meal: ${mealName}, ${mealDesc}, $${mealPrice}`);

    closeModal();
}

function closeModal() {
    document.querySelector(".edit-modal").style.display = "none";
}

function addMeal() {
    alert("Feature to add meals coming soon!");
}
