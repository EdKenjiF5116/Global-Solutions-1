document.addEventListener('DOMContentLoaded', () => {
    const report = document.getElementById('report');

    generateReport();

    function generateReport() {
        const trips = getTrips();
        const totalTrips = trips.length;
        const totalDuration = trips.reduce((sum, trip) => sum + parseInt(trip.duracao), 0);
        
        const captains = new Set(trips.map(trip => trip.nome));
        const uniqueCaptains = captains.size;

        report.innerHTML = `
            <p>Total de Expedições: ${totalTrips}</p>
            <p>Duração Total: ${totalDuration} dias</p>
            <p>Número de Organizadores Diferentes: ${uniqueCaptains}</p>
        `;
    }

    function getTrips() {
        return JSON.parse(localStorage.getItem('trips')) || [];
    }
});
