<template>
  <section id="listVentas">
    <article class="container text-white div_trans8 divPadding" v-if="total>0">       
        <h2>Listado de Ventas</h2>

          <table class="table text-white">
              <thead>
                  <tr>                    
                      <th width="25%"></th>                      
                      <th width="30%">Fecha</th>
                      <th width="10%" class="center">Factura</th>
                      <th width="10%" class="center">Importe</th>                               
                      <th width="25%"></th>                      
                  </tr>
              </thead>
              <tfoot>
                  <tr>                     
                      <th colspan="5"></th>
                  </tr>
              </tfoot>                    
              <tbody>
                  <tr v-for="(factura, index) in facturas" :key="index">    
                      <th></th>                                    
                      <td class="left"> {{ mostrarFecha(factura.fecha) }}</td>
                      <td class="right"> {{ factura.id }}</td>
                      <td class="right"> {{ factura.total }}</td>                  
                      <th></th>                          
                  </tr>               
              </tbody>
          </table>
    </article>
    <article class="container text-white div_trans8 divPadding" v-else>       
        <h2>Listado de Ventas</h2> 
        <p>No hay Ventas para mostrar</p>
    </article> 
  </section>
</template>
<script>
import FacturasService from "@/services/facturasService";
export default {
  name: "listVentas",
  data() {
    return {
      inputError: "",
      facturas: FacturasService.getAllFacturas(),
      errors: []
    };
  },

  computed: {
    total() {
      return this.facturas.length;
    }
  },

  methods: {
    mostrarFecha(fecha) {
      let f = fecha.split("-");
      return f[2] + "." + f[1] + "." + f[0];
    }
  }
};
</script>
