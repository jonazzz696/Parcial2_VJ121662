function getCountryInfo() {
    const country = document.getElementById('country').value.trim();

    if (!country) {
        alert('Por favor, ingresa el nombre de un país.');
        return;
    }

    const url = `https://restcountries.com/v3.1/name/${country}?fullText=true`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Verificar si el país fue encontrado
            if (data.status === 404) {
                document.getElementById('country-info').style.display = 'none';
                document.getElementById('error-message').style.display = 'block';
                return;
            }

            // Ocultar mensaje de error y mostrar la información
            document.getElementById('error-message').style.display = 'none';
            const countryData = data[0];

            document.getElementById('country-name').textContent = countryData.name.common;
            document.getElementById('capital').textContent = `Capital: ${countryData.capital ? countryData.capital[0] : 'No disponible'}`;
            document.getElementById('region').textContent = `Región: ${countryData.region}`;
            document.getElementById('population').textContent = `Población: ${countryData.population.toLocaleString()}`;
            document.getElementById('languages').textContent = `Idiomas: ${Object.values(countryData.languages || {}).join(', ')}`;

            // Mostrar la bandera
            document.getElementById('country-flag').src = countryData.flags[0];
            document.getElementById('country-flag').alt = `Bandera de ${countryData.name.common}`;

            // Mostrar la sección con la información del país
            document.getElementById('country-info').style.display = 'block';
        })
        .catch(error => {
            document.getElementById('error-message').style.display = 'block';
            document.getElementById('country-info').style.display = 'none';
            console.error(error);
        });
}