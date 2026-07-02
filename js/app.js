
const hotel = JSON.parse(localStorage.getItem("hotel")) || {
    name: "THALASSERY HOTEL"
};

const categories = JSON.parse(localStorage.getItem("categories")) || [
    "Breads",
    "Rice",
    "Currys",
    "Meals"
];

let menu = JSON.parse(localStorage.getItem("menu")) || [
    {id:1,name:"Tea",price:10,category:"Tea",qty:0,emoji:"☕"},
    {id:2,name:"Coffee",price:15,category:"Tea",qty:0,emoji:"☕"},
    {id:3,name:"Meals",price:80,category:"Meals",qty:0,emoji:"🍽"},
    {id:4,name:"Chicken Biryani",price:150,category:"Biryani",qty:0,emoji:"🍛"},
    {id:5,name:"Cool Drinks",price:25,category:"Drinks",qty:0,emoji:"🥤"}
];

let currentCategory = categories[0];

const categoryDiv = document.getElementById("categories");
const menuGrid = document.getElementById("menuGrid");

document.getElementById("todayDate").innerText =
new Date().toLocaleDateString("en-IN",{
    weekday:"short",
    day:"numeric",
    month:"short",
    year:"numeric"
});

document.querySelector("h1").innerText =
hotel.name;

function saveMenu(){
    localStorage.setItem("menu",JSON.stringify(menu));
}

function renderCategories(){

    categoryDiv.innerHTML="";

    categories.forEach(cat=>{

        const btn=document.createElement("button");

        btn.innerText=cat;

        btn.className =
        "px-6 py-3 rounded-2xl backdrop-blur-lg border border-white/20 transition";

        if(cat===currentCategory){

           btn.classList.add(
           "bg-gradient-to-r",
           "from-emerald-500",
           "to-teal-600",
           "text-white",
           "shadow-xl"
        );

        }else{

            btn.classList.add(
            "bg-white/10",
            "text-white"
        );

        }

        btn.onclick=function(){

            currentCategory=cat;

            renderCategories();

            renderMenu();

        };

        categoryDiv.appendChild(btn);

    });

}

function saveDay() {

    const today = new Date().toLocaleDateString("en-IN");

    const soldItems = menu.filter(item => item.qty > 0);

    const totalAmount = soldItems.reduce(
        (sum, item) => sum + (item.price * item.qty),
        0
    );

    const totalItems = soldItems.reduce(
        (sum, item) => sum + item.qty,
        0
    );

    const report = {

        id: Date.now(),

        date: today,

        time: new Date().toLocaleTimeString("en-IN"),

        items: soldItems,

        totalItems,

        totalAmount,

        cash: Number(cash.value) || 0,

        upi: Number(upi.value) || 0,

        collection:
            (Number(cash.value) || 0) +
            (Number(upi.value) || 0),

        difference:
            totalAmount -
            ((Number(cash.value) || 0) +
            (Number(upi.value) || 0))

    };

    let reports = JSON.parse(localStorage.getItem("reports")) || [];

    reports.push(report);
    console.log(report);

    localStorage.setItem(
        "reports",
        JSON.stringify(reports)
    );
    console.log(localStorage.getItem("reports"));

    alert("✅ Day Saved Successfully");

}

function shareReport() {

    const hotel = JSON.parse(localStorage.getItem("hotel")) || {
        name: "THALASSERY HOTEL"
    };

    const cash = Number(document.getElementById("cash").value) || 0;
    const upi = Number(document.getElementById("upi").value) || 0;

    const totalCollection = cash + upi;

    let report = "";

    report += "🏨 " + hotel.name + "\n";
    report += "📅 " + new Date().toLocaleDateString() + "\n\n";

    report += "📋 ITEM REPORT\n";
    report += "────────────────────\n";

    let totalItems = 0;
    let totalSales = 0;

    menu.forEach(item => {

        if (item.qty > 0) {

            const amount = item.qty * item.price;

            report += `${item.emoji} ${item.name}\n`;
            report += `   Qty : ${item.qty}\n`;
            report += `   Amount : ₹${amount}\n\n`;
            totalItems += item.qty;
            totalSales += amount;
        }

    });

    report += "────────────────────\n";
    report += `🍽 Total Items : ${totalItems}\n`;
    report += `💰 Total Sales : ₹${totalSales}\n\n`;

    report += "💵 CASH : ₹" + cash + "\n";
    report += "📱 UPI : ₹" + upi + "\n";
    report += "────────────────────\n";
    report += "✅ TOTAL COLLECTION : ₹" + totalCollection + "\n";
    report += "📊 DIFFERENCE : ₹" + (totalSales - totalCollection) + "\n";
    report += "────────────────────\n\n";
    report += "🙏 Thank You";

    if (navigator.share) {

        navigator.share({
            title: "Daily Sales Report",
            text: report
        });

    } else {

        navigator.clipboard.writeText(report);

        alert("Report copied to clipboard.");

    }

}

function resetSales(){

    if(!confirm("Reset today's sales?")) return;

    menu.forEach(item=>{

        item.qty=0;

    });

    cash.value="";

    upi.value="";

    localStorage.removeItem("cash");
    localStorage.removeItem("upi");

    saveMenu();

    renderMenu();

}
document.getElementById("adminBtn").addEventListener("click", openLogin);


function openLogin() {
    document.getElementById("loginModal").classList.remove("hidden");
    document.getElementById("loginModal").classList.add("flex");
}

function closeLogin() {
    document.getElementById("loginModal").classList.add("hidden");
    document.getElementById("loginModal").classList.remove("flex");
}

function loginAdmin() {

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;

    const savedUser = localStorage.getItem("adminUser") || "admin";
    const savedPass = localStorage.getItem("adminPass") || "1234";

    if (username === savedUser && password === savedPass) {

        sessionStorage.setItem("adminLogged", "true");
        window.location.href = "admin.html";

    } else {

        document.getElementById("loginError").classList.remove("hidden");

    }
}

function renderMenu(){

    menuGrid.innerHTML="";

    menu
    .filter(item=>item.category===currentCategory)
    .forEach(item=>{

        const card=document.createElement("div");

        card.className =
        "bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-5 text-white hover:scale-105 hover:border-emerald-400 transition duration-300";

        card.innerHTML=`

            <div class="text-4xl">${item.emoji}</div>

            <h2 class="font-bold text-xl mt-2">

                ${item.name}

            </h2>

            <p class="text-teal-700 font-bold">

                ₹${item.price}

            </p>

            <div class="flex justify-center items-center gap-4 mt-5">

                <button
                onclick="decrease(${item.id})"
                class="bg-red-500 text-white w-10 h-10 rounded-full">

                −

                </button>

                <button
                onclick="editQty(${item.id})"
                class="font-bold text-xl">

                    ${item.qty}

                </button>

                <button
                onclick="increase(${item.id})"
                class="bg-green-500 text-white w-10 h-10 rounded-full">

                +

                </button>

            </div>

        `;

        menuGrid.appendChild(card);

    });

    calculate();

}

function increase(id){

    const item=menu.find(i=>i.id===id);

    item.qty++;

    saveMenu();

    renderMenu();

}

function decrease(id){

    const item=menu.find(i=>i.id===id);

    if(item.qty>0){

        item.qty--;

    }

    saveMenu();

    renderMenu();

}


function openLogin(){

    document
        .getElementById("loginModal")
        .classList.remove("hidden");

    document
        .getElementById("loginModal")
        .classList.add("flex");

    document.getElementById("loginUsername").focus();

}

function closeLogin(){

    document
        .getElementById("loginModal")
        .classList.add("hidden");

    document
        .getElementById("loginModal")
        .classList.remove("flex");

    document.getElementById("loginPassword").value="";
    document.getElementById("loginError").classList.add("hidden");

}
function loginAdmin(){

    const username =
        document.getElementById("loginUsername").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    const savedUser =
        localStorage.getItem("adminUser") || "admin";

    const savedPass =
        localStorage.getItem("adminPass") || "1234";

    if(username===savedUser && password===savedPass){

        sessionStorage.setItem("adminLogged","true");

        window.location.href="admin.html";

    }else{

        document
            .getElementById("loginError")
            .classList.remove("hidden");

    }

}
function editQty(id){

    const item=menu.find(i=>i.id===id);

    const qty=prompt(
        "Enter Quantity",
        item.qty
    );

    if(qty===null)return;

    item.qty=Number(qty)||0;

    saveMenu();

    renderMenu();

}

function calculate(){

    let items=0;

    let amount=0;

    menu.forEach(item=>{

        items+=item.qty;

        amount+=item.qty*item.price;

    });

    document.getElementById("totalItems").innerText=items;

    document.getElementById("totalSales").innerText=
    "₹"+amount.toLocaleString();

}

const cash=document.getElementById("cash");
const upi=document.getElementById("upi");

cash.value=localStorage.getItem("cash")||"";
upi.value=localStorage.getItem("upi")||"";

cash.oninput=function(){

    localStorage.setItem("cash",cash.value);

}

upi.oninput=function(){

    localStorage.setItem("upi",upi.value);

}


document.addEventListener("keydown", function(e){

    if(e.key==="Enter"){

        const modal=document.getElementById("loginModal");

        if(!modal.classList.contains("hidden")){

            loginAdmin();

        }

    }

});

renderCategories();
renderMenu();