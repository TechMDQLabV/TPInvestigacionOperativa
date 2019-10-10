export default {
  /// Ventas  
  getAllVentas() {
    return JSON.parse(localStorage.getItem("ventas")) || [];
  },

  getOneVenta(id) {
    return new Promise((res, rej) => {
      try {
        const ventas = this.getAllVentas();
        setTimeout(() => {
          res(ventas.find(venta => venta.id === id));
        }, 2000);
      } catch (e) {
        rej(e.toString());
      }
    });
  },

  getVentasPorFactura(factura) {
    const ventas = this.getAllVentas();
    return ventas.filter(venta => venta.idFactura == factura) || [];
  },  

  setVenta(ventasNew) {
    return new Promise((res, rej) => {
      try {
        const ventasOld = this.getAllVentas();
        const ventas = ventasOld.concat(ventasNew);
        this.saveVenta(ventas);
        setTimeout(() => {
          res("", "");
        }, 2000);
      } catch (e) {
        rej(e.toString());
      }
    });
  },

  saveVenta(ventas) {
    const parsed = JSON.stringify(ventas);
    localStorage.setItem('ventas', parsed);
  },

  deleteVenta(id) {
    const ventas = this.getAllVentas();
    const list = ventas.filter(venta => venta.id !== id);
    this.saveVenta(list);
  },
}
