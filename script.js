
// Load saved events from localStorage
let events = JSON.parse(localStorage.getItem('events')) || [];

document.getElementById('event-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('event-title').value;
  const date = document.getElementById('event-date').value;
  const description = document.getElementById('event-description').value;
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

  document.getElementById('event-form').reset();
});

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
