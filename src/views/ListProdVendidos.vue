<template>
  <section id="listProdVendidos">
    <article class="container text-white div_trans8 divPadding" v-if="totalProd>0">       
        <h2>Listado de Productos Vendidos</h2>

          <table class="table text-white">
              <thead>
                  <tr>                    
                      <th width="30%">Producto</th>
                      <th width="20%">Proveedor</th>                      
                      <th width="10%" class="center">Costo</th>
                      <th width="10%" class="center">Vta Diaria</th>           
                      <th width="10%" class="center">Q</th>                      
                      <th width="10%" class="center">Lead Time</th>                                    
                      <th width="10%" class="center">Punto ReOrden</th>                       
                  </tr>
              </thead>
              <tfoot>
                  <tr>                     
                      <th colspan="7"></th>
                  </tr>
              </tfoot>                    
              <tbody>
                  <tr v-for="(producto, index) in productosVendidos" :key="index">                 
                      <td class="left"> {{ producto.nombre }}</td>
                      <td class="left"> {{ producto.proveedor }}</td>                       
                      <td class="right"> {{ producto.precio_costo }}</td>
                      <td class="right"> {{ producto.ventaDiaria.toFixed(2) }}</td>
                      <td class="right"> {{ producto.Q }}</td>                      
                      <td class="right"> {{ producto.leadTime }}</td>                      
                      <td class="right"> {{ producto.puntoReOrden }}</td>                        
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
import FacturasService from "@/services/facturasService";
export default {
  name: "listProdVendidos",
  data() {
    return {
      /*
      Z['0']:4.5,
      Z['0']:4.3,
      Z['0']:4.2,
      Z['0']:4.1,
      Z['0']:4,
      Z['0']:3.9,
      Z['0']:3.8,
      Z['0']:3.7,
      Z['0']:3.6,
      Z['0']:3.5,
      Z['0']:3.4,
      Z['0']:3.3,
      Z['0']:3.2,
      Z['0']:3.1,
      Z['0']:3,
      Z['0']:2.9,
      Z['0']:2.8,
      Z['0.001']:2.7,
      Z['0.001']:2.6,
      Z['0.001']:2.5,
      Z['0.001']:2.4,
      Z['0.002']:2.3,
      Z['0.003']:2.2,
      Z['0.004']:2.1,
      Z['0.005']:2,
      Z['0.006']:1.9,
      Z['0.008']:1.8,
      Z['0.011']:1.7,
      Z['0.018']:1.6,
      Z['0.023']:1.5,
      Z['0.025']:1.4,
      Z['0.037']:1.3,
      Z['0.046']:1.2,
      Z['0.05']:1.1,
      Z['0.069']:1,
      Z['0.083']:0.9,
      Z['0.1']:0.8,
      Z['0.12']:0.7,
      Z['0.143']:0.6,
      Z['0.169']:0.5,
      Z['0.198']:0.4,
      Z['0.23']:0.3,
      Z['0.267']:0.2,
      Z['0.307']:0.1,
      Z['0.351']:0,
      Z['0.399']:-0.1,
      Z['0.507']:-0.2,
      Z['0.567']:-0.3,
      Z['0.63']:-0.4,
      Z['0.698']:-0.5,
      Z['0.769']:-0.6,
      Z['0.843']:-0.7,
      Z['0.92']:-0.8,
      Z['1']:-0.9,
      Z['1.083']:-1,
      Z['1.169']:-1.1,
      Z['1.256']:-1.2,
      Z['1.346']:-1.3,
      Z['1.437']:-1.4,
      Z['1.529']:-1.5,
      Z['1.623']:-1.6,
      Z['1.718']:-1.7,
      Z['1.814']:-1.8,
      Z['1.918']:-1.9,
      Z['2.008']:-2,
      Z['2.106']:-2.1,
      Z['2.205']:-2.2,
      Z['2.303']:-2.3,
      Z['2.403']:-2.4,
      Z['2.502']:-2.5,
      Z['2.601']:-2.6,
      Z['2.701']:-2.7,
      Z['2.801']:-2.8,
      Z['2.901']:-2.9,
      Z['3']:-3,
      Z['3.1']:-3.1,
      Z['3.2']:-3.2,
      Z['3.3']:-3.3,
      Z['3.4']:-3.4,
      Z['3.5']:-3.5,
      Z['3.6']:-3.6,
      Z['3.7']:-3.7,
      Z['3.8']:-3.8,
      Z['3.9']:-3.9,
      Z['4']:-4,
      Z['4.1']:-4.1,
      Z['4.2']:-4.2,
      Z['4.3']:-4.3,
      Z['4.4']:-4.4,
      Z['4.5']:-4.5,
      */
      S: 160,
      H: 60,
      inputError: "",
      facturas: FacturasService.getUltimoMes(),
      productos: ProductosService.getAllProd(),
      //ventas: VentasService.getAllVentas(),
      ventas: [],
      proveedores: ProveedoresService.getAllProv(),
      groupedProductos: [],
      productosVendidos: [],
      f: [],
      prodVendido: {
        id: 0,
        idProveedor: "",
        nombre: "",
        precio_costo: 0,
        precio_venta: 0,
        Q: 0,
        d: 0,
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

  },

  created() {
    for(let i=0;i < this.facturas.length; i++) {
      this.f = VentasService.getVentasPorFactura(this.facturas[i].id);
      if(this.f.length > 0){
        this.ventas = this.ventas.concat(this.f);
        this.f = [];
      }
    }
    this.ventas = VentasService.getAllVentas();
    this.groupedProductos = this.ventas.reduce((curr, next) => {
      if (curr[next.idProducto]) {
        curr[next.idProducto] += parseInt(next.cantidad);
      } else {
        curr[next.idProducto] = parseInt(next.cantidad);
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
    let flag = false;
    for (let i = 0; i < this.productosVendidos.length; i++) {

      this.prodVendido = ProductosService.getOneProd(this.productosVendidos[i].id);     
      
      let proveedor = ProveedoresService.getOneProv(this.prodVendido.idProveedor);
      this.productosVendidos[i].proveedor = proveedor.nombre;
      this.productosVendidos[i].leadTime = proveedor.lead_time;      
      
      this.productosVendidos[i].nombre = this.prodVendido.nombre;
      this.productosVendidos[i].ventaDiaria = +this.productosVendidos[i].ventaDiaria / 30;
      this.productosVendidos[i].precio_costo = this.prodVendido.precio_costo;
      this.productosVendidos[i].puntoReOrden = Math.round(this.productosVendidos[i].ventaDiaria * this.productosVendidos[i].leadTime)+5;      
      this.productosVendidos[i].Q = Math.round(Math.sqrt((2 * this.productosVendidos[i].ventaDiaria * 12 * +this.S) / +this.H))+(this.productosVendidos[i].puntoReOrden*2);

      flag = false;
      for (let j = 0; j < this.productos.length && !flag; j++) {
        if (this.productos[j].id == this.productosVendidos[i].id) {
          this.productos[j].puntoReOrden = this.productosVendidos[i].puntoReOrden;
          this.productos[j].Q = this.productosVendidos[i].Q;
          this.productos[j].d = this.productosVendidos[i].d;
          flag = true;
        }
      }
    }
    ProductosService.saveProd(this.productos);
  }
};
</script>
