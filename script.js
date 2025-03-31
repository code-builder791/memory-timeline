// Function to Add Memory
document.getElementById("memory-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("event-title").value;
    const date = document.getElementById("event-date").value;
    const description = document.getElementById("event-description").value;

    if (title && date && description) {
        fetch("https://script.google.com/macros/s/AKfycbyC-NAD8HMoDm4koTt3gnDFuY5J6AjAYqvBJC40RxgEtaLmKX7FfsZSdQU_M_eMrfFe/exec", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "add", title, date, description })
        })
        .then(response => response.json())
        .then(data => {
            alert("Memory Added Successfully!");
            document.getElementById("memory-form").reset();
            fetchMemories(); // Refresh the timeline
        })
        .catch(error => console.error("Error:", error));
    } else {
        alert("Please fill all fields!");
    }
});

// Function to Fetch and Display Memories
function fetchMemories() {
    fetch("https://script.google.com/macros/s/AKfycbyC-NAD8HMoDm4koTt3gnDFuY5J6AjAYqvBJC40RxgEtaLmKX7FfsZSdQU_M_eMrfFe/exec?action=get")
        .then(response => response.json())
        .then(data => {
            const timeline = document.getElementById("timeline");
            timeline.innerHTML = "";
            data.forEach(event => {
                const eventElement = document.createElement("div");
                eventElement.classList.add("event");
                eventElement.innerHTML = `<strong>${event.title}</strong><br>${event.date}<br>${event.description}`;
                eventElement.addEventListener('click', () => openModal(event));
                timeline.appendChild(eventElement);
            });
        })
        .catch(error => console.error("Error:", error));
}

// Function to Open Modal
function openModal(event) {
    document.getElementById("modal-title").textContent = event.title;
    document.getElementById("modal-date").textContent = event.date;
    document.getElementById("modal-description").textContent = event.description;

    document.getElementById("modal").style.display = "flex";
}

// Function to Close Modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Load Memories on Page Load
document.addEventListener("DOMContentLoaded", fetchMemories);

