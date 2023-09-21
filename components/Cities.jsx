
import React, { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react'
import '@/styles/city.module.css'

export default function Cities(props) {

  const teamName = 'Team A';
  const teamNumber = '123';
  const score = '100';

  const [selectedIndustry, setSelectedIndustry] = useState('');
  const { data: session, status } = useSession();


  const industryData = {
    "I.T": [
      "Bangalore, Karnataka",
      "Hyderabad, Telangana",
      "Pune, Maharashtra",
      "Chennai, Tamil Nadu",
      "Mumbai, Maharashtra",
      "Delhi",
      "Kolkata, West Bengal",
      "Ahmedabad, Gujarat",
      "Indore, Madhya Pradesh",
      "Jaipur, Rajasthan"
    ],
    "Fashion": [
      "Mumbai, Maharashtra",
      "Delhi",
      "Bangalore, Karnataka",
      "Chennai, Tamil Nadu",
      "Hyderabad, Telangana",
      "Kolkata, West Bengal",
      "Ahmedabad, Gujarat",
      "Jaipur, Rajasthan",
      "Surat, Gujarat",
      "Kochi, Kerala"
    ],
    "Petrochemical": [
      "Mumbai, Maharashtra",
      "Jamnagar, Gujarat",
      "Gandhinagar, Gujarat",
      "Haldia, West Bengal",
      "Vishakhapatnam, Andhra Pradesh",
      "Nagothane, Maharashtra",
      "Kochi, Kerala",
      "Panipat, Haryana",
      "Dahej, Gujarat",
      "Barauni, Bihar"
    ],
    "Healthcare": [
      "Pune, Maharashtra",
      "Ahmedabad, Gujarat",
      "Bangalore, Karnataka",
      "Mumbai, Maharashtra",
      "Chennai, Tamil Nadu",
      "Hyderabad, Telangana",
      "Kolkata, West Bengal",
      "Delhi-NCR",
      "Lucknow, Uttar Pradesh",
      "Patna, Bihar"
    ],
    "Finance": [
      "Mumbai, Maharashtra",
      "Delhi",
      "Bangalore, Karnataka",
      "Chennai, Tamil Nadu",
      "Hyderabad",
      "Kolkata",
      "Ahmedabad",
      "Pune",
      "Surat",
      "Indore"
    ],
    "Automobile": [
      "Chennai",
      "Pune",
      "Gurugram",
      "Ahmedabad",
      "Bangalore",
      "Jamshedpur",
      "Indore",
      "Kochi, Kerala",
      "Lucknow",
      "Coimbatore"
    ]
  
  };

  
  const fetchDataFromBackend = () => {
    const backendUrl = process.env.NEXT_PUBLIC_SERVER
    fetch(backendUrl + "/team/getTeam/", {
      content: "application/json",
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessTokenBackend}`,
        'Access-Control-Allow-Origin': '*',
      },
    }).then(res => res.json())
    .then(data => {
      console.log(data.team.industry);
      setSelectedIndustry(data.team.industry)
      
    }).catch(err => {
      console.log("no team found");
      setHasTeamDetails(false);
      console.log(err)
    })
    
  };

  
  useEffect(() => {
    fetchDataFromBackend();
  }, []);

  return (
    <div className={"next-page"}>
      <div className="city-cards">
    
        {industryData[selectedIndustry]?.map((city, index) => (
          <div className="city-card" key={index}>

            <p className="city-name">{city}</p>
          </div>
        ))}
      </div>

    <div className="proceed-button">
      <button onClick={()=>{props.onProceed()}}>Proceed</button>
    </div>

    </div>
  );
}
