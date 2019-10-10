<template>
  <section id="listProdVendidos">
    <article class="container text-white div_trans8 divPadding" v-if="totalProd>0">       
        <h2>Listado de Productos Vendidos</h2>

          <table class="table text-white">
              <thead>
                  <tr>                    
                      <th width="40%">Producto</th>
                      <th width="20%">Proveedor</th>                      
                      <th width="10%" class="center">Costo</th>
                      <th width="10%" class="center">Vta Diaria</th>           
                      <th width="10%" class="center">Lead Time</th>                                    
                      <th width="10%" class="center">Punto ReOrden</th>                       
                  </tr>
              </thead>
              <tfoot>
                  <tr>                     
                      <th colspan="6"></th>
                  </tr>
              </tfoot>                    
              <tbody>
                  <tr v-for="(producto, index) in productosVendidos" :key="index">                 
                      <td class="left"> {{ producto.nombre }}</td>
                      <td class="left"> {{ producto.proveedor }}</td>                      
                      <td class="right"> {{ producto.precio_costo }}</td>
                      <td class="right"> {{ producto.ventaDiaria.toFixed(2) }}</td>
                      <td class="right"> {{ producto.leadTime }}</td>                      
                      <td class="right"> {{ producto.puntoReOrden.toFixed(2) }}</td>                        
                  </tr>               
              </tbody>
          </table>
          <p></p>
            
    </article>
    <article class="container text-white div_trans8 divPadding" v-else>       
        <h2>Listado de Productos Vendidos</h2> 
        <p>No hay Productos para mostrar</p>
    </article> 
  </section>
</template>
<script>
import ProductosService from "@/services/productosService";
import VentasService from "@/services/ventasService";
import ProveedoresService from "@/services/proveedoresService";
export default {
  name: "listProdVendidos",
  data() {
    return {
      inputError: "",
      productos: ProductosService.getAllProd(),
      ventas: VentasService.getAllVentas(),
      proveedores: ProveedoresService.getAllProv(),
      groupedProductos: [],
      productosVendidos: [],
      prodVendido: {
        id: 0,
        idProveedor: "",
        nombre: "",
        precio_costo: 0,
        precio_venta: 0,
        puntoReOrden: 0,
        stock: 0
      },
      errors: []
    };
  },

  computed: {
    totalProd() {
      return this.ventas.length;
    }
  },

  methods: {
    buscoProducto() {
      
    }
  },

  created() {
      this.groupedProductos = this.ventas.reduce((curr, next) => {
        if (curr[next.idProducto]) {
          curr[next.idProducto] += 1;
        } else {
          curr[next.idProducto] = 1;
        }
        return curr;
      }, {});
  },

  beforeMount() {
      this.productosVendidos = Object.keys(this.groupedProductos).map(key => ({
        id: key,
        nombre: "",
        proveedor: "",
        precio_costo: 0,
        leadTime: 0,
        puntoReOrden: 0,        
        ventaDiaria: this.groupedProductos[key].toString()
      }));
      for(let i=0;i<this.productosVendidos.length;i++){
        let flag = false;
        for(let j=0;j<this.productos.length && !flag;j++){
          if(this.productos[j].id == this.productosVendidos[i].id){           
            this.prodVendido = this.productos[j];
            flag = true;
          }
        }
        flag = false;
        for(let j=0;j<this.proveedores.length && !flag;j++){
          if(this.prodVendido.idProveedor == this.proveedores[j].id){
            this.productosVendidos[i].proveedor = this.proveedores[j].nombre;
            this.productosVendidos[i].leadTime = this.proveedores[j].lead_time;  
            flag = true;          
          }
        }
        this.productosVendidos[i].nombre = this.prodVendido.nombre; 
        this.productosVendidos[i].ventaDiaria = +this.productosVendidos[i].ventaDiaria / 30; 
        this.productosVendidos[i].precio_costo = this.prodVendido.precio_costo;
        this.productosVendidos[i].puntoReOrden = this.productosVendidos[i].ventaDiaria * this.productosVendidos[i].leadTime;                        
      }
  }
};
</script>
