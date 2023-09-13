export default function handler(req, res) {

  if (req.method === 'POST') {
    // Process a POST request
    try {
      // const { connectivity, rnd, logistics, marketing, inventory } = req.body

      const sectorsData = req.body;

      let sum = 0;
      for (const key in sectorsData) {
        if (sectorsData.hasOwnProperty(key)) {
          sum += sectorsData[key];
        }
      }

      // send random industry
      res.status(200).json({ vps: 13000-sum })
    } catch (error) {
      res.status(400).json({ error: 'Invalid request' })
    }
  } else {
    res.status(400).json({ error: 'Only POST requests allowed' })
  }

}