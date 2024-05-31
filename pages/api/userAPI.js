export const register = (user) => {
    return fetch(`http://localhost:5000/api/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => { return response.json() })
        .catch(error => { return console.log(error) })
}