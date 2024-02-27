// business/service/register.ts

import axios, { AxiosError } from 'axios'; // Import AxiosError for TypeScript support

// Load environment variables from .env file
const BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API;


// Define the register function to make API calls
export const login = async (formData: any) => {
  // console.log('register: ', formData);

  try {
    // Make a POST request to the register endpoint
    const response = await axios.post(`${BASE_URL_API}/api/login`, formData);

    console.log(response.data);
    
    // Extract tokens from the response
    const { accessToken, refreshToken } = response.data;

    // Store tokens in localStorage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    // // If registration is successful, return the response data
    // console.log('login response: ', response.data);

    return response.data;

  } catch (error) {
    throw new Error('Registration failed. Please try again.');
  }
};
