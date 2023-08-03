/** @format */

import React from "react";
import { v1 as uuid } from "uuid";
import useAxios, { formatPlayingCardData } from "./hooks";
import PlayingCard from "./PlayingCard";
import "./PlayingCardList.css";

function PlayingCardList() {
  const [cards, fetchCardData, clearCards] = useAxios(
    "https://deckofcardsapi.com/api/deck/new/draw/",
    formatPlayingCardData
  );

  const addCard = async () => {
    await fetchCardData();
  };

  const handleClearCards = () => {
    clearCards();
  };

  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={addCard}>Add a playing card!</button>
        <button onClick={handleClearCards}>Clear all playing cards</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map((cardData) => (
          <PlayingCard key={cardData.id} front={cardData.image} />
        ))}
      </div>
    </div>
  );
}

export default PlayingCardList;
