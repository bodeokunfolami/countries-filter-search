const tBody = document.getElementById('table-body');
const searchInput = document.getElementById('search-input');


let countries = [];


const showCountries = (data) => {
    tBody.innerHTML = "";
    data.forEach((country) => {
        const tr = document.createElement('tr');

        const currency = country.currencies[0] || "";
        const callingCode = country.callingCodes[0] || "";
        tr.innerHTML = `<td><img src="https://www.countryflags.io/${country.alpha2Code}/flat/24.png"  /></td>
                        <td>${country.alpha3Code}</td>
                        <td>${country.name}</td>
                        <td>${country.capital}</td>
                        <td>${country.region}</td>
                        <td>${currency}</td>
                        <td>${callingCode}</td>`;
        tBody.appendChild(tr);

    })
}

const getCountries = async () => {
    const config = {
        method: "GET",
        headers: {
            "Conten-Type": "application/json",
            "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
            "x-rapidapi-key": "a42a02adb6msh11cf7226da59c24p1ce699jsn0302202ba642"
        }
    }
    const response = await fetch("https://restcountries-v1.p.rapidapi.com/all", config)
    const data = await response.json();
    countries = data;
    showCountries(countries);
}

const searchCountries = (e) => {
    let search = e.target.value.trim().toLowerCase();
    let filteredCountries = countries.filter(country => {
        return country.name.toLowerCase().indexOf(search) !== -1 ||
            country.capital.toLowerCase().indexOf(search) !== -1
    });
    showCountries(filteredCountries);
}

searchInput.addEventListener('keyup', searchCountries);
window.onload = () => getCountries();