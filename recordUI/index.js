import { data } from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("tableBody");
  const searchInput = document.getElementById("searchInput");

  // Function to render table rows based on the search input
  function renderTable() {
    const searchTerm = searchInput.value.toLowerCase();

    // Clear existing rows
    tableBody.innerHTML = "";

    // Filter data based on the search term
    const filteredData = data.filter((rowData) =>
      Object.values(rowData).some((value) =>
        value.toString().toLowerCase().includes(searchTerm)
      )
    );

    // Populate table rows with index as ID
    filteredData.forEach((rowData, index) => {
      const row = document.createElement("tr");

      // Add ID column
      const idCell = document.createElement("td");
      idCell.textContent = index + 1;
      row.appendChild(idCell);

      // Add other columns
      Object.values(rowData).forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });

      tableBody.appendChild(row);
    });
  }

  // Initial rendering
  renderTable();

  // Add event listener for the search input
  searchInput.addEventListener("input", renderTable);
});
