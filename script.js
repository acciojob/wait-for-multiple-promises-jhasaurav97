//your JS code here. If required.
 const tbody = document.getElementById("output");

// 🔽 INSERT THIS RIGHT AFTER tbody SELECTION
const loadingRow = document.createElement("tr");
loadingRow.setAttribute("id", "loading");
loadingRow.innerHTML = `<td colspan="2">Loading...</td>`;
tbody.appendChild(loadingRow);

// 🔽 Promise generator
const createPromise = (index) => {
  const delay = Math.random() * 2 + 1; // 1 to 3 seconds
  const startTime = performance.now();

  return new Promise((resolve) => {
    setTimeout(() => {
      const endTime = performance.now();
      const timeTaken = (endTime - startTime) / 1000;
      resolve({ name: `Promise ${index}`, time: timeTaken });
    }, delay * 1000);
  });
};

// 🔽 Total execution timer start
const globalStart = performance.now();

// 🔽 Wait for all promises
Promise.all([createPromise(1), createPromise(2), createPromise(3)]).then((results) => {
  const globalEnd = performance.now();
  const totalTime = (globalEnd - globalStart) / 1000;

  // Remove loading row
  tbody.innerHTML = '';

  // Display results
  results.forEach((res) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${res.name}</td><td>${res.time.toFixed(3)}</td>`;
    tbody.appendChild(row);
  });

  // Display total time
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `<td><strong>Total</strong></td><td><strong>${totalTime.toFixed(3)}</strong></td>`;
  tbody.appendChild(totalRow);
});
