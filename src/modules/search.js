import { clientFetchById } from "../services/client-fetch-by-id";
import { clientShow } from "./show";

const form = document.querySelector("form");
const searchInput = document.querySelector("#cardId");
const main = document.querySelector("main");

form.onsubmit = async (event) => {
  event.preventDefault();
  main.classList.add("hide");
  const clientId = searchInput.value.trim();
  searchInput.value = "";
  searchInput.blur();
  if (!/^[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{3}$/.test(clientId)) {
    alert("ID inválido");
    return;
  }
  const client = await clientFetchById(clientId);
  if (client) {
    clientShow(client);
    main.classList.remove("hide");
  }
};
