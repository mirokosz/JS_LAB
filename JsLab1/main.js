function calculate() {
  var value1 = parseFloat(document.getElementById("value1").value);
  var value2 = parseFloat(document.getElementById("value2").value);
  var value3 = parseFloat(document.getElementById("value3").value);
  var value4 = parseFloat(document.getElementById("value4").value);

  var sum = value1 + value2 + value3 + value4;
  var average = sum / 4;
  var min = Math.min(value1, value2, value3, value4);
  var max = Math.max(value1, value2, value3, value4);

  var resultHTML = "Suma: " + sum + "<br>";
  resultHTML += "Średnia: " + average + "<br>";
  resultHTML += "Minimum: " + min + "<br>";
  resultHTML += "Maksimum: " + max + "<br>";

  document.getElementById("result").innerHTML = resultHTML;
}