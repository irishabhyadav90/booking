import { formInterface } from './pages/register';
import { SignFormData } from './pages/signIn';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: formInterface) => {
  
    console.log("API_BASE_URL", API_BASE_URL, "formdata", formData);
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: 'POST',
      credentials:'include',
      headers: {
          'Content-Type':"application/json"
      },
      body: JSON.stringify(formData)
  });
  const responseBody = await response.json();
  if(!response.ok) {
      throw new Error(responseBody.message)
  }
  return responseBody;
}

export const signIn = async (formData: SignFormData) => {
 const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(formData)
 });
 
 const body = await response.json();
 if(!response.ok){
  throw new Error(body.message)
 }
 return body;
}

export const signOut = async () => {
 const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
  method: "GET",
  credentials: "include",
  headers: {
    "Content-Type": "application/json"
  },
 });
 if(!response.ok) throw new Error("Something went wrong.");
 return response.body
}

export const validateToken  = async () => {
  const response  = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
     method : 'GET',
     credentials :'include'
  });
  console.log("response", response)
  if(!response.ok) throw new Error("token invalid");
  return response.json();
}