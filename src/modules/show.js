const avatarImg = document.querySelector(".avatar img");
const clientName = document.querySelector(".user-name");
const membershipDate = document.querySelector(".user-membership-date");
const cutCount = document.querySelector("#js-cut-count");
const history = document.querySelector(".history-items");
const cardId = document.querySelector(".card-id > span");
const cutSlots = document.querySelectorAll(".slots-item");
const cutsRemaining = document.querySelector(".counting-container > span");
const cutsProgressText = document.querySelector(
  ".counting-bar-container > span"
);
const progressIndicator = document.querySelector(".progress-indicator");
const modal = document.querySelector("#js-modal");

function clearInfo() {
  avatarImg.src = `src/assets/user.jpg`;
  clientName.textContent = "";
  membershipDate.textContent = "";
  cutCount.textContent = "";
  history.innerHTML = "";
  cutSlots.forEach((cutSlot, index) => {
    if (index < 9) {
      cutSlot.innerHTML = "";
    } else {
      cutSlot.innerHTML = '<i class="ph ph-gift"></i>';
    }
  });
}

export const clientShow = (client) => {
  //Limpar informações
  clearInfo();
  //Exibir dados do usuário
  avatarImg.src = `src/assets/${client.id}.jpg`;
  clientName.textContent = client.name;
  membershipDate.textContent = `Cliente desde ${client.clientSince}`;
  //Exibir dados do histórico
  const cuts = client.loyaltyCard.totalCuts;
  cutCount.textContent = `${cuts} ${cuts > 0 ? "cortes" : "corte"}`;
  for (const appointment of client.appointmentHistory) {
    const itemDate = document.createElement("span");
    itemDate.className = "item-date";
    itemDate.textContent = appointment.date;
    const itemTime = document.createElement("div");
    itemTime.className = "item-time";
    itemTime.textContent = appointment.time;
    const itemMoment = document.createElement("div");
    itemMoment.className = "item-moment";
    itemMoment.append(itemDate);
    itemMoment.append(itemTime);
    const itemCheck = document.createElement("div");
    itemCheck.className = "item-check-container";
    itemCheck.innerHTML = '<i class="ph ph-seal-check"></i>';
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    historyItem.append(itemMoment);
    historyItem.append(itemCheck);
    history.append(historyItem);
  }
  //Exibir dados do cartão fidelidade
  cardId.textContent = client.id;
  cutSlots.forEach((cutSlot, index) => {
    if (index < cuts) {
      cutSlot.innerHTML = '<img src="./src/assets/PinCheck.png" />';
    }
  });
  //Exibir progresso
  const cutsRemainingNumber = client.loyaltyCard.cutsRemaining;
  cutsRemaining.textContent = `${cutsRemainingNumber} ${
    cutsRemainingNumber > 1 ? "cortes restantes" : "corte restante"
  }`;
  cutsProgressText.textContent = `${client.loyaltyCard.totalCuts} de  ${client.loyaltyCard.cutsNeeded}`;
  const progressPercentage =
    (client.loyaltyCard.totalCuts * 100) / client.loyaltyCard.cutsNeeded;
  progressIndicator.style.width = `${progressPercentage}%`;
  if (progressPercentage === 100) {
    modal.classList.remove("modal-hidden");
    modal.classList.add("modal");
    setTimeout(() => {
      modal.classList.remove("modal");
      modal.classList.add("modal-hidden");
    }, 2000);
  }
};
