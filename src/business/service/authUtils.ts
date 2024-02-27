// authUtils.ts

import axios from 'axios';
import jwt from 'jsonwebtoken';

// Load environment variables from .env file
const BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API;

// Function to check if the access token is expired
export const isTokenExpired = (token: string): boolean => {
  // Decode the token to extract expiration time
  const decodedToken = jwt.decode(token) as { exp: number } | null;
  if (!decodedToken) {
    // Handle invalid token
    return true;
  }

  // Get the current time
  const currentTime = Math.floor(Date.now() / 1000);

  // Check if the expiration time is in the past
  return decodedToken.exp < currentTime;
};

// Function to refresh the access token
export const refreshToken = async (): Promise<string | null> => {
  try {
    // Make a request to your server to refresh the token
    const response = await axios.post(`${BASE_URL_API}/api/refreshToken`);

    // Extract the new access token from the response
    const newAccessToken = response.data.accessToken;

    // Save the new access token to local storage
    localStorage.setItem('accessToken', newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};
