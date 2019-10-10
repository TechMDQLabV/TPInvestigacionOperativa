<template>
  <div id="app">

      <nav class="navbar navbar-inverse">
        <div class="container div_trans8">
          <header>
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-1">
                <span class="sr-only">Menu</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            <div class="collapse navbar-collapse" id="navbar-1">
              <ul class="nav navbar-nav">
                <li><router-link to="/" title="Home"><span class="glyphicon glyphicon-home"></span> Home</router-link></li>

                <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#" title="Alta - Baja - Listados y Modificaciones de Proveedores">Proveedores <span class="caret"></span></a>
                  <ul class="dropdown-menu">
                    <li><router-link to="/addProv" data-toggle="tooltip" title="Alta de Proveedores">Alta</router-link></li>
                    <li><router-link to="/listProv" data-toggle="tooltip" title="Listado de Proveedores">Listado</router-link></li>
                  </ul>
                </li>

                <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="javascript:void(0);" title="Alta - Baja - Listados y Modificaciones de Productos">Productos <span class="caret"></span></a>                <ul class="dropdown-menu">
                    <li><router-link to="/addProd" data-toggle="tooltip" title="Alta de Productos">Alta</router-link></li>
                    <li><router-link to="/compras" data-toggle="tooltip" title="Compra de Productos">Compras</router-link></li>                    
                    <li><router-link to="/listProd" data-toggle="tooltip" title="Listado de Productos">Listado</router-link></li>
                    <li><router-link to="/listProdVendidos" data-toggle="tooltip" title="Listado de Productos Vendidos">Listado Productos Vendidos</router-link></li>                    
                  </ul>
                </li>

                <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="javascript:void(0);" title="Registro y Consulta de Ventas">Ventas <span class="caret"></span></a>                <ul class="dropdown-menu">
                    <li><router-link to="/ventas" data-toggle="tooltip" title="Registro de Ventas">Registro de Ventas</router-link></li>
                    <li><router-link to="/listVentas" data-toggle="tooltip" title="Listado de Ventas">Listado de Ventas</router-link></li>                  
                  </ul>
                </li>

                <li><router-link to="/" title="Historial de Facturación">Facturas</router-link></li>                
                <li><router-link to="/" title="Calculo de Pedidos">Pedidos</router-link></li>

              </ul>
          </div>
          </header>
        </div>
      </nav>

    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>


<style>
@import "assets/css/main.css";
</style>
