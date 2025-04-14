// Set the allowed date range for the Date of Birth field
const today = new Date();
const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
const formatDate = date => date.toISOString().split('T')[0];

const dateInput = document.getElementById('dob');
dateInput.min = formatDate(minDate);
dateInput.max = formatDate(maxDate);

const form = document.getElementById('regform');
const tbody = document.querySelector('tbody');
const STORAGE_KEY = 'userEntries';

// Load existing entries from localStorage on page load
window.addEventListener('load', () => {
  const storedEntries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  storedEntries.forEach(addEntryToTable);
});

// Custom email validation function that returns a boolean
function validateEmail(element) {
  // Check typeMismatch and patternMismatch in the browser's native validity
  if (element.validity.typeMismatch || element.validity.patternMismatch) {
    element.setCustomValidity("The email is not valid!");
    element.reportValidity();
    return false;
  } else {
    element.setCustomValidity(""); // Clear any previous error message
    return true;
  }
}

// Form submission event handler
form.addEventListener('submit', event => {
  event.preventDefault();

  // Perform native form validation first
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Now perform our custom email validation
  const emailEl = document.getElementById('email');
  if (!validateEmail(emailEl)) {
    // Stop submission if email is invalid
    return;
  }

  // If the form and email are valid, gather field values
  const name = document.getElementById('name').value.trim();
  const email = emailEl.value.trim();
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const acpt = document.getElementById('acpt').checked;

  // Create entry object
  const entry = { name, email, password, dob, acpt };

  // Retrieve stored entries, add the new entry, and update localStorage
  const storedEntries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  storedEntries.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storedEntries));

  // Add the new entry to the table
  addEntryToTable(entry);
  form.reset();
});

// Function to add an entry row to the table
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

// Clear stored entries and reload page when the Clear All Entries button is clicked
document.getElementById('clearData').addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
});
