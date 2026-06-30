
//  Login Check 
if (sessionStorage.getItem("adminLogged") !== "true") {
    window.location.href = "index.html";
}

// Load Data 
let hotel = JSON.parse(localStorage.getItem("hotel")) || {
    name: "THALASSERY HOTEL"
};

let categories = JSON.parse(localStorage.getItem("categories")) || [
     "Breads",
    "Rice",
    "Currys",
    "Meals"
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

    const dropdown = document.getElementById("categoryDropdown");

    const selected = document.getElementById("selectedCategory");

    dropdown.innerHTML = "";

    categories.forEach(cat => {

        const item = document.createElement("button");

        item.type = "button";

        item.className = `
block
w-full
px-5
py-3
text-left
text-white
font-semibold
tracking-wide
transition-all
duration-200
hover:bg-white/15
hover:text-emerald-300
border-b
border-white/10
last:border-b-0`;

        item.textContent = cat;

        item.onclick = () => {

            selected.textContent = cat;

            document.getElementById("itemCategory").value = cat;

            toggleCategoryDropdown();

        };

        dropdown.appendChild(item);

    });

    if(categories.length){

        selected.textContent = categories[0];

        document.getElementById("itemCategory").value = categories[0];

    }

}
function toggleCategoryDropdown(){

    const menu = document.getElementById("categoryDropdown");

    const arrow = document.getElementById("categoryArrow");

    menu.classList.toggle("hidden");

    arrow.classList.toggle("rotate-180");

}
document.addEventListener("click", function(e){

    const btn = document.getElementById("categoryBtn");

    const menu = document.getElementById("categoryDropdown");

    if(!btn.contains(e.target) && !menu.contains(e.target)){

        menu.classList.add("hidden");

        document
            .getElementById("categoryArrow")
            .classList.remove("rotate-180");

    }

});
// ---------- Render Menu ----------
function renderMenu() {

    menuList.innerHTML = "";

    menu.forEach(item => {

        menuList.innerHTML += `

<div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-5 mb-4 hover:scale-[1.02] hover:border-emerald-400 transition-all duration-300 text-white">

    <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">

        <!-- Item Info -->
        <div class="flex items-center gap-4">

            <div class="text-5xl">
                ${item.emoji}
            </div>

            <div>

                <h2 class="text-xl font-bold text-white">
                    ${item.name}
                </h2>

                <p class="text-lg font-semibold text-emerald-300">
                    ₹${item.price}
                </p>

                <span class="inline-block mt-2 px-4 py-1 text-xs bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 rounded-full backdrop-blur-lg">
                    ${item.category}
                </span>

            </div>

        </div>

        <!-- Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

            <button
                onclick="editItem(${item.id})"
                class="group flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-5 py-3 rounded-xl transition w-full sm:w-auto">

                <!-- Pencil Icon -->
                <svg xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke-width="2"
                     stroke="currentColor"
                     class="w-5 h-5 transition duration-300 group-hover:rotate-12 group-hover:scale-110">

                    <path stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897L16.862 4.487z"/>
                </svg>

                <span>Edit</span>

            </button>

            <button
                onclick="deleteItem(${item.id})"
                class="group flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl transition w-full sm:w-auto">

                <!-- Trash Icon -->
                <svg xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke-width="2"
                     stroke="currentColor"
                     class="w-5 h-5 transition duration-300 group-hover:scale-110">

                    <path stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 7h12M10 11v6m4-6v6M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-8 0h10l-1 12H8L7 7z"/>

                </svg>

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

    loadEditCategories(item.category);



    document
        .getElementById("editModal")
        .classList.remove("hidden");

    document
        .getElementById("editModal")
        .classList.add("flex");

}

// load edit categories

function loadEditCategories(selectedValue){

    const menu = document.getElementById("editCategoryDropdown");

    menu.innerHTML = "";

    categories.forEach(cat=>{

        const btn = document.createElement("button");

        btn.type="button";

        btn.className=`
        block
        w-full
        px-5
        py-3
        text-left
        text-white
        hover:bg-white/15
        hover:backdrop-blur-xl
        transition
        border-b
        border-white/10
        last:border-0`;

        btn.innerHTML=cat;

        btn.onclick=()=>{

            document.getElementById("editSelectedCategory").innerHTML=cat;

            document.getElementById("editCategory").value=cat;

            toggleEditDropdown();

        };

        menu.appendChild(btn);

    });

    document.getElementById("editSelectedCategory").innerHTML=selectedValue;

    document.getElementById("editCategory").value=selectedValue;

}
function toggleEditDropdown(){

    document
        .getElementById("editCategoryDropdown")
        .classList.toggle("hidden");

    document
        .getElementById("editArrow")
        .classList.toggle("rotate-180");

}
document.addEventListener("click",(e)=>{

    const btn=document.getElementById("editCategoryBtn");

    const menu=document.getElementById("editCategoryDropdown");

    if(!btn.contains(e.target) && !menu.contains(e.target)){

        menu.classList.add("hidden");

        document
            .getElementById("editArrow")
            .classList.remove("rotate-180");

    }

});

function updateItem() {

    const item = menu.find(i => i.id === editingId);

    if (!item) return;

    item.name = document.getElementById("editName").value;

    item.price = Number(document.getElementById("editPrice").value);

    item.category = document.getElementById("editCategory").value;

    item.emoji = document.getElementById("editEmoji").value;

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
        localStorage.getItem("adminUser") || "admin";

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