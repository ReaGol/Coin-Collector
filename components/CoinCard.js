import { useRouter } from "next/navigation";


const CoinCard = ({ coin }) => {
   const router = useRouter();

     const handleClick = () => {
       router.push(`/coin/${coin.id}`);
     };
     

  console.log("Rendering coin card for:", coin);
  return (
    <div onClick={handleClick} className='border rounded-lg p-4 text-center'>
      <img
        src={coin.obverse_thumbnail}
        alt={coin.name}
        className='w-30 h-48 mx-auto'
      />
      <h2 className='text-xl font-semibold mt-2'>{coin.name}</h2>
      <p>{coin.title}</p>
      <p className='text-gray-600'>
        {coin.issuer.name} - {coin.min_year} to {coin.max_year}
      </p>
    </div>
  );
};

export default CoinCard;
