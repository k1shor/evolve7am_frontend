const API = "http://localhost:5000/api"

export const getAllCategories = () => {
    return fetch(`${API}/getallcategories`)
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const deleteCategory = (id,token) => {
    return fetch(`${API}/deletecategory/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}