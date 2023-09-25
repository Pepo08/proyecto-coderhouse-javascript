let carrito = [];
const productoContenedor = document.querySelector(".todos-productos");

productoContenedor.addEventListener('click', (e) => {
  if (e.target.classList.contains('agregar')) {
    validarProductoEnCarrito(e.target.id);
    Toastify({
      text: "El producto se agregó correctamente al carrito",
      className: "notificacion",
      gravity: "top",
      position: "right",
      duration: 750,
      style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
      }
  }).showToast();
  }
});


const pintarProductoCarrito = (producto) => {
  const contenedor = document.getElementById('carrito-contenedor');
  const div = document.createElement('div');
  div.classList.add('productoEnCarrito');

  div.innerHTML = `
  <div id="prd${producto.id}">
    <p>${producto.nombre}</p>
    <p>$ ${producto.precio}</p>
    <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
    <button class="btn waves-effect waves-ligth boton-eliminar" id="btn${producto.id}" value="${producto.id}">X</button>
    </div>
    `;

  contenedor.appendChild(div);

  const botonEliminar = document.querySelector('#btn'+producto.id);
  botonEliminar.addEventListener('click', () => {
    eliminarProductoDelCarrito(producto.id)
    Toastify({
      text: "El producto fue eliminado del carrito",
      className: "notificacion",
      gravity: "bottom",
      position: "right",
      duration: 1000,
      style: {
          background: "linear-gradient(to right, #FF0000, #FF0000)",
      }
    }).showToast();
  });

  pintarTotalesCarrito();
};

const validarProductoEnCarrito = (id) => {
  const estaRepetido = carrito.some(producto => producto.id == id);
  const producto = productos.find(producto => producto.id == id);
  if (!estaRepetido) {
    // Si el producto no está en el carrito, agrégalo
    carrito.push({ ...producto, cantidad: 1 }); // Agregar cantidad al producto
    pintarProductoCarrito(producto);
  } else {
    // Si el producto ya está en el carrito, aumenta la cantidad y actualiza la vista
    const productoExistente = carrito.find(item => item.id == id);
    productoExistente.cantidad++;
    const cantidadElement = document.getElementById(`cantidad${producto.id}`);
    if (cantidadElement) {
      cantidadElement.innerText = `Cantidad: ${productoExistente.cantidad}`;
    }
  }

  guardarCarritoStorage();
  pintarTotalesCarrito();
};

function eliminarProductoDelCarrito(id) {
  carrito = carrito.filter(producto => producto.id !== id);

  localStorage.setItem("carrito", JSON.stringify(carrito));

  const prdHtml = document.querySelector('#prd' + id);
  if (prdHtml) {
    prdHtml.remove();
  }

  pintarTotalesCarrito();
}

const pintarTotalesCarrito = () => {
  const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const precioTotal = document.querySelector('#precioTotal');
  const contador = document.getElementById("contador-carrito")
  const cantTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  contador.innerText = cantTotal;
  precioTotal.innerText = totalCompra;
};

const guardarCarritoStorage = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const carritoStorage = JSON.parse(localStorage.getItem("carrito")) || [];

const cargarCarrito = () => {
  const carritoStorage = JSON.parse(localStorage.getItem("carrito")) || [];

  // Si hay productos en el carritoStorage, agrégalos al carrito actual
  carrito = carritoStorage;

  carrito.forEach(element => {
    pintarProductoCarrito(element);
  });

  pintarTotalesCarrito();
};

const vaciarCarrito = () => {
  const carritoStorage = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito = [];

  Swal.fire({
    title: '¿Estas seguro que quieres vaciar el carrito?',
    showDenyButton: true,
    confirmButtonText: 'Si',
    denyButtonText: `No`,
}).then((result) => {
    if (result.isConfirmed) {
    Swal.fire('El carrito fue vaciado con exito', '', 'success')
    carritoStorage.forEach(element => {
        const prdHtml = document.querySelector('#prd' + element.id);
        if (prdHtml) {
            prdHtml.remove();
        }
    });

    const precioTotal = document.querySelector('#precioTotal');
    precioTotal.innerText = 0;

    localStorage.setItem("carrito", JSON.stringify(carrito));

    pintarTotalesCarrito();
    } else if (result.isDenied) {
        Swal.fire('El carrito no fue vaciado', '', 'error')
    }
})
};

const btnVaciar = document.querySelector(".vaciarcarrito")
btnVaciar.addEventListener("click", vaciarCarrito)

