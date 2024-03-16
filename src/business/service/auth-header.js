// // auth-header.js
// export default function authHeader() {
//   const user = JSON.parse(localStorage.getItem('user'));

//   if (user && user.access_token) {
//     return { Authorization: 'Bearer ' + user.access_token };
//   } else {
//     return {};
//   }
// }

// auth-header.js
export const getAuthHeader = () => {
  // Logic to get authentication token from localStorage or wherever it's stored
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('accessToken') : null;
  // const token = localStorage.getItem('accessToken');
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};

