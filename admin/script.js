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
