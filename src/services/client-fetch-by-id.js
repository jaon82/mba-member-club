import { apiConfig } from "./api-config";

export async function clientFetchById(clientId) {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/clients/${clientId}`);
    if (response.status === 404) {
      alert("ID inexistente");
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    alert("Erro ao buscar cliente");
  }
}
