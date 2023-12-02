import * as fs from 'fs';
document.addEventListener("DOMContentLoaded", function () {
  // Sample data array, replace this with your actual data

  // read files from './Attendance/Attendance_28-11-2023.csv' and display it as an array.

  // const { warn } = require('console');

  const path = './Attendance/Attendance_02-12-2023.csv';

  var readData;

  fs.readFile(path, 'utf8', (err, data) => {
    if (err) throw err;
    readData = data;

    // console.log(readData.split('\n'));

    // read the data and only allow the strings that have a comma in them.
    var arr = readData.split('\n');
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].includes(',')) {
        newArr.push(arr[i]);
      }
    }


    finalArr = [];

    for (var i = 0; i < newArr.length; i++) {
      tempData = newArr[i].split(",");
      tempObj = {
        name: tempData[0].replaceAll('\r', ''),
        age:tempData[1].replaceAll('\r', ''),
        job:tempData[2].replaceAll('\r', ''),
        time: tempData[3].replaceAll('\r', '')

      }
      finalArr.push(tempObj);
    }

    console.log(finalArr);

  });
  
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
