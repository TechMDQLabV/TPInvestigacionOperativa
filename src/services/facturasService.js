export default {
  /// Facturas  

  getAllFacturas() {
    return JSON.parse(localStorage.getItem("facturas")) || [];
  },

  getLastIdFactura() {
    return parseInt(localStorage.getItem("lastIdFactura")) || 0;
  },
/*
  getOneFactura(id) {
    return new Promise((res, rej) => {
      try {
        const facturas = this.getAllFacturas();
        setTimeout(() => {
          res(facturas.find(factura => factura.id === id));
        }, 2000);
      } catch (e) {
        rej(e.toString());
      }
    });
  },
*/

  getMesAnterior() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    if(month === 1){
      month = 12;
      year--;
    }else{
      month--; 
    }
    return year + "-" + month + "-" + day;
  },

  getOneFactura(fecha) {
    const facturas = this.getAllFacturas();
    return facturas.find(factura => factura.fecha > fecha);
  },

  getUltimoMes() {
    let hasta = new Date();
    let desde = new Date(this.getMesAnterior());
    const facturas = this.getAllFacturas();
    return facturas.filter(factura => Date.parse(factura.fecha) >= desde && Date.parse(factura.fecha) <= hasta);
  },

  setFactura(factura) {
    return new Promise((res, rej) => {
      try {
        //const ventas = [];
        const facturas = this.getAllFacturas();

        const f = {
          id: factura.id,
          fecha: factura.fecha,
          total: factura.total,
        };
        facturas.push(f);
        this.saveFactura(facturas);
        this.saveLastIdFactura(f.id);
        setTimeout(() => {
          res("", "");
        }, 2000);
      } catch (e) {
        rej(e.toString());
      }
    });
  },

  saveFactura(facturas) {
    const parsed = JSON.stringify(facturas);
    localStorage.setItem('facturas', parsed);
  },

  saveLastIdVenta(lastIdVenta) {
    localStorage.setItem('lastIdVenta', lastIdVenta);
  },

  saveLastIdFactura(lastIdFactura) {
    localStorage.setItem('lastIdFactura', lastIdFactura);
  },

  deleteFactura(id) {
    const facturas = this.getAllFacturas();
    const list = facturas.filter(factura => factura.id !== id);
    this.saveFactura(list);
  },
}