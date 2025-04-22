$(function() {
    const productos = [
      { nombre: "DD052", marca: "Shaddai", genero: "Hombre", color: "Negro", precio: "120", imagen: "DD052.jpg" },
      { nombre: "3042", marca: "Carlos Rossi", genero: "Unisex", color: "Negro", precio: "140", imagen: "3042.jpg" },
      { nombre: "J2105", marca: "Feillis", genero: "Mujer", color: "Rosa", precio: "100", imagen: "J2105.jpg" },
      { nombre: "91725", marca: "Viola Milano", genero: "Unisex", color: "Marrón", precio: "130", imagen: "91725.jpg" },
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
                <h5 class="card-title">${p.marca}</h5>
                <p>${p.nombre} | ${p.genero} | ${p.color}</p>
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
  