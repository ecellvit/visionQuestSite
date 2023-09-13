export default function handler(req, res) {

  if (req.method === 'POST') {
    // Process a POST request
    try {
      const { teamName, teamNumber, teamLeaderMail, } = req.body

      const industries = [
        'IT (Information Technology)',
        'PETROCHEMICAL',
        'FASHION',
        'AUTOMOBILE',
        'FINANCE',
        'HEALTHCARE'
      ];
      // send random industry
      res.status(200).json({ industry: industries[Math.floor(Math.random() * industries.length)], vps: 15000 })
    } catch (error) {
      res.status(400).json({ error: 'Invalid request' })
    }
  } else {
    res.status(400).json({ error: 'Only POST requests allowed' })
  }

}