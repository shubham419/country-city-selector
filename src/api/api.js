const BACKEND_ENDPOINT = "https://crio-location-selector.onrender.com";

export const fetchCountries = async () => {
  try {
    const responce = await fetch(`${BACKEND_ENDPOINT}/countries`);
    const data = await responce.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const fetchStates = async (countryName) => {
  try {
    const responce = await fetch(
      `${BACKEND_ENDPOINT}/country=${countryName}/states`
    );
    const data = await responce.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const fetchCities = async (countryName, stateName) => {
  try {
    const responce = await fetch(
      `${BACKEND_ENDPOINT}/country=${countryName}/state=${stateName}/cities`
    );
    const data = await responce.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
