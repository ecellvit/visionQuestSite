// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

  // console.log(req);
  const { abc } = req.query;

  console.log("api has been hit");

  res.status(200).json({ city: 'Delhi' })
}
