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
 
        function getPriorityClass(priority){

if(priority === "high"){
return "bg-red-100 text-red-600"
}

if(priority === "medium"){
return "bg-yellow-100 text-yellow-700"
}

return "bg-green-100 text-green-700"

}


function getStatusClass(status){

if(status === "open"){
return "bg-green-100 text-green-700"
}

return "bg-purple-100 text-purple-700"

}


function getLabelClass(label){

if(label === "bug"){
return "bg-red-100 text-red-600"
}

if(label === "feature"){
return "bg-blue-100 text-blue-600"
}

if(label === "enhancement"){
return "bg-green-100 text-green-600"
}

return "bg-gray-100 text-gray-600"

}


        const border =
            issue.status === "open"
                ? "border-green-500"
                : "border-purple-500"

        const card = document.createElement("div")

        card.className =
            `bg-white p-4 rounded shadow border-t-4 ${border} cursor-pointer hover:shadow-lg`

        card.innerHTML = `

           <div class="flex justify-between">

        ${issue.status === "open"
                ? "<img src='assets/Open-Status.png' class='w-6'>"
                : "<img src='assets/Closed- Status .png'>"
            }
        
        <div>
        <span class="px-2 py-1 text-xs rounded-full ${getPriorityClass(issue.priority)}">
        ${issue.priority}
        </span>
        </div>
        </div>

        <h2 class="font-bold text-lg">
        ${issue.title}
        </h2>
        
        <p class="text-sm text-gray-600 mt-2">
        ${issue.description.slice(0, 80)}...
        </p>
        
        <div class="flex gap-2 mt-3 flex-wrap">
        
         <p class="${issue.labels?.[0] === "bug"
                ? "bg-[#FECACA] text-red-500"
                : "bg-green-200 text-green-700"
            } px-2 py-1 rounded inline-block">
        ${issue.labels?.[0]}
        </p>  
        </div>
   
        </div>
        <hr>
        <p class="text-xs text-gray-500 mt-2">
        Author: ${issue.author}
        </p>
        
        <p class="text-xs text-gray-400">
        Created: ${issue.createdAt}
        </p>

`

        // card.onclick = () => openModal(issue)

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



function openModal(issue) {

    const modal = document.getElementById("modal")

    modal.classList.remove("hidden")
    modal.classList.add("flex")

    document.getElementById("mTitle").innerText = issue.title
    document.getElementById("mDesc").innerText = issue.description
    document.getElementById("mStatus").innerText = "Status: " + issue.status
    document.getElementById("mAuthor").innerText = "Author: " + issue.author
    document.getElementById("mPriority").innerText = "Priority: " + issue.priority
    document.getElementById("mLabel").innerText = "Label: " + issue.label
    document.getElementById("mDate").innerText = "Created: " + issue.createdAt

}



function closeModal() {

    const modal = document.getElementById("modal")

    modal.classList.add("hidden")
    modal.classList.remove("flex")

}



loadIssues()