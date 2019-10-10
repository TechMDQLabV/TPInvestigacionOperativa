<template>
  <section id="listProv">
    <article class="container text-white div_trans8 divPadding" v-if="totalProveedores>0">       
        <h2>Listado de Proveedores </h2>
          <table class="table text-white">
              <thead>
                  <tr>
                      <th width="5%"></th>
                      <th width="5%"></th>                      
                      <th width="70%">Nombre</th>
                      <th width="20%" class="center">Lead Time</th>
                  </tr>
              </thead>
              <tfoot>
                  <tr>
                      <th></th>
                      <th></th>                      
                      <th class="left">Total: {{ total }}</th>
                      <th></th>
                  </tr>
              </tfoot>                    
              <tbody>
                  <tr v-for="(proveedor, index) in list" :key="index">                 
                      <td class="right"><a class="btn" data-toggle="tooltip" v-bind:title='"Modificar a "+proveedor.nombre' @click="modifProv(proveedor)"><img src="@/assets/images/b_edit.png" border="0"></a></td>                    
                      <td class="right"><a class="btn" data-toggle="tooltip" v-bind:title='"Eliminar a "+proveedor.nombre' @click="borrarProv(proveedor)"><img src="@/assets/images/b_del.png" border="0"></a></td>
                      <td class="left"> {{ proveedor.nombre }}</td>
                      <td> {{ proveedor.lead_time }}</td>
                  </tr>
                  <tr v-if="total===0">                 
                      <td colspan="5"> NO hay Proveedores</td>
                  </tr>                  
              </tbody>
          </table>
    </article>
    <article class="container text-white div_trans8 divPadding" v-else>       
        <h2>Listado de Proveedores</h2> 
        <p>No hay Proveedores para mostrar</p>
    </article> 
  </section>
</template>
<script>
import ProveedoresService from "@/services/proveedoresService";
export default {
  name: "listProv",
  data() {
    return {
      inputError: "",
      proveedores: ProveedoresService.getAllProv(),
      list: ProveedoresService.getAllProv(),
      errors: []
    };
  },

  computed: {
    total() {
      return this.list.length;
    },
    totalProveedores() {
      return this.proveedores.length;
    },
  },

  methods: {
    borrarProv(p) {
      this.hideModal;
      alert(p.id);
      ProveedoresService.deleteProv(p.id);
      this.listado = "T";
      this.proveedores = ProveedoresService.getAllProv();
      this.list = ProveedoresService.getAllProv();
    },
    showModalConfirm() {
      this.$refs.mConfirm.show();
    },
    hideModalConfirm() {
      this.$refs.mConfirm.hide();
    }

  },
};
</script>
