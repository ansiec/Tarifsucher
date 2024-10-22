import { useState, useEffect, useRef } from "react";
import {
  getCitiesOfZip,
  getRates,
  getStreetsOfZipCityCountry,
} from "../utils/GetRequest.jsx";
import { toast } from "react-toastify";
import InputFieldText from "./InputFieldText.jsx";
import InputFieldSelect from "./InputFieldSelect.jsx";
import RateListings from "./RateListings.jsx";

const Tarifsucher = () => {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true);
  const [showListings, setShowListings] = useState(true);
  const [form, setForm] = useState({
    country: 81,
    zip: "",
    city: "",
    street: "",
    houseNumber: "",
    type: "private",
    branch: "electric",
    consum: 0,
    rateReadingType: 0,
    rateType: 0,
  });
  const fetchCount = useRef(0);
  const changeCount = useRef(0);
  const [streetList, setStreetList] = useState([]);

  const handleChange = (e) => {
    updateForm(e);
    //updateRatesAutomatically(); cleaner but didn't work with timeout
  };

  const updateForm = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const milisecondsAfterLastChange = 2500;
    const oldChangeCount = ++changeCount.current;
    const timeoutId = setTimeout(() => {
      if (isAllRequiredHasValue() && oldChangeCount === changeCount.current) {
        updateRates();
      }
    }, milisecondsAfterLastChange);

    return () => clearTimeout(timeoutId);
  }, [form]);

  const isAllRequiredHasValue = () => {
    return (
      form.zip.length > 3 &&
      form.city.length > 1 &&
      form.street.length > 1 &&
      form.houseNumber.length > 0 &&
      form.consum > 10
    );
  };

  useEffect(() => {
    const fetchCities = async () => {
      const oldZip = form.zip;
      const cities = await getCitiesOfZip(oldZip);
      if (cities.result && oldZip === form.zip && form.zip.length > 3) {
        setForm((prev) => ({
          ...prev,
          city: cities.result[0].city,
        }));
      }
    };

    fetchCities();

    return () => {};
  }, [form.zip]);

  useEffect(() => {
    const fetchStreets = async () => {
      const oldZip = form.zip;
      const oldCity = form.city;
      const oldCountry = form.country;
      const streets = await getStreetsOfZipCityCountry(
        oldZip,
        oldCity,
        oldCountry
      );

      //streets.result checks if there was an error
      if (
        streets.result &&
        oldZip === form.zip &&
        oldCity === form.city &&
        oldCountry === form.country
      ) {
        console.log("update Streets");
        console.log(streets.result);
        setStreetList(streets);
      }
    };

    fetchStreets();

    return () => {};
  }, [form.zip, form.city]);

  const submitForm = (e) => {
    e.preventDefault();

    changeCount.current++;
    updateRates();
  };

  const updateRates = async () => {
    const oldFetchCount = ++fetchCount.current;
    setLoading(true);
    try {
      const response = await getRates(form);
      if (response.error) {
        showError(response);
      } else if (oldFetchCount === fetchCount.current) {
        showUpdate(response.result);
      } else {
        //ein neueres Update ist unterwegs
      }
    } catch (error) {
      sendToastError("Fehler beim Laden der Ergebnisse");
    } finally {
      setLoading(false);
    }
  };

  const showError = (error) => {
    setShowListings(false);
    sendToastError(error.message);
  };

  const showUpdate = (responseResult) => {
    setResult(responseResult);
    setShowListings(true);
  };

  const sendToastError = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const optionsType = [
    { value: "private", label: "Privatkunde" },
    { value: "company", label: "Gewerbekunde" },
  ];

  const optionsCountry = [
    { value: "81", label: "Deutschland" },
    { value: "14", label: "Österreich" },
  ];

  const optionsRateReadingType = [
    { value: "0", label: "Normal" },
    { value: "1", label: "getrennte Messung" },
    { value: "2", label: "gemeinsame Messung" },
  ];

  const optionsRateType = [
    { value: "0", label: "Normal" },
    { value: "1", label: "Wärmepumpe" },
    { value: "2", label: "Wärmespeicher" },
    { value: "3", label: "Autstrom / Ladestrom" },
  ];

  const optionsBranch = [
    { value: "electric", label: "Strom" },
    { value: "gas", label: "Gas" },
  ];

  return (
    <>
      <section className="bg-gray-100 dark:bg-gray-700">
        <div className="container m-auto max-w-2xl py-0">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={submitForm}>
              <h2 className="text-3xl text-center font-semibold mb-6">
                Tarife suchen
              </h2>

              <h3 className="text-2xl mb-5">Adresse</h3>
              <InputFieldSelect
                options={optionsCountry}
                id={"country"}
                title={"Land"}
                onChange={handleChange}
                value={form.country}
              ></InputFieldSelect>

              <div className="flex items-stretch">
                <InputFieldText
                  id={"zip"}
                  placeholder={"0000"}
                  title={"PLZ"}
                  onChange={handleChange}
                  value={form.zip}
                ></InputFieldText>
                <InputFieldText
                  id={"city"}
                  placeholder={"Berlin"}
                  title={"Stadt"}
                  onChange={handleChange}
                  value={form.city}
                ></InputFieldText>
              </div>

              <div className="flex items-stretch">
                <InputFieldText
                  id={"street"}
                  placeholder={"Adlergasse"}
                  title={"Straße"}
                  onChange={handleChange}
                  value={form.street}
                ></InputFieldText>

                <InputFieldText
                  id={"houseNumber"}
                  placeholder={"26c"}
                  title={"Hausnummer"}
                  onChange={handleChange}
                  value={form.houseNumber}
                ></InputFieldText>
              </div>

              <InputFieldSelect
                options={optionsType}
                id={"type"}
                title={"Kundentyp"}
                onChange={handleChange}
                value={form.type}
              ></InputFieldSelect>

              <h3 className="text-2xl mb-5">Verbrauch</h3>
              <InputFieldSelect
                options={optionsBranch}
                id={"branch"}
                title={"Art"}
                onChange={handleChange}
                value={form.branch}
              ></InputFieldSelect>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Jahresverbrauch in kW/h
                </label>
                <input
                  type="number"
                  min="1"
                  id="consum"
                  name="consum"
                  className="border rounded py-2 px-3"
                  placeholder="2500"
                  required
                  value={form.consum}
                  onChange={handleChange}
                ></input>
              </div>

              <div
                className={
                  form.branch === "electric" ? "flex items-stretch" : "hidden"
                }
              >
                <InputFieldSelect
                  options={optionsRateReadingType}
                  id={"rateReadingType"}
                  title={"Ablesetyp"}
                  onChange={handleChange}
                  value={form.rateReadingType}
                ></InputFieldSelect>

                <InputFieldSelect
                  options={optionsRateType}
                  id={"rateType"}
                  title={"Tariftyp"}
                  onChange={handleChange}
                  value={form.rateType}
                ></InputFieldSelect>
              </div>

              <div>
                <button
                  className="bg-indigo-600 dark:bg-gray-700 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Tarife finden
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <RateListings
        loading={loading}
        showListings={showListings}
        result={result}
      ></RateListings>
    </>
  );
};

export default Tarifsucher;
