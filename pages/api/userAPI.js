
const API = "http://localhost:5000/api"

export const register = (user) => {
    return fetch(`${API}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => { return response.json() })
        .catch(error => { return console.log(error) })
}

export const login = (user) => {
    return fetch(`${API}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => { return response.json() })
        .catch(error => { return console.log(error) })
}

export const authenticate = (data) => {
    localStorage.setItem('jwt', JSON.stringify(data))
}

export const verifyUser = (token) => {
    return fetch(`${API}/verifyuser/${token}`)
        .then(response => { return response.json() })
        .catch(error => { return console.log(error) })

}

export const isAuthenticated = async () => {
    return localStorage.getItem('jwt') ? await JSON.parse(localStorage.getItem('jwt')) : false
}

export const logout = () => {
    return fetch(`${API}/logout`)
        .then(response => { return response.json() })
        .catch(error => { return console.log(error) })
}