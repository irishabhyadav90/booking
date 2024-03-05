import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as apiClient from '../api-client';
import { useAppContext } from '../context/AppContext';

export type formInterface = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}
const Register = () => {
   const { showToast, updateLoggedIn } = useAppContext();
   const navigate = useNavigate();
    const mutation = useMutation(apiClient.register, {
        onSuccess: () => {
            navigate('/');
            showToast({
                type: 'SUCCESS',
                message: 'Register successful'
            });
            updateLoggedIn(true);
        },
        onError: (err) => {
            updateLoggedIn(false);
          console.log("error:", err)
        }
    });
    const { register, watch, handleSubmit, formState: { errors } } = useForm<formInterface>();

    const onSubmit = handleSubmit((data) =>  mutation.mutate(data));
    return (
        <form className=' flex flex-col gap-2' onSubmit={onSubmit}>
            <h2 className='text-3xl font-bold'>Create an Account</h2>
            <div className='flex flex-col md:flex-row gap-5'>
                <label className='text-gray-700 text-sm font-bold flex-1' >
                    First Name
                    <input type='' className='border rounded w-full py-1 px-2 font-normal' {...register('firstName', {
                        required: 'This field is required',
                    })}></input>
                    {errors.firstName && (<span className='text-red-500'>{errors.firstName.message}</span>)}
                </label>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    Last Name
                    <input className='border rounded w-full py-1 px-2 font-normal'  {...register('lastName', {
                        required: 'This field is required',
                    })}></input>
                    {errors.lastName && (<span className='text-red-500'>{errors.lastName.message}</span>)}
                </label>
            </div>
            <label className='text-gray-700 text-sm font-bold flex-1' >
                Email
                <input type='email' className='border rounded w-full py-1 px-2 font-normal'
                    {...register('email', {
                        required: 'This field is required',
                    })}
                ></input>
                {errors.email && (<span className='text-red-500'>{errors.email.message}</span>)}
            </label>
            <label className='text-gray-700 text-sm font-bold flex-1' >
                Password
                <input type='password' className='border rounded w-full py-1 px-2 font-normal' {...register('password', {
                    required: 'The lenght should be grater then 6',
                    minLength: 6
                })}></input>
                {errors.password && (<span className='text-red-500'>{errors.password.message}</span>)}
            </label>
            <label className='text-gray-700 text-sm font-bold flex-1' >
                Confirm Password
                <input type='password' className='border rounded w-full py-1 px-2 font-normal' {...register('confirmPassword', {
                    validate: (val) => {
                        if (!val) return "this field is required"
                        else if (watch('password') !== val) return "The password shoud be the same"
                    }
                })}></input>
                {errors.confirmPassword && (<span className='text-red-500'>{errors.confirmPassword.message}</span>)}
            </label>
            <span className='flex flex-row justify-end'>
                <button type='submit' className='bg-blue-500 p-2 rounded text-white font-bold my-2 hover:bg-blue-300'>
                    Create Account
                </button>
            </span>
        </form>
    )
}

export default Register;