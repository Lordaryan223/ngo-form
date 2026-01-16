
const form = document.getElementById("supportForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;
    const message = document.getElementById("message").value.toLowerCase();

    const priority = getPriority(message);
    const summary = generateSummary(message);

    const data = {
      name,
      email,
      role,
      summary,
      priority
    };

    let records = JSON.parse(localStorage.getItem("records")) || [];
    records.push(data);
    localStorage.setItem("records", JSON.stringify(records));

    document.getElementById("response").innerText =
      "Thank you! Your request has been submitted.";

    form.reset();
  });
}

const tableBody = document.getElementById("tableBody");

if (tableBody) {
  const records = JSON.parse(localStorage.getItem("records")) || [];

  let patients = 0;
  let volunteers = 0;

  records.forEach(r => {
    if (r.role === "Patient") patients++;
    if (r.role === "Volunteer") volunteers++;

    const row = `
      <tr>
        <td>${r.name}</td>
        <td>${r.role}</td>
        <td>${r.summary}</td>
        <td>${r.priority}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });

  document.getElementById("totalRequests").innerText =
    "Total: " + records.length;
  document.getElementById("patients").innerText =
    "Patients: " + patients;
  document.getElementById("volunteers").innerText =
    "Volunteers: " + volunteers;
}


function getPriority(message) {
  if (message.includes("emergency")) return "High ";
  if (message.includes("fever") || message.includes("pain")) return "Medium ";
  return "Low ";
}

function generateSummary(message) {
  if (message.includes("fever")) return "Fever related issue";
  if (message.includes("pain")) return "Pain related issue";
  if (message.includes("emergency")) return "Emergency case";
  return "General inquiry";
}