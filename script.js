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
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.getElementById("add-memory").addEventListener("click", () => {
    const title = document.getElementById("event-title").value;
    const date = document.getElementById("event-date").value;
    const description = document.getElementById("event-description").value;
    
    if (title && date && description) {
        const newMemoryRef = database.ref("events").push();
        newMemoryRef.set({ title, date, description });

        // Clear input fields
        document.getElementById("event-title").value = "";
        document.getElementById("event-date").value = "";
        document.getElementById("event-description").value = "";
    }
});

// Load data from Firebase
database.ref("events").on("value", (snapshot) => {
    const timeline = document.getElementById("timeline");
    timeline.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
        const event = childSnapshot.val();
        const eventElement = document.createElement("div");
        eventElement.classList.add("event");
        eventElement.innerHTML = `<strong>${event.title}</strong><br>${event.date}<br>${event.description}`;
        timeline.appendChild(eventElement);
    });
});
