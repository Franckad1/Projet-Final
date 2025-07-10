import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dbProvider from "../../Providers/dbProvider";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { City } from "country-state-city";
import countries from "i18n-iso-countries";
import fr from "i18n-iso-countries/langs/fr.json";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../contexts/auth";

// Enregistrement du support de la langue française pour la librairie des pays
countries.registerLocale(fr);

const Form = () => {
  // Déclaration des états locaux du formulaire
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState("");
  const [available, setAvailable] = useState(true);
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams(); // Récupération de l’ID dans l’URL
  const { userLoggedIn } = useAuth(); // Vérifie si l’utilisateur est connecté
  const navigate = useNavigate(); // Pour rediriger après soumission

  // Remplissage de la liste des pays au chargement initial
  useEffect(() => {
    const allCountries = Object.entries(
      countries.getNames("fr", { select: "official" })
    ).map(([code, name]) => ({
      value: code,
      label: name,
    }));
    setCountryOptions(allCountries);
  }, []);

  // Si un ID est présent, on récupère les données correspondantes à modifier
  useEffect(() => {
    const getAllData = async () => {
      const list = await dbProvider.getAllData("events");

      // Recherche de l’événement à modifier, sinon données par défaut
      const event = list.reduce(
        (result, value) => {
          if (id === value.id) result = value;
          return result;
        },
        {
          id: 0,
          data: {
            date: new Date(),
            ville: "",
            pays: "",
            lieux: "",
            disponibilite: "available",
          },
        }
      );

      // Préparation des valeurs pré-remplies
      const selectedCountry = countryOptions.find(
        (c) => c.label === event.data.pays
      );
      const selectedCode = selectedCountry?.value;

      setDate(
        event.data.date.toDate ? event.data.date.toDate() : event.data.date
      );
      setCity(event.data.ville);
      setCountry(event.data.pays);
      setPlace(event.data.lieux);
      setAvailable(event.data.disponibilite === "available");

      // Chargement des villes en fonction du pays sélectionné
      if (selectedCode) {
        const cities = City.getCitiesOfCountry(selectedCode).map((city) => ({
          label: city.name,
          value: city.name,
        }));
        setCityOptions(cities);
      }
    };

    getAllData();
  }, [id, countryOptions]);

  // Soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Validation des champs
    if (city === "") {
      toast.error("City is required!");
      return;
    } else if (country === "") {
      toast.error("Country is required!");
      return;
    } else if (place === "") {
      toast.error("Place is required!");
      return;
    }

    // Données à envoyer à la base
    const eventData = {
      date,
      ville: city,
      pays: country,
      lieux: place,
      disponibilite: available ? "available" : "sold out",
    };

    // Ajout ou mise à jour selon l’ID
    if (id === "0") {
      await dbProvider.addData(eventData, "events");
    } else {
      await dbProvider.setData(eventData, "events", id);
    }

    setLoading(false);
    navigate("/home"); // Redirection après enregistrement
  };

  // Personnalisation de l’apparence du sélecteur
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "white",
      borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
      borderWidth: "1px",
      borderRadius: "0.5rem",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(59, 130, 246, 0.5)" : "",
      padding: "2px 2px",
      minHeight: "40px",
      fontSize: "0.875rem",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#e0f2fe" : "white",
      color: "#111827",
      padding: "8px 12px",
      fontSize: "0.875rem",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#111827",
      fontSize: "0.875rem",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9ca3af",
      fontSize: "0.875rem",
    }),
  };

  return (
    <>
      {userLoggedIn ? (
        <div className="max-w-xl mx-auto bg-gray-900 shadow-md rounded-xl px-4 sm:px-6 py-8 mt-15">
          {/* Titre de la page */}
          <div className="mb-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">
                {Number(id) === 0 ? "Add Concert" : "Modify Concert"}
              </h2>
              <p className="text-sm text-white">
                {Number(id) === 0
                  ? "Create a new concert entry"
                  : "Update the concert details"}
              </p>
            </div>
          </div>

          {/* Formulaire principal */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sélection de la date */}
            <div>
              <label className="block text-left text-sm font-medium text-white mb-2">
                Date
              </label>
              <div className="flex">
                <DatePicker
                  placeholderText="Choose a date"
                  selected={date}
                  onChange={(date) => setDate(date)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Sélection du pays */}
            <div>
              <label className="block text-left text-sm font-medium text-white mb-2">
                Country
              </label>
              <Select
                options={countryOptions}
                value={countryOptions.find((c) => c.label === country)}
                onChange={(selected) => {
                  setCountry(selected.label);
                  const cities = City.getCitiesOfCountry(selected.value).map(
                    (city) => ({
                      label: city.name,
                      value: city.name,
                    })
                  );
                  setCityOptions(cities);
                  setCity("");
                }}
                placeholder="Choose a country"
                styles={customSelectStyles}
                className="text-sm"
              />
            </div>

            {/* Sélection de la ville */}
            <div>
              <label className="block text-left text-sm font-medium text-white mb-2">
                City
              </label>
              <Select
                options={cityOptions}
                value={cityOptions.find((c) => c.value === city)}
                onChange={(selected) => setCity(selected.value)}
                isDisabled={cityOptions.length === 0}
                placeholder="Choose a city"
                styles={customSelectStyles}
                className="text-sm"
              />
            </div>

            {/* Lieu du concert */}
            <div>
              <label className="block text-left text-sm font-medium text-white mb-2">
                Place / Event
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            </div>

            {/* Disponibilité du concert */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="text-sm font-medium text-white">
                Disponibility
              </label>
              <button
                type="button"
                onClick={() => setAvailable(!available)}
                className={`px-4 py-2 rounded-md text-white text-sm font-medium ${
                  available
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                } transition duration-200`}
              >
                {available ? "Available" : "Sold Out"}
              </button>
            </div>

            {/* Bouton de soumission */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                disabled={loading}
              >
                {Number(id) === 0
                  ? loading
                    ? "Creating.."
                    : "Create a new"
                  : loading
                  ? "Modifing..."
                  : "Modify"}
              </button>
            </div>
            <ToastContainer />
          </form>
        </div>
      ) : (
        // Message d’erreur si l’utilisateur n’est pas connecté
        <div className="flex flex-1 justify-center items-center text-center mt-80">
          <p className="text-7xl text-white">Vous ne passerez PAS!!!!!!!</p>
        </div>
      )}
    </>
  );
};

export default Form;
