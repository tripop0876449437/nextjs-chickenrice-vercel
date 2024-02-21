import api from "./api"

export const login = async (data) => {
  const endpoint = '/login'
return await api.post(endpoint, {
    username: data.username,
    password: data.password
  }
) .then((response) => {
 const data = response 
 if (data && data.accessToken) {
  localStorage.setItem('user', JSON.stringify(data));
}

return response
}).catch((error) => {
  return error
})

}

export const register = async (data) => {
  try {
  const endpoint = '/register'
  return await api.post(endpoint, {
    username: data.username,
    password: data.password,
    confirmPassword: data.confirmPassword,
    name: data.name,
    surname: data.surname,
    roleName: data.roleName,
    email: data.email,
    phoneNumber: data.phoneNumber
  });

  if (response && response.data && response.data.accessToken) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response;
} catch (error){
  return error;
}
}