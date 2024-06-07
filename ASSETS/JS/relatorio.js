document.addEventListener('DOMContentLoaded', () => {
    const report = document.getElementById('report');

    generateReport();

    function generateReport() {
        const trips = getTrips();
        const totalTrips = trips.length;
        const totalDuration = trips.reduce((sum, trip) => sum + parseInt(trip.duracao), 0);

        report.innerHTML = `
            <p>Total de Viagens: ${totalTrips}</p>
            <p>Duração Total: ${totalDuration} dias</p>
        `;
    }

    function getTrips() {
        return JSON.parse(localStorage.getItem('trips')) || [];
    }
});
