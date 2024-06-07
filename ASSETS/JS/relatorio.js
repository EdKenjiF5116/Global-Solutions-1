document.addEventListener('DOMContentLoaded', () => {
    const report = document.getElementById('report');

    generateReport();

    function generateReport() {
        const trips = getTrips();
        const totalTrips = trips.length;
        const totalDuration = trips.reduce((sum, trip) => sum + parseInt(trip.duracao), 0);
        const captains = new Set(trips.map(trip => trip.nome));
        const uniqueCaptains = captains.size;
        const completedTrips = parseInt(localStorage.getItem('completedTrips')) || 0;

        report.innerHTML = `
            <p>Total de Expedições ativas: ${totalTrips}</p>
            <p>Duração Total das Expedições Ativas: ${totalDuration} dias</p>
            <p>Número de Organizadores Diferentes das Expedições Ativas: ${uniqueCaptains}</p>
            <p>Expedições Concluídas: ${completedTrips}</p>
        `;
    }

    function getTrips() {
        return JSON.parse(localStorage.getItem('trips')) || [];
    }
});
