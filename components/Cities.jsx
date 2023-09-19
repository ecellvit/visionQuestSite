 // NextPage.jsx
import React, { useState, useEffect } from 'react';
import '@/styles/cities.css';

export default function Cities(props) {
  // Replace with your actual team information
  const teamName = 'Team A';
  const teamNumber = '123';
  const score = '100';

  const [selectedIndustry, setSelectedIndustry] = useState('');

  // Sample data for industry and cities (replace with data from the backend)
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
    // Add more industries and cities as needed
  };

  // Function to fetch industry-specific data from the backend
  const fetchDataFromBackend = () => {
    
    setSelectedIndustry("I.T");
  };

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    fetchDataFromBackend();
  }, []);

  return (
    <div className="next-page">
      {/* Industry */}
      

      {/* City Cards Section */}
      <div className="city-cards">
        {/* Map through cities for the selected industry */}
        {industryData[selectedIndustry]?.map((city, index) => (
          <div className="city-card" key={index}>
            {/* You can add an image for the city here if needed */}
            <p className="city-name">{city}</p>
          </div>
        ))}
      </div>

      {/* Proceed button on all components */}
      <button onClick={()=>{props.onProceed()}}>Proceed</button>

    </div>
  );
}
