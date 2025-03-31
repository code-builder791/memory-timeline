// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAW6z...",
    authDomain: "memory-timeline-7edfa.firebaseapp.com",
    databaseURL: "https://memory-timeline-7edfa-default-rtdb.firebaseio.com",
    projectId: "memory-timeline-7edfa",
    storageBucket: "memory-timeline-7edfa.appspot.com",
    messagingSenderId: "107878206912",
    appId: "1:107878206912:web:759b88645cf45b1eff4c25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to Add Memory
document.getElementById("add-memory").addEventListener("click", () => {
    const title = document.getElementById("event-title").value;
    const date = document.getElementById("event-date").value;
    const description = document.getElementById("event-description").value;

    if (title && date && description) {
        const newMemoryRef = push(ref(database, "events"));
        set(newMemoryRef, { title, date, description });

        // Clear input fields
        document.getElementById("event-title").value = "";
        document.getElementById("event-date").value = "";
        document.getElementById("event-description").value = "";

        alert("Memory Added Successfully!");
    } else {
        alert("Please fill all fields!");
    }
});

// Function to Display Memories
onValue(ref(database, "events"), (snapshot) => {
    const timeline = document.getElementById("timeline");
    timeline.innerHTML = ""; // Clear previous events

    snapshot.forEach((childSnapshot) => {
        const event = childSnapshot.val();
        const eventElement = document.createElement("div");
        eventElement.classList.add("event");
        eventElement.style.border = "1px solid #ccc";
        eventElement.style.padding = "10px";
        eventElement.style.margin = "10px 0";
        eventElement.style.borderRadius = "5px";
        eventElement.style.background = "#f9f9f9";
        eventElement.innerHTML = `<strong>${event.title}</strong><br>${event.date}<br>${event.description}`;
        timeline.appendChild(eventElement);
    });
});
