document.addEventListener("DOMContentLoaded", function () {
  // Sample data array, replace this with your actual data
  const mapArrayData = [
    { id: 1, name: "John Doe", position: "Manager", role: "Admin" },
    { id: 2, name: "Jane Doe", position: "Salesman", role: "User" },
    { id: 3, name: "Alice Smith", position: "Engineer", role: "User" },
    { id: 4, name: "Bob Johnson", position: "Developer", role: "Admin" },
    { id: 5, name: "Eva Williams", position: "Designer", role: "User" },
    { id: 6, name: "Chris Brown", position: "Analyst", role: "User" },
    {
      id: 7,
      name: "Olivia White",
      position: "Marketing Specialist",
      role: "User",
    },
    {
      id: 8,
      name: "Daniel Miller",
      position: "Project Manager",
      role: "Admin",
    },
    { id: 9, name: "Sophia Davis", position: "Customer Support", role: "User" },
    { id: 10, name: "Matthew Taylor", position: "HR Manager", role: "Admin" },
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
