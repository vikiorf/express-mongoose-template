// import axios from 'axios'

const authHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user && user.token) {
    return { 'x-access-token': user.token }
  } else {
    return {}
  }
}

export { authHeaders }
