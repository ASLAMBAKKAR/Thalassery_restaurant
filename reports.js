const reportList = document.getElementById("reportList");

let reports = JSON.parse(localStorage.getItem("reports")) || [];

renderReports();

function renderReports(){

    reportList.innerHTML="";

    if(reports.length===0){

        reportList.innerHTML=`

        <div class="bg-white/10 rounded-3xl p-10 text-center backdrop-blur-xl border border-white/20">

        <h2 class="text-3xl font-bold">

        No Reports Found

        </h2>

        </div>

        `;

        return;

    }

    [...reports].reverse().forEach(report=>{

        let rows="";

        let items = report.items || report.menu || [];

        items.forEach(item=>{

            const qty = item.qty || 0;

            if(qty>0){

                rows+=`

                <tr class="border-b border-white/10">

                    <td class="py-2">${item.name}</td>

                    <td>${qty}</td>

                    <td>₹${item.price}</td>

                    <td>₹${qty*item.price}</td>

                </tr>

                `;

            }

        });

        reportList.innerHTML+=`

<div class="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl">

<div class="flex justify-between items-center mb-4">

<div>

<h2 class="text-2xl font-bold">

${report.date}

</h2>

<p class="text-gray-300">

${report.time || ""}

</p>

</div>

<div class="text-right">

<p>Total Sales</p>

<h2 class="text-3xl font-bold text-green-400">

₹${report.totalAmount}

</h2>

</div>

</div>

<div class="grid md:grid-cols-3 gap-4 mb-5">

<div class="bg-white/10 rounded-2xl p-4">

Items Sold

<h2 class="text-2xl font-bold">

${report.totalItems}

</h2>

</div>

<div class="bg-white/10 rounded-2xl p-4">

Cash

<h2 class="text-2xl font-bold">

₹${report.cash}

</h2>

</div>

<div class="bg-white/10 rounded-2xl p-4">

UPI

<h2 class="text-2xl font-bold">

₹${report.upi}

</h2>

</div>

</div>

<div class="overflow-x-auto">

<table class="w-full">

<thead>

<tr class="border-b border-white/20">

<th class="text-left py-3">Item</th>

<th>Qty</th>

<th>Price</th>

<th>Total</th>

</tr>

</thead>

<tbody>

${rows}

</tbody>

</table>

</div>

</div>

`;

    });

}

async function downloadPDF(){

    const {jsPDF}=window.jspdf;

    const doc=new jsPDF();

    const reports=JSON.parse(localStorage.getItem("reports"))||[];

    if(reports.length===0){

        alert("No reports found");

        return;

    }

    reports.forEach((report,index)=>{

        if(index>0) doc.addPage();

        doc.setFontSize(22);

        doc.text("THALASSERY HOTEL",15,20);

        doc.setFontSize(14);

        doc.text("Daily Sales Report",15,30);

        doc.setFontSize(11);

        doc.text("Date : "+report.date,15,45);

        doc.text("Time : "+(report.time||""),15,53);

        doc.text("Total Sales : ₹"+report.totalAmount,15,61);

        doc.text("Items Sold : "+report.totalItems,15,69);

        doc.text("Cash : ₹"+report.cash,15,77);

        doc.text("UPI : ₹"+report.upi,15,85);

        let body=[];

        let items=report.items||report.menu||[];

        items.forEach(item=>{

            if(item.qty>0){

                body.push([

                    item.name,

                    item.qty,

                    "₹"+item.price,

                    "₹"+(item.qty*item.price)

                ]);

            }

        });

        doc.autoTable({

            startY:95,

            head:[["Item","Qty","Price","Total"]],

            body:body,

            theme:"grid",

            headStyles:{

                fillColor:[13,148,136]

            }

        });

    });

    doc.save("Thalassery_Hotel_Reports.pdf");

}