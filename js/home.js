const productos = []; // Declara productos como una variable global

const pintarProductos = (data) => {
  const contenedor = document.querySelector(".todos-productos");
  data.forEach(producto => {
    const div = document.createElement("a");
    div.innerHTML += `
      <div>
        <img class="jordan" src="${producto.img}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <button class="agregar alcarrito" id="${producto.id}">Añadir al carro</button>
        <p>${producto.descripcion}</p>
      </div>
    `;
    contenedor.appendChild(div);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  fetch('../data/stock.json')
    .then(response => response.json())
    .then(data => {
      productos.push(...data)
      pintarProductos(productos)
      cargarCarrito();
    })
    .catch(error => {
      console.error('Error al obtener los datos:', error);
    });
});
