const loadResponsesButton = document.getElementById("load-responses");
const adminTokenInput = document.getElementById("admin-token");
const responsesTable = document.getElementById("responses-table");
const tableBody = responsesTable.querySelector("tbody");
const adminError = document.getElementById("admin-error");

loadResponsesButton.addEventListener("click", async () => {
  const token = adminTokenInput.value.trim();
  if (!token) {
    showError("Le token est requis.");
    return;
  }
  try {
    const res = await fetch("/api/admin/responses", {
      headers: {
        "x-admin-token": token,
      },
    });
    if (!res.ok) {
      throw new Error("Non autorisé");
    }
    const data = await res.json();
    renderTable(data);
  } catch (error) {
    showError("Impossible de charger les réponses. Vérifie le token.");
  }
});

function showError(message) {
  adminError.textContent = message;
  adminError.classList.remove("hidden");
  responsesTable.classList.add("hidden");
}

function renderTable(data) {
  adminError.classList.add("hidden");
  tableBody.innerHTML = "";
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.answer}</td>
      <td>${item.activity}</td>
      <td>${item.time}</td>
      <td>${item.date}</td>
      <td>${item.food}</td>
      <td>${new Date(item.createdAt).toLocaleString("fr-FR")}</td>
    `;
    tableBody.appendChild(row);
  });
  responsesTable.classList.remove("hidden");
}
