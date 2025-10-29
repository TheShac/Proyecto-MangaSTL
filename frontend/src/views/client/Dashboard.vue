<template>
  <div class="container pt-5">
    
    <section class="text-center pt-5 pb-4">
      <h1 class="display-4 fw-bolder text-dark mb-3">
        Tu tienda de mangas, comics y figuras
      </h1>
      <p class="lead text-muted mb-5">
        Descubre la mejor colección de mangas, comics y figuras coleccionables. Calidad garantizada y envíos a todo el país.
      </p>
      
      <div class="d-grid gap-3 d-sm-flex justify-content-sm-center">
        <router-link to="/catalogo" class="btn btn-dark btn-lg px-4 me-sm-3 fw-bold">
          Ver Catálogo
        </router-link>
        <router-link to="/ofertas" class="btn btn-outline-secondary btn-lg px-4">
          Ofertas Especiales
        </router-link>
      </div>
    </section>

    <section class="py-5">
      <h2 class="h4 border-bottom pb-2 mb-4">Productos Destacados</h2>
      
      <div class="row row-cols-2 row-cols-md-4 g-4">
        
        <div class="col">
          <div class="card h-100 shadow-sm border-0 position-relative">
            <span class="badge bg-danger position-absolute top-0 start-0 m-2">-20%</span>
            <img src="https://picsum.photos/300/400?random=1" class="card-img-top" alt="Producto 1" style="height: 300px; object-fit: cover;">
            <div class="card-body">
              <h5 class="card-title text-truncate fw-semibold">Manga: Ataque a los Titanes</h5>
              <p class="card-text text-muted small">Manga / Acción</p>
              <p class="h5 text-warning fw-bold mt-2">$12.990</p>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card h-100 shadow-sm border-0">
            <img src="https://picsum.photos/300/400?random=2" class="card-img-top" alt="Producto 2" style="height: 300px; object-fit: cover;">
            <div class="card-body">
              <h5 class="card-title text-truncate fw-semibold">Comic: Spider-Man Vol. 1</h5>
              <p class="card-text text-muted small">Comic / Marvel</p>
              <p class="h5 text-dark fw-bold mt-2">$18.500</p>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card h-100 shadow-sm border-0">
            <img src="https://picsum.photos/300/400?random=3" class="card-img-top" alt="Producto 3" style="height: 300px; object-fit: cover;">
            <div class="card-body">
              <h5 class="card-title text-truncate fw-semibold">Figura: Goku Super Saiyan</h5>
              <p class="card-text text-muted small">Figura / Dragon Ball</p>
              <p class="h5 text-dark fw-bold mt-2">$45.000</p>
            </div>
          </div>
        </div>
        
        <div class="col">
          <div class="card h-100 shadow-sm border-0">
            <img src="https://picsum.photos/300/400?random=4" class="card-img-top" alt="Producto 4" style="height: 300px; object-fit: cover;">
            <div class="card-body">
              <h5 class="card-title text-truncate fw-semibold">Manga: Demon Slayer Vol. 1</h5>
              <p class="card-text text-muted small">Manga / Shonen</p>
              <p class="h5 text-dark fw-bold mt-2">$12.990</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>