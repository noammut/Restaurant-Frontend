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
    const mealDiv = button.parentElement;
    const mealName = mealDiv.querySelector("h2").innerText;
    const mealDesc = mealDiv.querySelector(".description").innerText;
    const mealPrice = mealDiv.querySelector(".price").innerText.replace("$", "");

    document.getElementById("meal-name").value = mealName;
    document.getElementById("meal-description").value = mealDesc;
    document.getElementById("meal-price").value = mealPrice;

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
  let currentTable = null;

        function showPopup(number, status, seats) {
            currentTable = number;
            document.getElementById('popup-content').innerText = `Table ${number}`;
            document.getElementById('status').value = status;
            document.getElementById('seats').value = seats;
            document.getElementById('popup').style.display = 'block';
        }

        function closePopup() {
            document.getElementById('popup').style.display = 'none';
        }

        function saveChanges() {
            const newStatus = document.getElementById('status').value;
            const newSeats = document.getElementById('seats').value;
            const tableElement = document.querySelector(`.circle-container .table:nth-child(${currentTable})`);
            tableElement.className = `table ${newStatus}`;
            alert(`Table ${currentTable} updated: Status - ${newStatus}, Seats - ${newSeats}`);
            closePopup();
        }
