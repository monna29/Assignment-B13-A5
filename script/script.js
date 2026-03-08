const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

const container = document.getElementById("issuesContainer")
const loader = document.getElementById("loader")
const issueCount = document.getElementById("issueCount")

let allIssues = []



function loadIssues() {

    loader.classList.remove("hidden")

    fetch(API)
        .then(res => res.json())
        .then(data => {

            loader.classList.add("hidden")

            allIssues = data.data

            displayIssues(allIssues)

        })

}



function displayIssues(issues) {

    container.innerHTML = ""

    issueCount.innerText = issues.length + " Issues"

    issues.forEach(issue => {

        function getPriorityClass(priority) {

            if (priority === "high") {
                return "bg-red-100 text-red-600"
            }

            if (priority === "medium") {
                return "bg-yellow-100 text-yellow-700"
            }

            return "bg-green-100 text-green-700"

        }


        function getStatusClass(status) {

            if (status === "open") {
                return "bg-green-100 text-green-700"
            }

            return "bg-purple-100 text-purple-700"

        }


        function getLabelClass(label) {

            if (label === "bug") {
                return "bg-red-100 text-red-600"
            }

            if (label === "feature") {
                return "bg-blue-100 text-blue-600"
            }

            if (label === "enhancement") {
                return "bg-green-100 text-green-600"
            }

            return "bg-gray-100 text-gray-600"

        }


        const border =
            issue.status === "open"
                ? "border-green-500"
                : "border-purple-500"

        const card = document.createElement("div")



        card.innerHTML = `
<div  onclick="loadWordDetails(${issue.id})"  class="bg-white p-4 rounded shadow border-t-4 ${border} cursor-pointer hover:shadow-lg">
  
  <div class="flex justify-between">
    ${issue.status === "open"
                ? "<img src='assets/Open-Status.png' class='w-6'>"
                : "<img src='assets/Closed- Status .png' class='w-6'>"
            }

    <span class="px-2 py-1 text-xs rounded-full ${getPriorityClass(issue.priority)}">
      ${issue.priority}
    </span>
  </div>

  <h2 class="font-bold text-lg mt-2">
    ${issue.title}
  </h2>

  <p class="text-sm text-gray-600 mt-2">
    ${issue.description.slice(0, 80)}...
  </p>

  <div class="flex gap-2 mt-3 flex-wrap">
    ${issue.labels?.map(label => {
                let colorClass = "";
                if (label === "bug") colorClass = "bg-red-100 text-red-600";
                else if (label === "help wanted") colorClass = "bg-yellow-100 text-yellow-700";
                else if (label === "feature") colorClass = "bg-blue-100 text-blue-600";
                else if (label === "enhancement") colorClass = "bg-green-100 text-green-600";
                else colorClass = "bg-gray-100 text-gray-600";

                return `<p class="px-2 py-1 rounded-full text-xs font-medium ${colorClass}">${label}</p>`;
            }).join('') || ""}
  </div>

  <hr class="my-2">

  <p class="text-xs text-gray-500 mt-2">
    Author: ${issue.author}
  </p>

  <p class="text-xs text-gray-400">
    Created: ${issue.createdAt}
  </p>
</div>
`;


        container.appendChild(card)

    })

}



function setTab(status) {

    document.querySelectorAll(".tabBtn")
        .forEach(btn => {

            btn.classList.remove("bg-purple-600", "text-white")
            btn.classList.add("bg-gray-200")

        })

    if (status === "all") {

        document.getElementById("allTab")
            .classList.add("bg-purple-600", "text-white")

        displayIssues(allIssues)

    }

    if (status === "open") {

        document.getElementById("openTab")
            .classList.add("bg-purple-600", "text-white")

        const filtered =
            allIssues.filter(i => i.status === "open")

        displayIssues(filtered)

    }

    if (status === "closed") {

        document.getElementById("closedTab")
            .classList.add("bg-purple-600", "text-white")

        const filtered =
            allIssues.filter(i => i.status === "closed")

        displayIssues(filtered)

    }

}



function searchIssue() {

    const text =
        document.getElementById("searchInput").value

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)
        .then(res => res.json())
        .then(data => {

            displayIssues(data.data)

        })

}


const loadWordDetails = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    console.log(url);
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}

const displayWordDetails = (word) => {
      
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
 <div class="">
   <div>
       <h3 class="font-bold text-2xl mt-2">${word.title} </h3>
       <div class="flex gap-2 my-2">
           <p class="p-1 rounded-sm text-white bg-[#00A96E]"> ${word.status}
           <p>.Opened by <span> ${word.author} </span></p>
           <p>22/02/202
       </div>
       <div class="flex gap-2 mt-3 flex-wrap">
    ${word.labels?.map(label => {
                let colorClass = "";
                if (label === "bug") colorClass = "bg-red-100 text-red-600";
                else if (label === "help wanted") colorClass = "bg-yellow-100 text-yellow-700";
                else if (label === "feature") colorClass = "bg-blue-100 text-blue-600";
                else if (label === "enhancement") colorClass = "bg-green-100 text-green-600";
                else colorClass = "bg-gray-100 text-gray-600";

                return `<p class="px-2 py-1 rounded-full text-xs font-medium ${colorClass}">${label}</p>`;
            }).join('') || ""}
  </div>
      <p class="my-2"> ${word.description} </p>
   </div>
   <div class="flex rounded-xs p-3 bg-[#e3eaf3] mt-3">
       <div class="flex-1">
           <p>Assignee:</p>
           <p class="font-bold">${word.author}</p>
       </div>
       <div class="flex-1">
           <p>Priority </p>
           <span class="px-2 py-1 text-xs text-white bg-[#c24747] rounded-full ${word.priority}">
      ${word.priority}
    </span>
       </div>
   </div>
 </div>
 `
    document.getElementById("my_modal_5").showModal();
}


loadIssues()