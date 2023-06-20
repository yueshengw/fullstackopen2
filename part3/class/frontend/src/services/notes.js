import axios from 'axios'
const baseURL = '/api/notes'

const getAll = () => {
    const request = axios.get(baseURL)
    // const nonExisting = {
    //     id: 10000,
    //     content: 'This note is not saved to server',
    //     date: '2079',
    //     important: true,
    // }
    // return request.then(response => response.data.concat(nonExisting))
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update }