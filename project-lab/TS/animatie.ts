// Animatie pentru pagina principala: cardurile apar pe rand, glisand de jos in sus
const cards = document.querySelectorAll<HTMLElement>(".column");

cards.forEach((card, index) => {
  // Starea de pornire: invizibil si coborat cu 30px
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;

  // Dupa urmatorul frame trecem la starea finala, ca sa porneasca tranzitia
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    });
  });
});
