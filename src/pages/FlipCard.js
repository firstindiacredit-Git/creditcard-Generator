import React, { useState } from 'react';
import './FlipCard.css'; // Import your CSS file
// Import your card data from respective files
import { americanexpress } from '../Data/AmericanExpress/americanexpress.js';
import { mastercard } from '../Data/MasterCard/mastercard.js';
import { visa } from '../Data/Visa/Visa.js';
import { dinersclub } from '../Data/DinersClub/dinersclub.js';
import { discover } from '../Data/Discover/discover.js';

const FlipCard = () => {
  const [cardType, setCardType] = useState('mastercard');
  const [numOfCards, setNumOfCards] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);

  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const numCards = Math.min(numOfCards, 150);
    let cardData = [];

    if (cardType === 'americanexpress') {
      cardData = americanexpress;
    } else if (cardType === 'mastercard') {
      cardData = mastercard;
    } else if (cardType === 'visa') {
      cardData = visa;
    } else if (cardType === 'dinersclub') {
      cardData = dinersclub;
    } else if (cardType === 'discover') {
      cardData = discover;
    }

    const shuffledData = shuffleArray(cardData);
    const filtered = shuffledData.slice(0, numCards);
    setFilteredCards(filtered);
  };

  return (
    <div className="flip-card">
      <form onSubmit={handleSearch} className="mb-6 space-y-4">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Select Card Type:</label>
          <select
            value={cardType}
            onChange={(e) => setCardType(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="americanexpress">American Express</option>
            <option value="mastercard">MasterCard</option>
            <option value="visa">Visa</option>
            <option value="discover">Discover</option>
            <option value="dinersclub">Diners Club</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Number of Cards (Max 150):</label>
          <input
            type="number"
            value={numOfCards}
            onChange={(e) => setNumOfCards(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number of cards"
            max="150"
            required
          />
        </div>

        <button
          type="submit"
          className="block w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Search
        </button>
      </form>

      {filteredCards.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-4">
          {filteredCards.map((card, index) => (
            <div key={index} className="atm-card p-4 rounded-lg shadow-lg bg-white relative">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <p className="heading_8264">{card.Issuer}</p>
                  <svg
                    className="logo"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="36"
                    height="36"
                    viewBox="0 0 48 48"
                  >
                    {/* Your logo SVG paths */}
                    <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path>
                    <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path>
                    <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"></path>
                  </svg>
                  <p className="number">{card.Credit_Card_Number}</p>
                  <p className="valid_thru">VALID THRU</p>
                  <p className="date_8264">{card.Expiry_Date}</p>
                  <p className="name">{card.Name}</p>
                </div>
                <div className="flip-card-back">
                  <div className="">
                    <p className="code">***</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlipCard;
