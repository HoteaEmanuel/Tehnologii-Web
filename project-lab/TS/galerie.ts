// Array cu imaginile din folderul ../MEDIA
const images: string[] = [
  "../MEDIA/g1.jpeg",
  "../MEDIA/g2.jpeg",
  "../MEDIA/g3.jpeg",
  "../MEDIA/g4.jpeg",
];

// Obtinem elementul principal din DOM
const mainImage = document.getElementById("carousel-image") as HTMLImageElement;

// Verificam daca elementul exista
if (!mainImage) throw new Error("Elementul #carousel-image nu exista in pagina");

let currentIndex = 0;

// Functie care schimba imaginea mare
function showNextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  mainImage.src = images[currentIndex]!;
}

// Slider automat la 3 secunde
setInterval(showNextImage, 3000);
