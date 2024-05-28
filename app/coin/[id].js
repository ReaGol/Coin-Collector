// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { fetchCoinData } from "../../utils/api";

// const CoinDetails = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [coin, setCoin] = useState(null);

//   useEffect(() => {
//     const fetchCoin = async () => {
//       if (id) {
//         const data = await fetchCoinData(id);
//         setCoin(data ? data.coins[0] : null);
//       }
//     };
//     fetchCoin();
//   }, [id]);

//   if (!coin) return <div>Loading...</div>;

//   return (
//     <div className='container mx-auto p-4'>
//       <div className='coin-details bg-white p-8 rounded-lg shadow-lg'>
//         <img
//           src={coin.obverse_thumbnail}
//           alt={coin.name}
//           className='w-full h-64 object-cover rounded mb-8'
//         />
//         <h1 className='text-3xl font-bold mb-4'>{coin.name}</h1>
//         <p className='text-xl text-gray-600'>
//           {coin.country} - {coin.min_year}
//         </p>
//         <p className='mt-4'>{coin.title}</p>
//       </div>
//     </div>
//   );
// };

// export default CoinDetails;





import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const fetchCoinData = async (id) => {
  try {
    const response = await axios.get(`/api/numista?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching coin data:", error);
    return null;
  }
};

const CoinDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      if (id) {
        const data = await fetchCoinData(id);
        setCoin(data ? data[0] : null);
      }
    };
    fetchCoin();
  }, [id]);

  if (!coin) return <div>Loading...</div>;

  return (
    <div className='container mx-auto p-4'>
      <div className='coin-details bg-white p-8 rounded-lg shadow-lg'>
        <img
          src={coin.obverse_thumbnail}
          alt={coin.name}
          className='w-full h-64 object-cover rounded mb-8'
        />
        <h1 className='text-3xl font-bold mb-4'>{coin.name}</h1>
        <p className='text-xl text-gray-600'>
          {coin.country} - {coin.min_year}
        </p>
        <p className='mt-4'>{coin.title}</p>
      </div>
    </div>
  );
};

export default CoinDetails;
