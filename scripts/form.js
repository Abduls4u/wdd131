// // Product data array
// const products = [
//   { id: "p1", name: "Super Blender 3000" },
//   { id: "p2", name: "Smart Toaster Pro" },
//   { id: "p3", name: "Eco Kettle" },
//   { id: "p4", name: "Air Purifier Max" },
//   { id: "p5", name: "Coffee Maker Deluxe" }
// ];

const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

// Populate dropdown dynamically
const select = document.getElementById("productName");
products.forEach(product => {
  const option = document.createElement("option");
  option.value = product.name;
  option.textContent = product.name;
  select.appendChild(option);
});
