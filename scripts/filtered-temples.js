document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  const isOpen = navMenu.style.display === "flex";
  navMenu.style.display = isOpen ? "none" : "flex";
  hamburger.textContent = isOpen ? "☰" : "✖"; // toggle symbol
});

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // Add more temple objects here...
  {
    templeName: "Birmingham England Temple",
    location: "Birmingham, England",
    dedicated: "2000, July, 16",
    area: 10000,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/birmingham-england/400x250/birmingham-england-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Tokyo Japan Temple",
    location: "Tokyo, Japan",
    dedicated: "1980, October, 27",
    area: 102000,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/tokyo-japan/400x250/tokyo-japan-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253000,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake/400x250/salt-lake-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Newcastle England Temple",
    location: "Newcastle, England",
    dedicated: "2019, November, 17",
    area: 10000,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/newcastle-england/400x250/newcastle-england-temple-lds-273999-wallpaper.jpg"
  }
];
const container = document.querySelector("#album");

function renderTemples(filteredTemples) {
  container.innerHTML = "";

  filteredTemples.forEach(temple => {
    const card = document.createElement("div");
    card.classList.add("temple-card");

    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.loading = "lazy"; // native lazy loading

    const name = document.createElement("h2");
    name.textContent = temple.templeName;

    const location = document.createElement("p");
    location.textContent = `Location: ${temple.location}`;

    const dedicated = document.createElement("p");
    dedicated.textContent = `Dedicated: ${temple.dedicated}`;

    const area = document.createElement("p");
    area.textContent = `Area: ${temple.area.toLocaleString()} sq ft`;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(location);
    card.appendChild(dedicated);
    card.appendChild(area);

    container.appendChild(card);
  });
}

function getYear(dateStr) {
  return parseInt(dateStr.split(",")[0]);
}

renderTemples(temples);

document.querySelector("#home").addEventListener("click", e => {
  e.preventDefault();
  renderTemples(temples);
});

document.querySelector("#old").addEventListener("click", e => {
  e.preventDefault();
  renderTemples(temples.filter(t => getYear(t.dedicated) < 1900));
});

document.querySelector("#new").addEventListener("click", e => {
  e.preventDefault();
  renderTemples(temples.filter(t => getYear(t.dedicated) > 2000));
});

document.querySelector("#large").addEventListener("click", e => {
  e.preventDefault();
  renderTemples(temples.filter(t => t.area > 90000));
});

document.querySelector("#small").addEventListener("click", e => {
  e.preventDefault();
  renderTemples(temples.filter(t => t.area < 10000));
});
