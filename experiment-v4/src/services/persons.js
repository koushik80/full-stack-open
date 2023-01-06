import axios from "axios";
const baseUrl = "/api/persons";

const getPeople = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
};

const create = personObject => {
  const request = axios.post(baseUrl, personObject)
  return request.then(response => {
    return response.data
  })
};

const update = (id, personObject) => {
  console.log(`update ${id} ${personObject.name}`)
  const request = axios.put(`${baseUrl}/${id}`, personObject)
  return request.then(response => {
    return response.data
  })
};

const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => {
    return response.data
  })
};

const connectPersonsServer = { getPeople, create, update, remove }

export default connectPersonsServer;