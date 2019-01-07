import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `http://ec2-54-88-181-123.compute-1.amazonaws.com:8081`
  })
}