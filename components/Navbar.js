import Link from "next/link";

const Navbar = () => {
  return (
    <nav className='bg-gray-800 p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link legacyBehavior href='/'>
          <a className='text-white text-2xl font-bold'>Coin Collector's Hub</a>
        </Link>
        <div className='flex space-x-4'>
          {/* <Link legacyBehavior href='/search'>
            <a className='text-white'>Search</a>
          </Link> */}
          <Link legacyBehavior href='/exchange-rates'>
            <a className='text-white'>Exchange Rate</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
