
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const enviarCarritoBtn = document.querySelector('#enviar-carrito')
const listaProductos = document.querySelector('#lista-productos');
const btnalert = document.querySelector('.add__producto')

let articuloCarrito = []



cargarEventListeners()
function cargarEventListeners(){
    //Al presionar "Agregar al carrito"
    listaProductos.addEventListener('click', agregarProducto);
    //Elimina del carrito
    carrito.addEventListener('click', deleteProducto);
    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articuloCarrito = [] //reseteo el carrito
        vaciarHTML();//ELiminamos todo del HTML DOM
        actualizarTotalesCarrito(articuloCarrito);
        

    })
   //Muestra los productos de Local Storage
   document.addEventListener('DOMContentLoaded', () =>{
        articuloCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
        // return carritoStorage;
        carritoHTML();
   })
     

}


//FUNCIONES
//Agrega producto al carrito
function agregarProducto(e){
    e.preventDefault();

    if(e.target.classList.contains('add__producto')){
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);
        alertAdd();
    }

}

//Elimina producto del carrito
function deleteProducto(e){
    //console.log(e.target.classList);
     if(e.target.classList.contains('borrar-producto')){
        //console.log(e.target.getAttribute('id'));
        const productoID = e.target.getAttribute('id');
        //Elimino del array de articuloCarrito por el id
        articuloCarrito = articuloCarrito.filter(producto => producto.id !== productoID);
        localStorage.removeItem(articuloCarrito);
      //  console.log(articuloCarrito);
   
       carritoHTML();//itera sobre el carrito y muestra su HTML
       actualizarTotalesCarrito(articuloCarrito);
       //carritoHTML();
    //   sincronizaStorage();


     }

}

//Alerta confirmación 
function alertAdd(){
            Toastify({
            text: 'El producto se agrego al carrito',
            duration: 2000,
            gravity: 'bottom',
            position: 'right',
            style: {
                background: 'linear-gradient(to right, #00b09b, #96c92d)'
            }
        }).showToast()
    
    
}


//Lee 
function leerDatosProducto(producto){
  
    //console.log(producto)
    //crea un objeto con el contenido actual
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h5').textContent,
        precio: producto.querySelector('h4').textContent,
        id: producto.querySelector('a').getAttribute('id'),
        cantidad: 1
    }
    //Revisa si  ya existe en el carrito
    const existe = articuloCarrito.some( producto => producto.id === infoProducto.id );
    if(existe){
        const productos = articuloCarrito.map( producto =>{
            if(producto.id === infoProducto.id){
                producto.cantidad++;
                actualizarTotalesCarrito(articuloCarrito);
                return producto; //retorna el objeto actualizado
                
            } else {
                return producto;//retorna los objetos que no son los duplicados
                
            }
    
        });
        articuloCarrito = [...productos];
   
        
    }else {
        articuloCarrito = [...articuloCarrito, infoProducto];
        actualizarTotalesCarrito(articuloCarrito);

    }

}


//////////////////////////////////////////////////////////////


//TOTAL CARRITO

const actualizarTotalesCarrito = (articuloCarrito) => {
    const totalCantidad = articuloCarrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalCompra = articuloCarrito.reduce((acc, item) => acc + (parseFloat(item.precio) * parseFloat(item.cantidad)), 0);

    pintarTotalesCarrito(totalCantidad, totalCompra);
    carritoHTML();
   // sincronizaStorage();

    (totalCompra != 0)?(
    enviarCarritoBtn.addEventListener('click',() => {
        Swal.fire({
            title: 'Acceso',
            icon: 'info',
            text: 'Para Enviar el Pedido debe Iniciar Seción',
            showCancelButton: true,
            confirmButtonText: 'REGISTRARME',
            showLoaderOnConfirm: true,
            footer: '<a class="sesion" href="pages/login.html">Si ya tiene Usuario INGRESAR AQUÍ</a>',
      
    })
    })):(enviarCarritoBtn.addEventListener('click',() => {
        Swal.fire({
            icon: 'error',
            title: 'Carrito Vacio',
            text: 'Agregar productos al Carrito',
          })
    }))
};
//////////////////////////////////////////////////////////////

const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
    const contadorCarrito = document.getElementById('contador-carrito');
    const precioTotal = document.getElementById('precioTotal');

    contadorCarrito.innerText = totalCantidad;
    precioTotal.innerText = totalCompra;
    carritoHTML();
};
//////////////////////////////////////////////////////////////

function vaciarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

//Muestra el carrito de compras en el HTML

function carritoHTML(){
    //Limpia HTML
   limpiaHTML();
   
    //Recorre el carrito y genera el HTML
    articuloCarrito.forEach( producto =>{
     //  console.log(producto);
       const { imagen, titulo, precio, cantidad, id} = producto;     
        const row = document.createElement('tr');
        row.innerHTML = `
        
        <td class ="td-carrito">
            <img src="${imagen}" width="60">
        </td>
        <td class="td-carrito texto-titulo">
            ${titulo}
         </td>
        <td class ="td-carrito">
            ${precio}
        </td>
         <td class ="td-carrito">
           <p id = ${cantidad} class="texto-cantidad"> Cantidad : ${cantidad}</p>
        </td>
        <td>
            <a  href="#" class='borrar-producto' id=${id} > X </a>
         </td>
        `;
      
        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);

        //Agrega carrito al storage
       sincronizaStorage();
    });

    

    function sincronizaStorage(){
        localStorage.setItem('carrito', JSON.stringify(articuloCarrito));
    }

    

    //Elimina los productos del tbody
    function limpiaHTML(){
        contenedorCarrito.innerHTML = '';
       
    }

   
}

