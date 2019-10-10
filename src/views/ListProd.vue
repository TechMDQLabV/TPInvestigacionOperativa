<template>
  <section id="listProd">
    <article class="container text-white div_trans8 divPadding" v-if="totalProd>0">       
        <h2>Listado de Productos</h2>

          <div class="form-group left">
              <div class="form-check checkbox-inline">
                  <label>Listar</label>
              </div>
              <div class="form-check checkbox-inline">
                  <input id="listTotal" type="radio" name="listado" v-model="listado" class="form-check-input cursorHand" value="T" title="Mostrar Todos los Productos"><label title="Mostrar Todos los Productos" for="listTotal" class="form-check-label cursorHand">Todos</label>
              </div>
              <div class="form-check checkbox-inline">
                  <input id="bajoStock" type="radio" name="listado" v-model="listado" class="form-check-input cursorHand" value="M" title="Mostrar Productos con Bajo Stock"><label title="Mostrar Productos con Bajo Stock" for="bajoStock" class="form-check-label cursorHand">Stock Bajo</label>
              </div>
          </div>  

          <table class="table text-white">
              <thead>
                  <tr>
                      <th width="5%"></th>
                      <th width="5%"></th>                      
                      <th width="40%">Producto</th>
                      <th width="10%" class="center">Precio Venta</th>
                      <th width="10%" class="center">Costo</th>
                      <th width="10%" class="center">Stock</th>                      
                      <th width="10%" class="center">A Comprar</th>                          
                      <th width="10%" class="center">Punto ReOrden</th>                        
                  </tr>
              </thead>
              <tfoot>
                  <tr>
                      <th></th>
                      <th></th>                      
                      <th class="left">Total: {{ total }}</th>
                      <th colspan="5"></th>
                  </tr>
              </tfoot>                    
              <tbody>
                  <tr v-for="(producto, index) in list" :key="index">                 
                      <td class="right"><a class="btn" data-toggle="tooltip" v-bind:title='"Modificar a "+producto.nombre' @click="modifProd(producto)"><img src="@/assets/images/b_edit.png" border="0"></a></td>                    
                      <td class="right"><a class="btn" data-toggle="tooltip" v-bind:title='"Eliminar a "+producto.nombre' @click="borrarProd(producto)"><img src="@/assets/images/b_del.png" border="0"></a></td>
                      <td class="left" :class="colorText(producto)"> {{ producto.nombre }}</td>
                      <td :class="colorText(producto)"> {{ producto.precio_venta }}</td>
                      <td :class="colorText(producto)"> {{ producto.precio_costo }}</td>
                      <td :class="colorText(producto)"> {{ producto.stock }}</td>                      
                      <td :class="colorText(producto)"> {{ producto.Q }}</td>                          
                      <td :class="colorText(producto)"> {{ producto.puntoReOrden }}</td>                        
                  </tr>
                  <tr v-if="total===0">                 
                      <td colspan="8"> NO hay productos</td>
                  </tr>                  
              </tbody>
          </table>
    </article>
    <article class="container text-white div_trans8 divPadding" v-else>       
        <h2>Listado de Productos</h2> 
        <p>No hay Productos para mostrar</p>
    </article> 
  </section>
</template>
<script>
import ProductosService from "@/services/productosService";
export default {
  name: "listProd",
  data() {
    return {
      listado: "T",
      inputError: "",
      productos: ProductosService.getAllProd(),
      list: ProductosService.getAllProd(),
      errors: []
    };
  },

  computed: {
    total() {
      return this.list.length;
    },
    totalProd() {
      return this.productos.length;
    }
  },

  methods: {
    borrarProd(p) {
      this.hideModal;
      alert(p.id);
      ProductosService.deleteProd(p.id);
      this.listado = "T";
      this.people = ProductosService.getAllProd();
      this.list = ProductosService.getAllProd();
    },
    colorText(p) {
      let color;
      if (+p.stock < +p.puntoReOrden) {
        color = "text-red";
      } else {
        color = "text-white";
      }
      return color;
    }
  },

  beforeMount() {
      this.people = ProductosService.getAllProd();
      this.list = ProductosService.getAllProd();
  },

  watch: {
    listado: function() {
      if (this.listado === "T") {
        this.list = this.productos;
      } else {
        this.list = this.productos.filter(
          producto => producto.stock < producto.puntoReOrden
        );
      }
    }
  }
};
</script>
