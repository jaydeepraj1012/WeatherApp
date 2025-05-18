import React, { useState, useEffect } from "react";
// import { Search, Cloud, Droplet, Wind, Thermometer } from 'lucide-react';
import Swal from "sweetalert2";
import Loading from "./Loading";

function WeatherApp() {
  const [wheatherData, setwheatherData] = useState([]);
  const [city, setCity] = useState("delhi");
  const [loading, setLoading] = useState(false);
  const getwheatherdata = async () => {
    if (city === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a city name!",
      });
      return;
    }
    setLoading(true);
    const responsive = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=1b826af1512a497383780834251505&q=${city}`
    );
    const wheatherData = await responsive.json();
    if (wheatherData.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: wheatherData.error.message,
      });
      setCity("");
      setwheatherData([]);
      setLoading(false);
      return;
    }
    setTimeout(() => {
      setwheatherData(wheatherData);
      setLoading(false);
    }, 2000);
    console.log(wheatherData);
  };
  useEffect(() => {
    getwheatherdata();
  }, []);

  function handlerinoput(e) {
    const value = e.target.value;
    setCity(value);
  }

  return (
    <>
      {loading && <Loading loading={loading} />}
      <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-600 to-purple-700 p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Weather Forecast
            </h1>
            <p className="text-blue-100">Check current weather conditions</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-1 flex mb-6 border border-white/30">
            <input
              type="text"
              placeholder="Enter country  name"
              className="flex-1 p-3 bg-transparent rounded-lg text-white placeholder-blue-200 outline-none"
              value={city}
              onChange={handlerinoput}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg flex items-center justify-center transition-colors duration-300"
              onClick={getwheatherdata}
            >
              Get
            </button>
          </div>

          {wheatherData.current && (
            <div className="bg-white/20 backdrop-blur-xl rounded-xl overflow-hidden shadow-lg border border-white/30 text-white">
              <div className="p-6 flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <h2 className="text-3xl font-bold">
                    {wheatherData.location.name}
                  </h2>
                  <p className="text-sm text-blue-100">
                    {wheatherData.location.country}
                  </p>
                  <p className="text-sm text-blue-100">
                    {wheatherData.location.localtime}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src={wheatherData.current.condition.icon}
                    alt={wheatherData.current.condition.text}
                    className="h-16 w-16"
                  />
                  <p className="text-lg font-medium">
                    {wheatherData.current.condition.text}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600/50 to-purple-700/50 p-6">
                <div className="flex justify-center mb-6">
                  <div className="text-6xl font-bold flex items-start">
                    {wheatherData.current.temp_c}
                    <span className="text-3xl mt-1">°C</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center bg-white/10 p-3 rounded-lg">
                    {/* <Thermometer className="text-yellow-300 mr-3" size={24} /> */}
                    <div>
                      <p className="text-sm text-blue-100">Feels Like</p>
                      <p className="font-medium">
                        {wheatherData.current.feelslike_c}°C
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center bg-white/10 p-3 rounded-lg">
                    {/* <Droplet className="text-blue-300 mr-3" size={24} /> */}
                    <div>
                      <p className="text-sm text-blue-100">Humidity</p>
                      <p className="font-medium">
                        {wheatherData.current.humidity}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center bg-white/10 p-3 rounded-lg">
                    {/* <Wind className="text-gray-300 mr-3" size={24} /> */}
                    <div>
                      <p className="text-sm text-blue-100">Wind</p>
                      <p className="font-medium">
                        {wheatherData.current.wind_kph} km/h
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {wheatherData.error && (
            <div className="bg-red-400/20 backdrop-blur-md border border-red-400/50 rounded-xl p-4 text-center">
              <p className="text-red-100">{wheatherData.error.message}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WeatherApp;
