import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';

import { useAppContext } from '../context/AppContext';

const SignOut = () => {
 
  
  const queryClient = useQueryClient(); 

  const clearCookies = () => {
    // Get all cookies
    var cookies = document.cookie.split(';');
  
    // Loop through each cookie and remove it
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf('=');
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }
  }
  const { updateLoggedIn } = useAppContext();
   const mutation = useMutation(apiClient.signOut, {
   onSuccess: async ()=>{
     await queryClient.invalidateQueries('validateToken');
     clearCookies();
     window.location.href = '/';
     updateLoggedIn(false);
   },
   onError : (error) => {
    alert(error)
   } 
  })
  const onClick = () => {
    mutation.mutate();
  } 

  return (
    <button
     onClick={onClick} 
     className="text-blue-600 px-4 py-2 rounded font-bold text-xl bg-white hover:bg-gray-100">
     Sign Out
    </button>
  )
}

export default SignOut