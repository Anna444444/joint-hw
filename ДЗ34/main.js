document.addEventListener("DOMContentLoaded", function () {
  const dataTable = document.getElementById("data-table");
  const addDataForm = document.getElementById("add-data-form");
  const chartTypeSelect = document.getElementById("chart-type");
  const chartCanvas = document.getElementById("chart-canvas");

  let chartData = [];

  function updateChart() {
      const drawFunction = getDrawFunction(chartTypeSelect.value);
      drawFunction(chartData, chartCanvas);
  }

  function addDataRow(name, value) {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      const valueCell = document.createElement("td");

      nameCell.textContent = name;
      valueCell.textContent = value;

      row.appendChild(nameCell);
      row.appendChild(valueCell);
      dataTable.appendChild(row);

      chartData.push({ name, value: parseFloat(value) });
      updateChart();
  }

  addDataForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = addDataForm.elements["name"].value;
      const value = addDataForm.elements["value"].value;

      addDataRow(name, value);
      addDataForm.reset();
  });

  chartTypeSelect.addEventListener("change", updateChart);
});
