<template>
  <section id="addProd">
    <article class="container text-white div_trans8 divPadding">       
        <h2>Ingreso de Productos</h2>
        <p></p>
        <div class="row left">        
          <div class="form-group col-md-6">
              <label for="nombre">Nombre</label> <p class="input-error" v-if="inputError==='Nombre'"> ERROR!!! Verifique el Nombre</p>
              <input id="nombre" type="text" class="form-control" ref="focusNombre" v-model="producto.nombre" placeholder="Nombre" required>
          </div>
          <div class="form-group col-md-6">
              <label for="proveedor">Proveedor </label>
              <select id="proveedor" class="form-control" ref="focusProveedor" v-model="proveedor.id">
                  <option v-bind:value="proveedor.id" v-for="(proveedor, index) in proveedores" :key="index">{{ proveedor.nombre }}</option>
              </select>
          </div>

        </div>
        <div class="row left">
          <div class="form-group col-md-4">
              <label for="edad">Precio de Venta </label> <p class="input-error" v-if="inputError=='PrecioVenta'"> ERROR!!! Verifique el Precio de Venta</p>
              <input id="edad" type="number" class="form-control" ref="focusPrecioVenta" v-model="producto.precio_venta" pattern="[0,9]{0,2}" placeholder="Precio de Venta">
          </div>

          <div class="form-group col-md-4">
              <label for="edad">Precio de Costo </label> <p class="input-error" v-if="inputError=='PrecioCosto'"> ERROR!!! Verifique el Precio de Costo</p>
              <input id="edad" type="number" class="form-control" ref="focusPrecioCosto" v-model="producto.precio_costo" pattern="[0,9]{1,2}" placeholder="Precio de Costo">
          </div>       

          <div class="form-group col-md-4">
              <label for="edad">Stock </label> <p class="input-error" v-if="inputError=='Stock'"> ERROR!!! Verifique el Stock</p>
              <input id="edad" type="number" class="form-control" ref="focusStock" v-model="producto.stock" pattern="[0,9]{1,2}" placeholder="Stock">
          </div>         
        </div>
        <p></p>
        <div class="form-group">
            <button type="submit" class="form-control btn btn-primary" @click="agregarProd()">Agregar</button>
        </div>
    </article>
  </section>
</template>
<script>
import ProductosService from "@/services/productosService";
import ProveedoresService from "@/services/proveedoresService";
export default {
  name: "addProd",
  props: [],
  data() {
    return {
      inputError: "",
      proveedores: ProveedoresService.getAllProv(),      
      proveedor: {
        nombre: "",
        leadTime: ""
      },      
      producto: {
        idProveedor: "",
        nombre: "",
        precio_venta: "",
        precio_costo: "",
        stock: "",
        puntoReOrden: 5,
        Q: 10,
        d: 5
      },
      errors: []
    };
  },

  methods: {
    agregarProd() {
      if (
        isNaN(this.producto.nombre) &&
        this.producto.precio_venta > 0 &&
        this.producto.precio_costo > 0
      ) {
        this.producto.idProveedor = this.proveedor.id;
        ProductosService.setProducto(Object.assign({}, this.producto));
        //ProductosService.setPeople(this.producto);
        this.inputError = "";

        this.producto.nombre = "";
        this.producto.precio_venta = "";
        this.producto.precio_costo = "";
        this.producto.stock = "";
        this.producto.puntoReOrden = 5;
        this.producto.Q = 5;
        this.producto.d = 5;                
        this.$refs.focusNombre.focus();
      } else {
        if (!isNaN(this.producto.nombre)) {
          this.inputError = "Nombre";
          this.$refs.focusNombre.focus();
        } else {
          this.inputError = "Precio Venta";
          this.$refs.focusPrecioVenta.focus();
        }
      }
    }
  }
};
</script>
