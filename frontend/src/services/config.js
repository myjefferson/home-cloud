import api from "./api";

export const installCloud = async (dataCloud) => {
    return await api.post('/installCloud', dataCloud)
}