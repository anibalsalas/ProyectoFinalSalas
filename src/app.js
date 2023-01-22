const pintarProductos = () => {
   // console.log(productos)
   const contenedor = document.getElementById('lista-productos')
  fetch('./src/components/data/stock.json')
    .then(resp => resp.json())//objeto response, se parsea con .json se obtiene
    .then(data =>{
      data.forEach(producto => {
         const div = document.createElement('div');
         div.classList.add('cardp');
         div.innerHTML += `
            <img src="${producto.img}" class="card-img-top ofertas position-relative top-0 start-50 translate-middle-x" alt="compras"> 
            <hr>
            <h6 class="text-center my-2">${producto.marca}</h6>
            <div class="productoDesc">
               <h5 class="card-title text-center card-botom">${producto.desc}</h5>
            </div>
            <div class="flex__precio">
               <p>S/</p>
               <h4 class="fw-bold precio_final"> ${producto.precio} </h4>
            </div>
            <div class='espacioAdd'>
               <a href="#" class="add__producto" id="${producto.id}" ><img src='public/img/add48.png' class="agregarCarrito">  Agregar al Carrito</a>
            </div>
           </div>
                `
                contenedor.appendChild(div)
        });
    })



}


pintarProductos()



////////////////////////////////////


