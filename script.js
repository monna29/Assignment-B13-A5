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

        const border =
            issue.status === "open"
                ? "border-green-500"
                : "border-purple-500"

        const card = document.createElement("div")

        card.className =
            `bg-white p-4 rounded shadow border-t-4 ${border} cursor-pointer hover:shadow-lg`

        card.innerHTML = `

<h2 class="font-bold text-lg">
${issue.title}
</h2>

<p class="text-sm text-gray-600 mt-2">
${issue.description.slice(0, 80)}...
</p>

<div class="text-xs text-gray-500 mt-3 space-y-1">

<p>Status: ${issue.status}</p>
<p>Author: ${issue.author}</p>
<p>Priority: ${issue.priority}</p>
<p>Label: ${issue.label}</p>
<p>Created: ${issue.createdAt}</p>

</div>

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