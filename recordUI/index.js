document.addEventListener("DOMContentLoaded", function () {
  // Sample data array, replace this with your actual data
  const mapArrayData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Doe", email: "jane@example.com", role: "User" },
    // Add more data as needed
  ];

  const tableBody = document.getElementById("tableBody");
  const searchInput = document.getElementById("searchInput");

  // Function to render table rows based on the search input
  function renderTable() {
    const searchTerm = searchInput.value.toLowerCase();

    // Clear existing rows
    tableBody.innerHTML = "";

    // Filter data based on the search term
    const filteredData = mapArrayData.filter((data) =>
      Object.values(data).some((value) =>
        value.toString().toLowerCase().includes(searchTerm)
      )
    );

    // Populate table rows
    filteredData.forEach((data) => {
      const row = document.createElement("tr");
      Object.values(data).forEach((value) => {
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
