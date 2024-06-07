document.addEventListener('DOMContentLoaded', () => {
    const results = document.getElementById('results');
    const search = document.getElementById('search');

    search.addEventListener('input', () => {
        const query = search.value.toLowerCase();
        const trips = getTrips();
        displayTrips(trips.filter(trip => trip.nome.toLowerCase().includes(query)));
    });

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    

    displayTrips(getTrips());

    function displayTrips(trips) {
        results.innerHTML = '';
        trips.forEach((trip, index) => {
            const li = document.createElement('li');
            li.textContent = `${trip.nome} - ${formatDate(trip.data)} - ${trip.local} - ${trip.duracao} dias - ${trip.descricao}`;
            const deleteButton = document.createElement('button');
            deleteButton.style.marginLeft = '5px';
            deleteButton.textContent = 'Concluída';
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
        incrementCompletedTrips();
        displayTrips(trips);
    }

    function incrementCompletedTrips() {
        let completedTrips = parseInt(localStorage.getItem('completedTrips')) || 0;
        completedTrips++;
        localStorage.setItem('completedTrips', completedTrips);
    }

    function getTrips() {
        return JSON.parse(localStorage.getItem('trips')) || [];
    }
});