
//  Login Check 
if (sessionStorage.getItem("adminLogged") !== "true") {
    window.location.href = "index.html";
}

// Load Data 
let hotel = JSON.parse(localStorage.getItem("hotel")) || {
    name: "THALASSERY HOTEL"
};

let categories = JSON.parse(localStorage.getItem("categories")) || [
    "Tea",
    "Meals",
    "Biryani",
    "Drinks",
];

let menu = JSON.parse(localStorage.getItem("menu")) || [];

// ---------- Elements ----------
const menuList = document.getElementById("menuList");

const categorySelect = document.getElementById("itemCategory");

const hotelName = document.getElementById("hotelName");

// ---------- Load Settings ----------
hotelName.value = hotel.name;

// ---------- Category Dropdown ----------
function loadCategories() {

    categorySelect.innerHTML = "";

    categories.forEach(cat => {

        categorySelect.innerHTML += `
            <option>${cat}</option>
        `;

    });

}

// ---------- Render Menu ----------
function renderMenu() {

    menuList.innerHTML = "";

    menu.forEach(item => {

        menuList.innerHTML += `

<div class="bg-gray-50 border rounded-xl p-5 mb-4">

<div class="flex justify-between items-center">

<div>

<div class="text-3xl">${item.emoji}</div>

<h2 class="text-xl font-bold mt-2">

${item.name}

</h2>

<p class="text-gray-500">

₹${item.price}

</p>

<p class="text-sm text-teal-600">

${item.category}

</p>

</div>

<div class="flex items-center gap-2 mt-4">

<button
    onclick="editItem(${item.id})"
    class="inline-flex items-center gap-2 bg-neutral-400 hover:bg-neutral-500 text-white px-3 py-2 rounded-lg transition">

    <img
        src="images/icon_edit.svg"
        alt="Edit"
        class="w-5 h-5">

    Edit

<button
    onclick="deleteItem(${item.id})"
    class="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">

    <img
        src="images/icon_delete.svg"
        alt="Delete"
        class="w-5 h-5">

    <span>Delete</span>

</button>

</div>

</div>

</div>

`;

    });

}

// ---------- Save ----------
function saveMenu() {

    localStorage.setItem(
        "menu",
        JSON.stringify(menu)
    );

}

// ---------- Start ----------
loadCategories();

renderMenu();

let editingId = null;

// Open Modal
function editItem(id){

    editingId = id;

    const item = menu.find(i => i.id === id);

    document.getElementById("editName").value = item.name;
    document.getElementById("editPrice").value = item.price;
    document.getElementById("editEmoji").value = item.emoji;

    const select = document.getElementById("editCategory");

    select.innerHTML = "";

    categories.forEach(cat=>{

        select.innerHTML += `
            <option
            ${cat===item.category?"selected":""}>
            ${cat}
            </option>
        `;

    });

    document
        .getElementById("editModal")
        .classList.remove("hidden");

    document
        .getElementById("editModal")
        .classList.add("flex");

}

function updateItem(){

    const item = menu.find(i=>i.id===editingId);

    item.name =
        document.getElementById("editName").value;

    item.price =
        Number(document.getElementById("editPrice").value);

    item.category =
        document.getElementById("editCategory").value;

    item.emoji =
        document.getElementById("editEmoji").value;

    saveMenu();

    renderMenu();

    closeModal();

}

function closeModal(){

    document
        .getElementById("editModal")
        .classList.add("hidden");

    document
        .getElementById("editModal")
        .classList.remove("flex");

}
function closeModal(){

    document
        .getElementById("editModal")
        .classList.add("hidden");

    document
        .getElementById("editModal")
        .classList.remove("flex");

}




function addItem(){

    const name = document.getElementById("itemName").value.trim();

    const price = Number(document.getElementById("itemPrice").value);

    const category = document.getElementById("itemCategory").value;

    const emoji = document.getElementById("itemEmoji").value || "🍽";

    if(name==="" || price<=0){

        alert("Please enter a valid name and price.");

        return;

    }

    menu.push({

        id: Date.now(),

        name,

        price,

        category,

        emoji,

        qty:0

    });

    saveMenu();

    renderMenu();

    document.getElementById("itemName").value="";
    document.getElementById("itemPrice").value="";
    document.getElementById("itemEmoji").value="";

}



function deleteItem(id){

    if(!confirm("Delete this item?")) return;

    menu = menu.filter(item => item.id !== id);

    saveMenu();

    renderMenu();

}


function loadSettings(){

    const hotel =
        JSON.parse(localStorage.getItem("hotel")) || {

            name:"THALASSERY HOTEL",

            phone:"",

            address:""

        };

    document.getElementById("hotelName").value =
        hotel.name;

    document.getElementById("hotelPhone").value =
        hotel.phone;

    document.getElementById("hotelAddress").value =
        hotel.address;

    document.getElementById("adminUser").value =
        localStorage.getItem("adminUser") || "salih";

}


function saveSettings(){

    const hotel = {

        name:document.getElementById("hotelName").value,

        phone:document.getElementById("hotelPhone").value,

        address:document.getElementById("hotelAddress").value

    };

    localStorage.setItem(
        "hotel",
        JSON.stringify(hotel)
    );

    // Username

    localStorage.setItem(
        "adminUser",
        document.getElementById("adminUser").value
    );

    // Password

    const current =
        document.getElementById("currentPassword").value;

    const newPass =
        document.getElementById("newPassword").value;

    const confirm =
        document.getElementById("confirmPassword").value;

    const oldPass =
        localStorage.getItem("adminPass") || "1234";

    if(current !== ""){

        if(current !== oldPass){

            alert("Current password is incorrect");

            return;

        }

        if(newPass !== confirm){

            alert("Passwords do not match");

            return;

        }

        if(newPass.length < 4){

            alert("Password must be at least 4 characters");

            return;

        }

        localStorage.setItem(
            "adminPass",
            newPass
        );

    }

    alert("✅ Settings Saved");

    document.getElementById("currentPassword").value="";
    document.getElementById("newPassword").value="";
    document.getElementById("confirmPassword").value="";

}

// logout

function logout(){

    sessionStorage.removeItem("adminLogged");

    window.location.href = "index.html";

}

loadSettings();