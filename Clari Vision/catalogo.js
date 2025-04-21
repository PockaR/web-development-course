$(function() {
    const productos = [
      { nombre: "Lentes Classic", marca: "Urban", genero: "Ambos", color: "Negro", precio: "120", imagen: "producto1.jpg" },
      { nombre: "Lentes Urban", marca: "Classic", genero: "Hombre", color: "Azul", precio: "140", imagen: "producto2.jpg" },
      { nombre: "Lentes Red Light", marca: "Classic", genero: "Mujer", color: "Rojo", precio: "100", imagen: "producto3.jpg" },
      { nombre: "Lentes Sport", marca: "Sport", genero: "Ambos", color: "Negro", precio: "130", imagen: "producto4.jpg" },
    ];
    const itemsPorPagina = 9;
    let paginaActual = 1;
  
    function filtrar() {
      const marca = $('#filtro-marca').val();
      const genero = $('#filtro-genero').val();
      const color = $('#filtro-color').val();
      return productos.filter(p =>
        (!marca || p.marca === marca) &&
        (!genero || p.genero === genero) &&
        (!color || p.color === color)
      );
    }
  
    function renderizarPage(lista) {
      const inicio = (paginaActual - 1) * itemsPorPagina;
      const fin = inicio + itemsPorPagina;
      return lista.slice(inicio, fin);
    }
  
    function renderizarProductos() {
      const filtrados = filtrar();
      const pageItems = renderizarPage(filtrados);
      const container = $('#lista-productos').empty();
  
      if (pageItems.length === 0) {
        container.append('<p class="text-center">No hay productos.</p>');
        return;
      }
      pageItems.forEach(p => {
        container.append(`
          <div class="col-md-4">
            <div class="card">
              <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
              <div class="card-body text-center">
                <h5 class="card-title">${p.nombre}</h5>
                <p>${p.marca} | ${p.genero} | ${p.color}</p>
                <p class="precio">S/ ${p.precio}</p>
                <button class="btn">Agregar al carrito</button>
              </div>
            </div>
          </div>
        `);
      });
      renderizarPaginacion(filtrados.length);
    }
  
    function renderizarPaginacion(totalItems) {
      const totalPags = Math.ceil(totalItems / itemsPorPagina);
      const pagNav = $('#paginacion').empty();
      for (let i = 1; i <= totalPags; i++) {
        pagNav.append(`
          <li class="page-item ${i === paginaActual ? 'active' : ''}"><a class="page-link" href="#">${i}</a></li>
        `);
      }
      $('.page-link').click(function(e) {
        e.preventDefault();
        paginaActual = Number($(this).text());
        renderizarProductos();
      });
    }
  
    $('#filtro-marca, #filtro-genero, #filtro-color').change(() => {
      paginaActual = 1;
      renderizarProductos();
    });
  
    renderizarProductos();
  });
  