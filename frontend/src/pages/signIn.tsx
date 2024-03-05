import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as apiClient from '../api-client';
import { useNavigate } from 'react-router-dom';

import { useAppContext } from '../context/AppContext';

export type SignFormData = {
    email: string;
    password: string;
}
const signIn = () => {
    const { showToast, updateLoggedIn } = useAppContext();
    const { register, formState: { errors }, handleSubmit } = useForm<SignFormData>();
    const navigate = useNavigate();
    const mutation = useMutation(apiClient.signIn, {
        onSuccess: () => {
            showToast({
                type: 'SUCCESS',
                message: 'Sign In done.'
            })
            updateLoggedIn(true);
            navigate('/');
        },
        onError: () => {
            updateLoggedIn(false);
        }
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data)
    })
    return (
        <form className='flex flex-col gap-5' onSubmit={onSubmit}>
            <h2 className='text-3xl font-bold'> Sign In</h2>
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
                    required: 'The length should be grater then 6',
                    minLength: 6
                })}></input>
                {errors.password && (<span className='text-red-500'>{errors.password.message}</span>)}
            </label>
            <span className='flex flex-row justify-between'>
                <span className='text-gray-400'>
                    Don't have an Account?
                    <a href='/register' className='underline cursor-pointer ml-3'>Create One</a>
                </span>
                <button type='submit' className='bg-blue-500 p-2 rounded text-white font-bold my-2 hover:bg-blue-300'>
                    Login
                </button>
            </span>
        </form>
    )
}

export default signIn