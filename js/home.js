const pintarProductos = (data) => {
  const contenedor = document.querySelector(".todos-productos");
  data.forEach(productos => {
    const div = document.createElement("a"); 
    div.innerHTML += 
    `<div>
          <img class="jordan" src="${productos.img}" alt="${productos.nombre}">
          <h3>${productos.nombre}</h3>
          <button class="agregar alcarrito" id= ${productos.id}>Añadir al carro</button>
          <p>${productos.descripcion}</p>
      </div>
    `
    contenedor.appendChild(div); 
  });
};
document.addEventListener("DOMContentLoaded", () => {
  pintarProductos(productos);
  cargarCarrito();
});
