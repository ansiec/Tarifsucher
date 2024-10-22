import axios from "axios";

const baseURL = "http://localhost:8000/";

async function getRequest(path, obj) {
  const options = {
    method: "GET",
    url: baseURL + path,
    params: { ...obj },
  };

  const response = await axios.request(options).catch(function (error) {
    console.log("getRequest error: ");
    console.log(error.toJSON());
  });

  const data = await response.data;
  return data;
}

export async function getRates(obj) {
  return await getRequest("rates/", obj);
}

export async function getCitiesOfZip(zip) {
  return await getRequest("cities/" + zip);
}

export async function getStreetsOfZipCityCountry(zip, city, country) {
  return await getRequest("streets/" + zip + "/" + city, country);
}
