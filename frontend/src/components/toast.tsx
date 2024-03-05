import { useEffect } from 'react';

type ToastProps = {
  message: string,
  type: 'SUCCESS' | 'ERROR',
  hideToast: () => void 
}

const Toast = ({ message, type, hideToast} : ToastProps) => {
   
    useEffect(() => {
     const timeout = setTimeout(() => {
       hideToast();
     }, 5000);
    return () => {
        clearTimeout(timeout);
    }
    }, []);

    const style = type === 'SUCCESS' ? 'fixed top-4 right-4 z-50 p-4 rounded bg-green-600 text-white max-w-md'
    : 'fixed top-4 right-4 z-50 p-4 rounded bg-red-600 text-white max-w-md';
  return (
      <div className={style}>
        <div className= 'flex justify-center items-center'>
        <span className='text-lg text-white font-semibold'>
         {message}  
       </span>    
        </div>
      </div>
  )
}

export default Toast;