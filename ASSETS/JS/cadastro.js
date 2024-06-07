document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const trip = {
            nome: form.nome.value,
            data: form.data.value,
            local: form.local.value,
            duracao: form.duracao.value,
            descricao: form.descricao.value
        };
        saveTrip(trip);
        form.reset();
    });

    function saveTrip(trip) {
        const trips = getTrips();
        trips.push(trip);
        localStorage.setItem('trips', JSON.stringify(trips));
    }

    function getTrips() {
        return JSON.parse(localStorage.getItem('trips')) || [];
    }
});
