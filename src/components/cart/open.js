    const abrirCarrito = document.querySelector('#cesta');
    const cart = document.querySelector('.car')


    abrirCarrito.onclick = () => {
        cart.classList.add('active');
    };


  const cerrarcarrito = car => {
    document.getElementById(car).style.display = "none";
  }

  const opencarrito = car => {
    document.getElementById(car).style.display = "block";
  }
