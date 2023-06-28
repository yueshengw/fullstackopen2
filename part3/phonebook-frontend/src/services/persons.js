import axios from 'axios'

const baseURL = '/api/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const addPerson = personObject => {
    const request = axios.post(baseURL, personObject)
    return request.then(response => {
        console.log(response)
        return response.data
    })
}

const updatePerson = ( personObject) => {
    const { id } = personObject
    const request = axios.put(`${baseURL}/${id}`, personObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const personService = { getAll, addPerson, updatePerson, deletePerson }

export default personService