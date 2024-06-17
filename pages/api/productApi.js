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

export const addProduct = (product, token) => {
    return fetch(`${API}/addproduct`, {
        method: "POST",
        headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        // body: JSON.stringify(product)
        body: product
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const getproduct = (id) => {
    return fetch(`${API}/productdetails/${id}`)
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const updateProduct = (id, product, token) => {
    return fetch(`${API}/updateproduct/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const getFilteredProducts = (filter) => {
    return fetch(`${API}/getfilteredproducts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filter)
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}