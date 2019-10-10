<template>
  <section id="ventas">
    <article class="container text-white div_trans8 divPadding" v-if="nuevaFactura">       
        <h2>Registro de Venta</h2>
        <p></p>
          <form v-on:submit.prevent="crearVenta()">
          <div class="row left">   
            <div class="col-md-4"></div>                      
            <div class="form-group col-md-2">
                <label for="fecha">Fecha</label> <p class="input-error" v-if="inputError==='fecha'"> ERROR!!! Verifique la Fecha</p>
                <input id="fecha" type="date" class="form-control" ref="focusFecha" v-model="factura.fecha" :max="getToday()" required>
            </div>
            <div class="form-group col-md-2">
                <label for="idFactura">Nro de Factura</label> <p class="input-error" v-if="inputError==='idFactura'"> ERROR!!! Verifique Nro de Factura</p>
                <input id="idFactura" type="number" class="form-control" ref="focusFecha" v-model="lastIdFactura" disabled>
            </div>          
            <div class="col-md-4"></div>           
          </div>
          <p></p>
          <div class="form-group">
            <div class="form-group col-md-5"></div>                     
            <div class="form-group col-md-2">
              <button type="submit" class="form-control btn btn-primary">Agregar</button>
            </div>
            <div class="form-group col-md-5"></div>             
          </div>        
          </form>
    </article>

    <article class="container text-white div_trans8 divPadding" v-if="!nuevaFactura">       
        <h2>Registro de Ventas</h2>
        <h3 class="left">Factura Nro.: {{ factura.id }} - Fecha: {{ mostrarFecha }}</h3>    
        <form>            
          <div class="row left">
            <div class="form-group col-md-6">
                <label for="producto">Producto </label> <p class="input-error" v-if="inputError=='producto'"> ERROR!!! Verifique el Precio de Venta</p>
                <select id="producto" class="form-control" ref="focusProducto" v-model="producto.id" @change="selectOnChange()">
                    <option v-bind:value="producto.id" v-for="(producto, index) in listProducts" :key="index">{{ producto.nombre }} - Precio: ${{ producto.precio_venta }} - Stock: {{ producto.stock }}</option>
                </select>
            </div>

            <div class="form-group col-md-2">
                <label for="cantidad">Cantidad </label> <p class="input-error" v-if="inputError=='cantidad'"> ERROR!!! Verifique el Precio de Costo</p>
                <input id="cantidad" type="number" class="form-control" ref="focusCantidad" v-model.number="venta.cantidad" pattern="[0,9]" min="1" v-bind:max="producto.stock" step="1" placeholder="Cantidad" @blur="cantidadOnChange()">
            </div>       

            <div class="form-group col-md-2">
                <label for="importe">Importe </label> <p class="input-error" v-if="inputError=='importe'"> ERROR!!! Verifique el Stock</p>
                <input id="importe" type="number" class="form-control" ref="focusImporte" v-model.number="venta.importe" pattern="[0,9]" placeholder="Importe">
            </div>  
            <div class="form-group col-md-1">
              <label>&nbsp;</label>  
              <button type="submit" class="form-control btn btn-primary" @click.prevent="agregarLineaVenta()">Agregar</button>
            </div>   
            <div class="form-group col-md-1">
              <label>&nbsp;</label>            
              <button type="submit" class="form-control btn btn-warning" @click.prevent="resetForm()">Reset</button>
            </div>                        
          </div>
        </form>   
 
        <div v-if="(totalLineasVenta > 0)"> 

          <hr/>   
          <table class="table text-white">
              <thead>
                  <tr>
                      <th width="5%"></th>
                      <th width="75%">Artículo</th>
                      <th width="10%">P.U.</th>
                      <th width="10%">Cant.</th>
                      <th width="10%">Total</th>                    
                  </tr>
              </thead>
              <tfoot>
                  <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>Total:</th>
                      <th class="right">{{ factura.total.toFixed(2) }} </th>                    
                  </tr>
              </tfoot>                    
              <tbody>
                  <tr v-for="(venta, index) in lineasVenta" :key="index">                    
                      <td class="right"><a class="btn " data-toggle="tooltip" v-bind:title='"Eliminar a "+venta.producto' @click="borrarLineaVenta(venta)"><img src="@/assets/images/b_del.png" border="0"></a></td>
                      <td class="left"> {{ venta.producto }}</td>
                      <td> {{ venta.precio_venta }}</td>
                      <td> {{ venta.cantidad }}</td>
                      <td class="right"> {{ venta.importe.toFixed(2) }}</td>                    
                  </tr>
              </tbody>
          </table>
          <p></p>
          <div class="form-group">
            <div class="form-group col-md-5">
            </div>                     
            <div class="form-group col-md-2">
              <button type="submit" class="form-control btn btn-primary" @click="guardarFactura()">Terminar Factura</button>
            </div>
            <div class="form-group col-md-5">
            </div>             
          </div> 
        </div>                
    </article>

  </section>
</template>
<script>
import ProductosService from "@/services/productosService";
import VentasService from "@/services/ventasService";
import FacturasService from "@/services/facturasService";
export default {
  name: "ventas",
  props: [],
  data() {
    return {
      totalVenta: 0,
      nuevaFactura: true,
      inputError: "",
      listProducts: [],
      lineasVenta: [],
      lastIdLineaVenta: 0,
      lastIdFactura: FacturasService.getLastIdFactura(),
      producto: {
        id: 0,
        nombre: "",
        precio_venta: 0,
        precio_costo: 0,
        stock: "",
        puntoReOrden: ""
      },
      factura: {
        id: 0,
        fecha: this.getToday(),
        total: 0
      },
      venta: {
        id: "",
        idFactura: "",
        idProducto: "",
        producto: "",
        precio_venta: "",
        cantidad: "",
        importe: ""
      },
      errors: []
    };
  },

  computed: {
    totalLineasVenta() {
      return this.lineasVenta.length;
    },

    mostrarFecha() {
      let f = this.factura.fecha.split("-");
      return f[2] + "." + f[1] + "." + f[0];
    }
  },

  methods: {
    getToday() {
      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate();
      return year + "-" + month + "-" + day;
    },

    selectOnChange() {
      this.producto = ProductosService.getOneProd(this.producto.id);
      this.venta.cantidad = 1;
      this.venta.importe = this.producto.precio_venta * this.venta.cantidad;
      this.venta.producto = this.producto.nombre;
      this.venta.precio_venta = this.producto.precio_venta;
      this.venta.idProducto = this.producto.id;
      this.$refs.focusCantidad.focus();
    },

    cantidadOnChange() {
      if (this.venta.cantidad <= this.producto.stock)
        this.venta.importe = this.producto.precio_venta * this.venta.cantidad;
      else alert("La cantidad supera el Stock");
    },

    guardarFactura() {
      FacturasService.setFactura(Object.assign({}, this.factura));
      VentasService.setVenta(this.lineasVenta);
      ProductosService.saveProd(this.listProducts);
      this.lastIdFactura++;
      this.reset();
    },

    crearVenta() {
      this.factura.id = this.lastIdFactura + 1;
      this.listProducts = ProductosService.getAllProd();
      this.factura.total = 0;
      this.nuevaFactura = false;
    },

    agregarLineaVenta() {
      if (this.venta.idProducto > 0 && this.venta.cantidad > 0) {
        this.lineasVenta.push({
          idFactura: this.factura.id,
          id: this.lastIdLineaVenta++,
          fecha: this.venta.fecha,
          idProducto: this.venta.idProducto,
          producto: this.venta.producto,
          precio_venta: this.venta.precio_venta,
          cantidad: this.venta.cantidad,
          importe: this.venta.importe
        });

        this.totalVenta += this.venta.importe;
        this.factura.total += this.venta.importe;
        this.inputError = "";
        this.bajaStock(this.venta.idProducto, this.venta.cantidad * -1);

        this.producto.id = 0;
        this.venta.idProducto = "";
        this.venta.producto = "";
        this.venta.precio_venta = "";
        this.venta.cantidad = "";
        this.venta.importe = "";
        this.$refs.focusProducto.focus();
      } else {
        if (this.venta.idProducto === 0) {
          this.inputError = "producto";
          this.$refs.focusProducto.focus();
        } else {
          this.inputError = "cantidad";
          this.$refs.focusCantidad.focus();
        }
      }
    },

    resetForm() {
      for (let i = 0; i < this.lineasVenta.length; i++) {
        this.bajaStock(
          this.lineasVenta[i].idProducto,
          this.lineasVenta[i].cantidad
        );
      }
      this.reset();
    },

    reset() {
      this.venta.idFactura = "";
      this.venta.idProducto = "";
      this.venta.producto = "";
      this.venta.precio_venta = "";
      this.venta.cantidad = "";
      this.venta.importe = "";
      this.venta.id = "";
      this.lineasVenta = [];
      this.factura.total = 0;
      this.nuevaFactura = true;
    },

    borrarLineaVenta(v) {
      this.factura.total -= v.importe;
      this.lineasVenta = this.lineasVenta.filter(venta => venta.id !== v.id);
      this.bajaStock(v.idProducto, v.cantidad);
    },

    bajaStock(id, cant) {
      let flag = false;
      let i = 0;
      while (!flag && i < this.listProducts.length) {
        if (this.listProducts[i].id === id) {
          this.listProducts[i].stock =
            parseInt(this.listProducts[i].stock) + cant;
          flag = true;
        }
        i++;
      }
    }
  }
};
</script>
