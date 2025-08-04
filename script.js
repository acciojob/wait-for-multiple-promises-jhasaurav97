//your JS code here. If required.
 const tbody = document.getElementById("output");

  // Function to create a promise with random delay between 1 and 3 seconds
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

  // Start time to calculate total
  const globalStart = performance.now();

  Promise.all([createPromise(1), createPromise(2), createPromise(3)]).then((results) => {
    const globalEnd = performance.now();
    const totalTime = (globalEnd - globalStart) / 1000;

    // Clear loading row
    tbody.innerHTML = '';

    // Add each promise result
    results.forEach((res) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${res.name}</td><td>${res.time.toFixed(3)}</td>`;
      tbody.appendChild(row);
    });

    // Add total row
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `<td><strong>Total</strong></td><td><strong>${totalTime.toFixed(3)}</strong></td>`;
    tbody.appendChild(totalRow);
  });