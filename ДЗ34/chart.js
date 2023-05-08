function getDrawFunction(chartType) {
  switch (chartType) {
      case "doughnut":
          return drawDoughnutChart;
      case "line":
          return drawLineChart;
      default:
          throw new Error("Неизвестный тип диаграммы");
  }
}


function drawDoughnutChart(data, canvas) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const outerRadius = Math.min(centerX, centerY) * 0.8;
  const innerRadius = outerRadius * 0.5;

  let currentAngle = 0;

  for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const valueFraction = item.value / totalValue;
      const angle = valueFraction * 2 * Math.PI;

      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + angle);
      ctx.arc(centerX, centerY, innerRadius, currentAngle + angle, currentAngle, true);
      ctx.closePath();

      const hue = i * 360 / data.length;
      ctx.fillStyle = `hsla(${hue}, 50%, 50%, 1)`;
      ctx.fill();

      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const labelX = centerX + Math.cos(currentAngle + angle / 2) * innerRadius * 0.5;
      const labelY = centerY + Math.sin(currentAngle + angle / 2) * innerRadius * 0.5;
      ctx.fillText(item.name, labelX, labelY);

      const percent = (valueFraction * 100).toFixed(1) + "%";
      const percentX = centerX + Math.cos(currentAngle + angle / 2) * (innerRadius + outerRadius) * 0.5;
      const percentY = centerY + Math.sin(currentAngle + angle / 2) * (innerRadius + outerRadius) * 0.5;

      ctx.fillStyle = valueFraction > 0.5 ? 'white' : 'black';
      ctx.fillText(percent, percentX, percentY);

      currentAngle += angle;
  }
}

function drawBarChart(data, canvas) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barWidth = canvas.width / (data.length * 2);
  const maxValue = Math.max(...data.map(item => item.value));
  const scaleY = (canvas.height - 50) / maxValue;

  ctx.beginPath();
  ctx.moveTo(50, 0);
  ctx.lineTo(50, canvas.height - 30);
  ctx.lineTo(canvas.width, canvas.height - 30);
  ctx.stroke();

  for (let i = 0; i < data.length; i++) {
      const item = data[i];

      const x = i * 2 * barWidth + 50;
      const y = canvas.height - item.value * scaleY - 30;
      const width = barWidth;
      const height = item.value * scaleY;

      ctx.fillStyle = "rgba(75, 192, 192, 0.2)";
      ctx.fillRect(x, y, width, height);

      ctx.fillStyle = "black";
      ctx.fillText(item.name, x + 5, canvas.height - 20);
      ctx.fillText(item.value, x + 5, y - 5);
  }
}

function drawPieChart(data, canvas) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) * 0.8;

  let currentAngle = 0;

  for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const valueFraction = item.value / totalValue;
      const angle = valueFraction * 2 * Math.PI;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + angle);
      ctx.closePath();

      const hue = i * 360 / data.length;
      ctx.fillStyle = `hsla(${hue}, 50%, 50%, 1)`;
      ctx.fill();

      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const labelX = centerX + Math.cos(currentAngle + angle / 2) * radius * 0.5;
      const labelY = centerY + Math.sin(currentAngle + angle / 2) * radius * 0.5;
      ctx.fillText(item.name, labelX, labelY);

      const percent = (valueFraction * 100).toFixed(1) + "%";
      const percentX = centerX + Math.cos(currentAngle + angle / 2) * radius * 0.75;
      const percentY = centerY + Math.sin(currentAngle + angle / 2) * radius * 0.75;

      ctx.fillStyle = valueFraction > 0.5 ? 'white' : 'black';
      ctx.fillText(percent, percentX, percentY);

      currentAngle += angle;
  }
}






function drawLineChart(data, canvas) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const maxValue = Math.max(...data.map(item => item.value));
  const minValue = Math.min(...data.map(item => item.value));
  const scaleY = (canvas.height - 50) / (maxValue - minValue);
  const scaleX = (canvas.width - 50) / (data.length - 1);

  ctx.beginPath();
  ctx.moveTo(50, 0);
  ctx.lineTo(50, canvas.height - 30);
  ctx.lineTo(canvas.width, canvas.height - 30);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(50, canvas.height - (data[0].value - minValue) * scaleY - 30);

  for (let i = 1; i < data.length; i++) {
      const item = data[i];
      const x = i * scaleX + 50;
      const y = canvas.height - (item.value - minValue) * scaleY - 30;
      ctx.lineTo(x, y);
  }

  ctx.strokeStyle = "rgba(75, 192, 192, 1)";
  ctx.lineWidth = 2;
  ctx.stroke();

  for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const x = i * scaleX + 50;
      const y = canvas.height - (item.value - minValue) * scaleY - 30;

      ctx.fillStyle = "rgba(75, 192, 192, 1)";
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = "black";
      ctx.fillText(item.name, x - 10, canvas.height - 20);
      ctx.fillText(item.value, x - 10, y - 10);
  }
}