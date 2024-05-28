 "use client";

 import { useState, useEffect } from "react";
 import { useRouter } from "next/navigation";
 import axios from "axios";
 import CoinCard from "@components/CoinCard";

 const SearchPage = () => {
   const [query, setQuery] = useState("");
   const [coins, setCoins] = useState([]);
   const router = useRouter();

   useEffect(() => {
     const fetchSearchResults = async () => {
       const searchQuery = router.query.query;
       if (!searchQuery) return;
       setQuery(searchQuery);
       try {
         console.log("Client - Fetching search results for query: ", query);
         const result = await axios.get(
           `/api/numista?q=${encodeURIComponent(searchQuery)}`
         );
         console.log("Client - Search Result: ", result.data);
         if (result.data) {
           setCoins(result.data);
         } else {
           console.error("Client - No coins found in the search results");
         }
       } catch (error) {
         console.error("Client - Error fetching search results:", error);
       }
     };
     if (router.isReady) {
       fetchSearchResults();
     }
   }, [router.isReady, router.query]);

   const handleSearch = async () => {
     if (!query) return;
     router.push(`/search?q=${encodeURIComponent(query)}`);
   };

   return (
     <div className='container mx-auto p-4'>
       <div className='hero bg-gray-200 p-8 rounded-lg text-center'>
         <h1 className='text-4xl font-bold mb-4'>Search Results</h1>
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
       </div>

       <div className='search-results mt-8'>
         <h2 className='text-2xl font-bold mb-4'>Coins Found</h2>
         <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
           {coins.map((coin) => (
             <CoinCard key={coin.id} coin={coin} />
           ))}
         </div>
       </div>
     </div>
   );
 };

 export default SearchPage;
