import api from "../API";

export async function getPosts() {
    return await api.get("/products")
}