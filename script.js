const quotes = {
    inspiration: [
        "The best way to get started is to quit talking and begin doing. - Walt Disney",
        "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty. - Winston Churchill",
        "Don't let yesterday take up too much of today. - Will Rogers"
    ],
    humor: [
        "I'm on a whiskey diet. I've lost three days already. - Tommy Cooper",
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
        "I have an inferiority complex, but it's not a very good one."
    ],
    life: [
        "Life is what happens when you're busy making other plans. - John Lennon",
        "To live is the rarest thing in the world. Most people exist, that is all. - Oscar Wilde",
        "Life is short, and it's up to you to make it sweet. - Sarah Louise Delany"
    ]
};

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayRandomQuote() {
    const category = document.getElementById("category").value;
    const categoryQuotes = quotes[category];
    const randomIndex = new Date().getDate() % categoryQuotes.length;
    document.getElementById("quote").innerText = categoryQuotes[randomIndex];
}

function refreshQuote() {
    displayRandomQuote();
}

function shareQuote() {
    const quote = document.getElementById("quote").innerText;
    if (navigator.share) {
        navigator.share({
            title: "Quote of the Day",
            text: quote,
        }).then(() => {
            console.log("Quote shared successfully!");
        }).catch(console.error);
    } else {
        alert("Sharing is not supported on this browser.");
    }
}

function addFavorite() {
    const quote = document.getElementById("quote").innerText;
    if (!favorites.includes(quote)) {
        favorites.push(quote);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        displayFavorites();
    } else {
        alert("Quote is already in favorites!");
    }
}

function displayFavorites() {
    const favoritesList = document.getElementById("favoritesList");
    favoritesList.innerHTML = "";
    favorites.forEach((fav, index) => {
        const li = document.createElement("li");
        li.innerText = fav;
        const removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove";
        removeBtn.onclick = () => removeFavorite(index);
        li.appendChild(removeBtn);
        favoritesList.appendChild(li);
    });
}

function removeFavorite(index) {
    favorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayFavorites();
}

function clearFavorites() {
    if (confirm("Are you sure you want to clear all favorites?")) {
        favorites = [];
        localStorage.removeItem("favorites");
        displayFavorites();
    }
}

// Task Management
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        tasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
        displayTasks();
    }
}

function displayTasks() {
    const tasksList = document.getElementById("tasksList");
    tasksList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerText = task;
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.onclick = () => removeTask(index);
        li.appendChild(deleteBtn);
        tasksList.appendChild(li);
    });
}

function removeTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// Settings
function changeTheme(theme) {
    document.querySelector(".container").classList.toggle("dark", theme === "dark");
}

function changeTextSize(size) {
    document.querySelector(".container").className = `container ${size}`;
}

// Initialize app
displayRandomQuote();
displayFavorites();
displayTasks();

