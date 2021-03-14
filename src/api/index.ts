const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || '/api';

const fetchFromAPI = (endpoint: string) => {
    return fetch(`${API_ENDPOINT}/${endpoint}`).then(response => response.json());
};

const postToApi = (endpoint: string, body: object) => {
    return fetch(`${API_ENDPOINT}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(response => response.json());
};

const putToApi = (endpoint: string, id: number, body: object) => {
    return fetch(`${API_ENDPOINT}/${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(response => response.json());;
};

const deleteFromApi = (endpoint: string, id: number) => {
    return fetch(`${API_ENDPOINT}/${endpoint}/${id}`, {
        method: 'DELETE'
    }).then(response => response.json());;
};

export {
    fetchFromAPI,
    postToApi,
    putToApi,
    deleteFromApi
};