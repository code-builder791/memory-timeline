<<<<<<< HEAD

// Load saved events from localStorage
let events = JSON.parse(localStorage.getItem('events')) || [];

=======
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

// Handle event form submission
>>>>>>> ac0653e (Updated memory timeline with Firebase integration)
document.getElementById('event-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('event-title').value;
  const date = document.getElementById('event-date').value;
  const description = document.getElementById('event-description').value;
<<<<<<< HEAD
  const file = document.getElementById('event-image').files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newEvent = {
        title,
        date,
        description,
        image: e.target.result,
      };

      events.push(newEvent);
      saveEvents();
      renderEvents();
    };
    reader.readAsDataURL(file);
  }
=======

  const newEventRef = database.ref('events').push();
  newEventRef.set({ title, date, description });
>>>>>>> ac0653e (Updated memory timeline with Firebase integration)

  document.getElementById('event-form').reset();
});

<<<<<<< HEAD
function saveEvents() {
  localStorage.setItem('events', JSON.stringify(events));
}

function renderEvents() {
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = '';

  events.forEach((event, index) => {
    const eventElement = document.createElement('div');
    eventElement.classList.add('event');
    eventElement.innerHTML = `
      <img src="${event.image}" alt="${event.title}">
      <div>
        <div class="event-date">${event.date}</div>
        <div class="event-title">${event.title}</div>
      </div>
    `;

    eventElement.addEventListener('click', () => openDetails(index));
    timeline.appendChild(eventElement);
  });
}

function openDetails(index) {
  const event = events[index];
  document.getElementById('modal-title').innerText = event.title;
  document.getElementById('modal-description').innerText = event.description;
  document.getElementById('modal-image').src = event.image;

  document.getElementById('event-details').style.display = 'flex';
}

function closeDetails() {
  document.getElementById('event-details').style.display = 'none';
}

renderEvents();
=======
// Fetch events from Firebase
database.ref('events').on('value', (snapshot) => {
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = '';

  snapshot.forEach((childSnapshot) => {
    const event = childSnapshot.val();
    const eventElement = document.createElement('div');
    eventElement.classList.add('event');
    eventElement.innerHTML = `<strong>${event.title}</strong><br>${event.date}<br>${event.description}`;
    timeline.appendChild(eventElement);
  });
});
>>>>>>> ac0653e (Updated memory timeline with Firebase integration)
