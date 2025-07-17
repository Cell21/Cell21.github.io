function searchCard() {
  const input = document.getElementById("searchInput").value;
  const resultsDiv = document.getElementById("results");

  // Clear previous results
  resultsDiv.innerHTML = "Searching...";

  // Fetch data from mtg.io API
  fetch(`https://api.magicthegathering.io/v1/cards?name=${encodeURIComponent(input)}`)
    .then(response => response.json())
    .then(data => {
      const cards = data.cards;

      if (cards.length === 0) {
        resultsDiv.innerHTML = "No cards found.";
        return;
      }

      // Show cards
      resultsDiv.innerHTML = "";
      cards.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.style.marginBottom = "1em";

        cardElement.innerHTML = `
          <strong>${card.name}</strong><br>
          ${card.imageUrl ? `<img src="${card.imageUrl}" style="width:200px;">` : "No image available"}<br>`;

        resultsDiv.appendChild(cardElement);
      });
    })
    .catch(error => {
      console.error("Error fetching cards:", error);
      resultsDiv.innerHTML = "Something went wrong. Try again.";
    });
}
