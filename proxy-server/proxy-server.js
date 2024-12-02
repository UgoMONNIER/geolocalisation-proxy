const express = require('express');
const axios = require('axios');
const cors = require('cors'); 

const app = express();
const port = 3000;
const apiKey = '5b3ce3597851110001cf62487a0bc7ee018f4ac2b0c712601134eb2a';

app.use(cors()); 
app.use(express.json());

app.post('/directions', async (req, res) => {
  try {
    const { startLatitude, startLongitude, endLatitude, endLongitude } = req.body;

    if (!startLatitude || !startLongitude || !endLatitude || !endLongitude) {
      return res.status(400).json({ error: 'Les coordonnées sont manquantes.' });
    }
console.log(req.body);

    const response = await axios.post(
      'https://api.openrouteservice.org/v2/directions/driving-car',
      {
        coordinates: [
          [startLongitude, startLatitude],
          [endLongitude, endLatitude]
        ],
    radiuses: [1000, 1000] // Rayon de recherche étendu à 1000 mètres

      },
      {
        headers: {
          'Authorization': apiKey,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Erreur lors de l\'appel à OpenRouteService:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'itinéraire.' });
  }
});

app.post('/geocode', async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ error: 'Address is missing.' });
    }

    const response = await axios.get('https://api.openrouteservice.org/geocode/search', {
      params: {
        api_key: apiKey,
        text: address
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error during geocoding:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while retrieving geocoding data.' });
  }
});

app.listen(port, () => {
  console.log(`Serveur backend démarré sur http://localhost:${port}`);
});
