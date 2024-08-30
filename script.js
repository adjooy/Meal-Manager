document.getElementById('mealForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const person = document.getElementById('person').value;
    const date = document.getElementById('date').value;
    const expense = parseFloat(document.getElementById('expense').value);
    const meals = parseInt(document.getElementById('meals').value);

    // Store data
    addRecord(person, expense, meals);

    // Update summary
    updateSummary();
});

let records = [];

function addRecord(person, expense, meals) {
    records.push({ person, expense, meals });
}

function updateSummary() {
    const summaryTable = document.getElementById('summaryTable');
    summaryTable.innerHTML = '';

    const summary = {};

    records.forEach(record => {
        if (!summary[record.person]) {
            summary[record.person] = { totalExpense: 0, totalMeals: 0 };
        }
        summary[record.person].totalExpense += record.expense;
        summary[record.person].totalMeals += record.meals;
    });

    for (const person in summary) {
        const row = document.createElement('tr');
        const totalExpense = summary[person].totalExpense;
        const totalMeals = summary[person].totalMeals;
        const amountOwed = (totalExpense / totalMeals).toFixed(2);

        row.innerHTML = `
            <td>${person}</td>
            <td>${totalExpense.toFixed(2)} Tk</td>
            <td>${totalMeals}</td>
            <td>${amountOwed} Tk</td>
        `;

        summaryTable.appendChild(row);
    }
}
