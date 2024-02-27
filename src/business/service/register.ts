// business/service/register.ts

import axios, { AxiosError } from 'axios'; // Import AxiosError for TypeScript support

// Load environment variables from .env file
const BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API;


// Define the register function to make API calls
export const register = async (formData: any) => {
  // console.log('register: ' ,formData);
  
  try {
    // Make a POST request to the register endpoint
    const response = await axios.post(`${BASE_URL_API}/api/register`, formData);

    // // If registration is successful, return the response data
    // console.log('register response: ', response.data);
    return response.data;
    
  } catch (error) {
    throw new Error('Registration failed. Please try again.');
  }
};
