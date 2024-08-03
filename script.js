document.addEventListener('DOMContentLoaded', () => {
    const subjects = ['Inglês', 'Português', 'Ciências', 'Matemática', 'Geografia', 'História'];
    const tbody = document.getElementById('subject-entries');

    // Adicionar linhas para cada matéria
    subjects.forEach(subject => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${subject}</td>
            <td><input type="number" step="0.01" id="${subject}_ap1"></td>
            <td><input type="number" step="0.01" id="${subject}_ap2"></td>
            <td><input type="number" step="0.01" id="${subject}_ap3"></td>
            <td><input type="number" step="0.01" id="${subject}_ap4"></td>
        `;
        
        tbody.appendChild(row);
    });
});

function calculateAverages() {
    const gipValue = parseFloat(document.getElementById('gip').value);
    const subjects = ['Inglês', 'Português', 'Ciências', 'Matemática', 'Geografia', 'História'];
    const resultsDiv = document.getElementById('results');
    let resultsHTML = '';

    subjects.forEach(subject => {
        const notes = [
            parseFloat(document.getElementById(`${subject}_ap1`).value) || 0,
            parseFloat(document.getElementById(`${subject}_ap2`).value) || 0,
            parseFloat(document.getElementById(`${subject}_ap3`).value) || 0,
            parseFloat(document.getElementById(`${subject}_ap4`).value) || 0
        ];

        if (notes.some(note => isNaN(note))) {
            resultsHTML += `<p>${subject}: Por favor, insira todas as notas corretamente.</p>`;
            return;
        }

        // Calcular a média das notas e garantir que não exceda 10
        const average = Math.min((notes.reduce((a, b) => a + b, 0) / notes.length + gipValue), 10);
        const averageWeighted = average * 0.4;
        const neededFor6 = Math.max(0, (6 - averageWeighted) / 0.6);
        const neededFor8 = Math.max(0, (8 - averageWeighted) / 0.6);

        resultsHTML += `
            <p>${subject}: Média de AP das 4 notas: ${average.toFixed(2)}<br>
            Você precisa de ${neededFor6.toFixed(2)} pontos na AE para passar com média 6<br>
            Você precisa de ${neededFor8.toFixed(2)} pontos na AE para pegar Alamar.</p>
        `;
    });

    resultsDiv.innerHTML = resultsHTML;
}
