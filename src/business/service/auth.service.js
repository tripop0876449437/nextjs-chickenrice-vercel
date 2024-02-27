// // auth.service.js
// import api from "./api"

// export const login = async (data) => {
//   const endpoint = '/login'
//   return await api.post(endpoint, {
//     username: data.username,
//     password: data.password
//   }
//   ).then((response) => {
//     const data = response
//     if (data && data.accessToken) {
//       localStorage.setItem('user', JSON.stringify(data));
//     }

//     return response
//   }).catch((error) => {
//     return error
//   })

// }

// export const register = async (data) => {
//   try {
//     const endpoint = '/register'
//     return await api.post(endpoint, {
//       username: data.username,
//       password: data.password,
//       confirmPassword: data.confirmPassword,
//       name: data.name,
//       surname: data.surname,
//       roleName: data.roleName,
//       email: data.email,
//       phoneNumber: data.phoneNumber
//     });

//     // if (response && response.data && response.data.accessToken) {
//     //   localStorage.setItem('user', JSON.stringify(response.data))
//     // }
//     // return response;
//   } catch (error) {
//     return error;
//   }
// }

// auth.service.js

import api from './api';
import getAuthHeader from './auth-header';

const register = async (userData) => {
  try {
    const response = await api.post('/api/register', userData, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    throw new Error('Registration failed.');
  }
};

export const authService = {
  register,
};


export const logout = () => {
  // Clear user session or token
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  // Redirect the user to the login page
  window.location.href = '/auth/login'; // Assuming '/login' is your login page route
};