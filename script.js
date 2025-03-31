<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Memory Timeline</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: url('https://raw.githubusercontent.com/code-builder791/memory-timeline/main/WhatsApp%20Image%202025-03-31%20at%2014.11.11_43902799.jpg') no-repeat center center fixed;
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .container {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            width: 90%;
            max-width: 400px;
            text-align: center;
        }

        h1 {
            font-size: 24px;
            margin-bottom: 15px;
            font-family: 'Brush Script MT', cursive;
        }

        input, textarea, button {
            width: 100%;
            margin: 10px 0;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            font-size: 16px;
        }

        button {
            background: #FF6B6B;
            color: white;
            border: none;
            cursor: pointer;
            transition: background 0.3s;
        }

        button:hover {
            background: #E63946;
        }

        /* Timeline Events */
        #timeline {
            margin-top: 20px;
        }
        .event {
            background: white;
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        }
    </style>
    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js"></script>
</head>
<body>
    <div class="container">
        <h1>Chiku ❤️ Krishu</h1>
        <input id="event-title" type="text" placeholder="Memory Title">
        <input id="event-date" type="date">
        <textarea id="event-description" placeholder="Description"></textarea>
        <button id="add-memory">Add Memory</button>
        <div id="timeline"></div>
    </div>

    <script>
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
        const app = firebase.initializeApp(firebaseConfig);
        const database = firebase.database();
        
        document.getElementById("add-memory").addEventListener("click", () => {
            const title = document.getElementById("event-title").value;
            const date = document.getElementById("event-date").value;
            const description = document.getElementById("event-description").value;
            
            if (title && date && description) {
                const newMemoryRef = database.ref("events").push();
                newMemoryRef.set({ title, date, description });
                document.getElementById("event-title").value = "";
                document.getElementById("event-date").value = "";
                document.getElementById("event-description").value = "";
            }
        });
        
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
    </script>
</body>
</html>
