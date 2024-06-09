const API = "http://localhost:5000/api"

// to get all products
export const getAllProducts = () => {
    return fetch(`${API}/getallproducts`)
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const deleteProduct = (id, token) => {
    return fetch(`${API}/deleteproduct/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}