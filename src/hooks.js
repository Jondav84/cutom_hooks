/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import { v1 as uuid } from "uuid";

/* Custom hook for flipping cards. */
function useFlip() {
  const [isFacingUp, setIsFacingUp] = useState(true);

  const flipCard = () => {
    setIsFacingUp((isUp) => !isUp);
  };

  return [isFacingUp, flipCard];
}

/* Custom hook for making AJAX requests with axios. */
function useAxios(baseUrl, formatData) {
  const [data, setData] = useLocalStorage(baseUrl, []);

  const fetchData = async (restUrl = "") => {
    try {
      const response = await axios.get(baseUrl + restUrl);
      setData((prevData) => [
        ...prevData,
        { ...formatData(response.data), id: uuid() },
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const clearAxiosData = () => {
    setData([]);
  };

  return [data, fetchData, clearAxiosData];
}

/* Custom hook for syncing state with local storage */
function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

/* Formatting function for PlayingCardList data */
function formatPlayingCardData(data) {
  return { image: data.cards[0].image };
}

/* Formatting function for PokeDex data */
function formatPokemonData(data) {
  return {
    front: data.sprites.front_default,
    back: data.sprites.back_default,
    name: data.name,
    stats: data.stats.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
  };
}

export {
  useFlip,
  useAxios,
  useLocalStorage,
  formatPlayingCardData,
  formatPokemonData,
};
