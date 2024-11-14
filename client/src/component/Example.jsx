import React, { useState } from "react";

const Example = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");

  const cities = [
    { city: "delhi", places: ["Kashmiri Gate", "Nehru Place", "Rajiv Chowk"] },
    { city: "lucknow", places: ["Hazratganj", "Aminabad", "Charbagh"] },
    { city: "mumbai", places: ["Marine Drive", "Gateway of India", "Juhu Beach"] },
    { city: "chennai", places: ["Marina Beach", "T Nagar", "Mylapore"] },
  ];

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedPlace(""); 
  };

  const selectedCityPlaces = cities.find((city) => city.city === selectedCity)?.places || [];

  return (
    <div>
      <select value={selectedCity} onChange={handleCityChange}>
        <option value="">Select a city</option>
        {cities.map((city) => (
          <option key={city.city} value={city.city}>
            {city.city}
          </option>
        ))}
      </select>

      {selectedCity && (
        <select value={selectedPlace} onChange={(e) => setSelectedPlace(e.target.value)}>
          <option value="">Select a place</option>
          {selectedCityPlaces.map((place) => (
            <option key={place} value={place}>
              {place}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Example;
