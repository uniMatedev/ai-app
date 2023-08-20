// pages/api/weather.js
export default async function handler(req, res) {
    const endpoint = 'https://api.weather.gov/gridpoints/SGX/59,22/forecast'; // Updated NWS API endpoint

    const headers = {
        'User-Agent': '(https://ai-app-six.vercel.app/weather, zachmbanks@gmail.com)', // as required by NWS
        // Add any other headers required for specific endpoints
    };

    try {
        const response = await fetch(endpoint, { headers });

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
