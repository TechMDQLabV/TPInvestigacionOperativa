<template>
  <section id="addProv">
    <article class="container text-white div_trans8 divPadding">       
        <h2>Ingreso de Proveedores</h2>
        <p></p>
        <div class="row left">
          <div class="form-group col-md-10">
              <label for="nombre">Nombre</label> <p class="input-error" v-if="inputError==='Nombre'"> ERROR!!! Verifique el Nombre</p>
              <input id="nombre" type="text" class="form-control" ref="focusNombre" v-model="proveedor.nombre" placeholder="Nombre" required>
          </div>

          <div class="form-group col-md-2">
              <label for="leadTime">Lead Time </label> <p class="input-error" v-if="inputError=='Lead Time'"> ERROR!!! Verifique el Lead Time</p>
              <input id="leadTime" type="number" class="form-control" ref="focusLeadTime" v-model="proveedor.leadTime" pattern="[0,9]{1,2}" placeholder="Lead Time" required>
          </div>
        </div>
        <p></p>
        <div class="form-group">
            <button type="submit" class="form-control btn btn-primary" @click="agregarProv()">Agregar</button>
        </div>
    </article>
  </section>
</template>
<script>
import ProveedoresService from "@/services/proveedoresService";
export default {
  name: "addProv",
  props: [],
  data() {
    return {
      inputError: "",
      proveedor: {
        nombre: "",
        leadTime: ""
      },
      errors: []
    };
  },

  methods: {
    agregarProv() {
      if (isNaN(this.proveedor.nombre)) {
        ProveedoresService.setProveedor(Object.assign({}, this.proveedor));
        //ProveedoresService.setProveedor(this.proveedor);
        this.inputError = "";

        this.proveedor.nombre = "";
        this.proveedor.leadTime = "";
        this.$refs.focusNombre.focus();
      } else {
        if (!isNaN(this.proveedor.nombre)) {
          this.inputError = "Nombre";
          this.$refs.focusNombre.focus();
        } else {
          this.inputError = "Lead Time";
          this.$refs.focusLeadTime.focus();
        }
      }
    }
  }
};
</script>
