document.addEventListener("DOMContentLoaded", () => {
  const tg = window.Telegram.WebApp;
  tg.expand();

  // DOM elements
  const welcomeMessage = document.getElementById("welcome-message");
  const openModalButton = document.getElementById("open-modal");
  const modal = document.getElementById("modal");
  const closeModalButton = document.getElementById("close-modal");
  const roomForm = document.getElementById("room-form");

  // Set welcome message
  welcomeMessage.textContent = `Hello, ${tg.initDataUnsafe.user?.first_name || "User"}!`;

  // Open modal
  openModalButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  // Close modal
  closeModalButton.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Form submission
  roomForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const roomName = document.getElementById("room-name").value.trim();
    const trophies = document.getElementById("trophies").value;
    const elo = document.getElementById("elo").value;

    if (!roomName || isNaN(trophies) || isNaN(elo)) {
      alert("Please fill all fields correctly.");
      return;
    }

    const roomData = {
      roomName,
      trophies: Number(trophies),
      elo: Number(elo),
    };

    tg.sendData(JSON.stringify(roomData));
    modal.classList.add("hidden");
    alert("Room created successfully!");
  });
});
