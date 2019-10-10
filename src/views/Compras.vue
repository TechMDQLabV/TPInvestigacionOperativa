<template>
  <section id="compras">
    <article class="container text-white div_trans8 divPadding" v-if="totalProd>0">       
        <h2>Registro de Compras</h2>

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
                      <th width="10%" class="center">New Stock</th>                                           
                      <th width="10%" class="center">Punto ReOrden</th>                        
                  </tr>
              </thead>
              <tfoot>
                  <tr>
                      <th></th>
                      <th></th>                      
                      <th class="left">Total: {{ totalProd }}</th>
                      <th colspan="6"></th>
                  </tr>
              </tfoot>                    
              <tbody>
                  <tr v-for="(producto, index) in productos" :key="index">                 
                      <td class="right"><a class="btn" data-toggle="tooltip" v-bind:title='"Modificar a "+producto.nombre' @click="modifProd(producto)"><img src="@/assets/images/b_edit.png" border="0"></a></td>                    
                      <td class="right"><a class="btn" data-toggle="tooltip" v-bind:title='"Eliminar a "+producto.nombre' @click="borrarProd(producto)"><img src="@/assets/images/b_del.png" border="0"></a></td>
                      <td class="left" :class="colorText(producto)"> {{ producto.nombre }}</td>
                      <td :class="colorText(producto)"> {{ producto.precio_venta }}</td>
                      <td :class="colorText(producto)"> {{ producto.precio_costo }}</td>
                      <td :class="colorText(producto)"> {{ producto.stock }}</td>                      
                      <td :class="colorText(producto)"> {{ producto.Q }}</td>
                      <td><input id="newStock" type="number" class="form-control" v-model="producto.stock" value="0"></td>                                             
                      <td :class="colorText(producto)"> {{ producto.puntoReOrden }}</td>                        
                  </tr>
                  <tr v-if="totalProd===0">                 
                      <td colspan="9"> NO hay productos</td>
                  </tr>                  
              </tbody>
          </table>
          <div class="form-group">
            <div class="form-group col-md-5"></div>                     
            <div class="form-group col-md-2">
              <button type="submit" class="form-control btn btn-primary" @click="guardarLista()">Guardar</button>
            </div>
            <div class="form-group col-md-5"></div>             
          </div>             
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
  name: "compras",
  data() {
    return {     
      inputError: "",
      productos: ProductosService.getAllProd(),
      errors: []
    };
  },

  computed: {
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
    },

    guardarLista() {
      ProductosService.saveProd(this.productos);
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

  watch: {}
};
</script>
