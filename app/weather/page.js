'use client';
import React, { useState, useEffect } from 'react';

export default function Home() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [location] = useState(['/api/miraMesaWeather', '/api/elCentroWeather']);
    const [selectedLocation, setSelectedLocation] = useState(location[0]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        async function fetchDataWeather() {
            try {
                const response = await fetch(selectedLocation);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchDataWeather();
    }, [selectedLocation]);

    const handleFormSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const res = await fetch("/api/lingo-bravo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: data }), 
            });

            const chatResponse = await res.json();
            setMessages([...messages, { role: "assistant", content: chatResponse.data }]);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-10">
            <div>
                {messages.map((message, index) => (
                    <h1 key={index}>{message.content}</h1>
                ))}
                <button onClick={handleFormSubmit}>Send Weather Data to Chat AI</button>
            </div>
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Weather Data</h1>
            <select onChange={(e) => setSelectedLocation(e.target.value)} className="bg-gray-800 mb-8 p-2 border rounded">
                <option value={location[0]}>Mira Mesa</option>
                <option value={location[1]}>El Centro</option>
            </select>

            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {data && data.properties.periods.map(period => (
                <div key={period.number} className="bg-white shadow-md rounded-lg p-5 m-5 max-w-lg w-full text-gray-800">
                    <h2 className="text-3xl font-semibold mb-4">{period.name}</h2>
                    <div className="mb-4 flex items-center">
                        <img src={period.icon} alt={period.shortForecast} className="w-16 h-16 mr-4" />
                        <p className="text-xl">{period.shortForecast}</p>
                    </div>
                    <p className="mb-2">Temperature: <span className="font-medium">{period.temperature} {period.temperatureUnit}</span></p>
                    <p className="mb-2">Wind: <span className="font-medium">{period.windSpeed} from {period.windDirection}</span></p>
                    <p className="mb-2">Chance of Precipitation: <span className="font-medium">{period.probabilityOfPrecipitation ? period.probabilityOfPrecipitation.value : 0}%</span></p>
                    <p className="text-gray-700 mt-4">{period.detailedForecast}</p>
                </div>
            ))}
        </div>
    );
}
