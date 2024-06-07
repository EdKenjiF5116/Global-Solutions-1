document.addEventListener('DOMContentLoaded', () => {
    const results = document.getElementById('results');
    const search = document.getElementById('search');

    search.addEventListener('input', () => {
        const query = search.value.toLowerCase();
        const trips = getTrips();
        displayTrips(trips.filter(trip => trip.nome.toLowerCase().includes(query)));
    });

    displayTrips(getTrips());

    function displayTrips(trips) {
        results.innerHTML = '';
        trips.forEach((trip, index) => {
            const li = document.createElement('li');
            li.textContent = `${trip.nome} - ${trip.data} - ${trip.local} - ${trip.duracao} dias - ${trip.descricao}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.addEventListener('click', () => {
                deleteTrip(index);
            });
            li.appendChild(deleteButton);
            results.appendChild(li);
        });
    }

    function deleteTrip(index) {
        const trips = getTrips();
        trips.splice(index, 1);
        localStorage.setItem('trips', JSON.stringify(trips));
        displayTrips(trips);
    }

    function getTrips() {
        return JSON.parse(localStorage.getItem('trips')) || [];
    }
});
