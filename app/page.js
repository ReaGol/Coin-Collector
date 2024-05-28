
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import CoinCard from "@components/CoinCard";

export default function Home() {
  const [query, setQuery] = useState("");
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        console.log("Client - Fetching initial data");
        const result = await axios.get(`/api/numista?q=liberty`);
        console.log("Client - Initial Data Result: ", result.data);
        if (result.data) {
          setCoins(result.data);
        } else {
          console.error("Client - No coins found in the initial data");
        }
      } catch (error) {
        console.error("Client - Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, []);

  const handleSearch = async () => {
    try {
      console.log("Client - Sending query: ", query);
      const result = await axios.get(
        `/api/numista?query=${encodeURIComponent(query)}`
      );
      console.log("Client - Search Result: ", result.data);
      if (result.data) {
        setCoins(result.data);
      } else {
        console.error("Client - No coins found in the search result");
      }
    } catch (error) {
      console.error("Client - Error fetching data:", error);
    }
  };


  

  return (
    <div className='container mx-auto p-4'>
      <div className='hero bg-gray-200 p-8 rounded-lg text-center'>
        <h1 className='text-4xl font-bold mb-4'>
          Welcome to Coin Collector's Hub
        </h1>
        <p className='mb-4'>
          Explore and manage your coin collection effortlessly
        </p>
        <div className='flex justify-center mb-8'>
          <input
            type='text'
            className='border p-2 w-2/3 rounded-l'
            placeholder='Search for coins...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className='bg-blue-500 text-white p-2 rounded-r'
          >
            Search
          </button>
        </div>
        <Link legacyBehavior href='/search'>
          <a className='text-blue-500 underline'>Advanced Search</a>
        </Link>
      </div>

      <div className='featured-coins mt-8'>
        <h2 className='text-2xl font-bold mb-4'>Featured Coins</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {coins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      </div>
    </div>
  );
}


