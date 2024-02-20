import api from "./api"

export const login = async (data) => {
  const endpoint = '/login'
return await api.post(endpoint, {
    username: data.username,
    password: data.password
  }
) .then((response) => {
//  const data = response 
//  if (data && data.accessToken) {
//   localStorage.setItem('user', JSON.stringify(data));
// }

return response
}).catch((error) => {
  return error
})

}