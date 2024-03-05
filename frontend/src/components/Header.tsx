import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

import SignOut from "./SignOut";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6">
      <div className='container mx-auto flex justify-between'>
        <span className='text-3xl text-white font-bold tracking-tight'>
          <Link to='/'>MernHolidays.com
          </Link>
        </span>
        <span className='flex space-x-2'></span>
        {isLoggedIn ?
          <> <Link to='/my-bookings'> My Bookings</Link> <Link to='/my-hotels'> My Hotels</Link> <SignOut/></>
          :
          <Link to="/sign-in" className='flex item-center bg-white text-blue-600 px-3 font-bold hover:bg-gray'> Sign In</Link>}

      </div>
    </div>
  )
}

export default Header;



