export default function handler(req, res) {

  if (req.method === 'GET') {
    // Process a POST request
    try {
      // const { teamName, teamNumber, teamLeaderMail, } = req.body
      const cities = [
        "Bangalore",
        "Hyderabad",
        "Pune",
        "Chennai",
        "Mumbai",
        "Delhi",
        "Kolkata",
        "Ahmedabad",
        "Indore",
        "Jaipur"
      ];

      // send random industry
      res.status(200).json({ city: cities[Math.floor(Math.random() * cities.length)], vps: 13000 })
    } catch (error) {
      res.status(400).json({ error: 'Invalid request' })
    }
  } else {
    res.status(400).json({ error: 'Only GET requests allowed' })
  }

}
