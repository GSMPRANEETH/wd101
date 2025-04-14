const today = new Date();
const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

const formatDate = (date) => date.toISOString().split('T')[0];

const dateInput = document.getElementById('dob');
dateInput.min = formatDate(minDate);
dateInput.max = formatDate(maxDate);

const form = document.getElementById('regform');
const tbody = document.querySelector('tbody');
const STORAGE_KEY = 'userEntries';

window.addEventListener('load', () => {
  const entries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  entries.forEach(addEntryToTable);
});

form.addEventListener('submit', (event) => {
  if (!form.checkValidity()) {
    // Let the browser show the standard validation message (like for @ in email)
    return;
  }

  event.preventDefault(); // Prevent only if the form is valid — now we handle submission

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const acpt = document.getElementById('acpt').checked;

  const entry = { name, email, password, dob, acpt };
  const entries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  entries.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));

  addEntryToTable(entry);
  form.reset();
});


function addEntryToTable(entry) {
  const row = document.createElement('tr');
  row.className = 'divide-x divide-gray-300 hover:bg-gray-100 transition';
  row.innerHTML = `
    <td class="px-4 py-2">${entry.name}</td>
    <td class="px-4 py-2">${entry.email}</td>
    <td class="px-4 py-2">${entry.password}</td>
    <td class="px-4 py-2">${entry.dob}</td>
    <td class="px-4 py-2">${entry.acpt === true}</td>
  `;
  tbody.appendChild(row);
}
