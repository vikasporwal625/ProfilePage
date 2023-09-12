import api from "../API";

export async function getUsers() {
    return await api.get("/users")
}