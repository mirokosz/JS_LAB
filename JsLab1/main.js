document.getElementById('calculate').addEventListener('click', function() {

  const value1 = parseFloat(document.getElementById('value1').value);
  const value2 = parseFloat(document.getElementById('value2').value);
  const value3 = parseFloat(document.getElementById('value3').value);
  const value4 = parseFloat(document.getElementById('value4').value);

  // Tablica wartości
  const values = [value1, value2, value3, value4];

  // Obliczenia
  const sum = values.reduce((acc, val) => acc + val, 0);
  const average = sum / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);

  // Wyświetlanie wyników
  document.getElementById('sum').textContent = sum;
  document.getElementById('average').textContent = average;
  document.getElementById('min').textContent = min;
  document.getElementById('max').textContent = max;
});