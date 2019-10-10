export default {
  /// Proveedores  
  getAllProv() {
    return JSON.parse(localStorage.getItem("proveedores")) || [];
  },

  getLastIdProv() {
    return parseInt(localStorage.getItem("lastIdProv")) || 0;
  },

  getOne(id) {
    return new Promise((res, rej) => {
      try {
        const proveedores = this.getAllProv();
        setTimeout(() => {
          res(proveedores.find(proveedor => proveedor.id == id));
        }, 2000);
      } catch (e) {
        rej(e.toString());
      }
    });
  },

  getOneProv(id) {
    const proveedores = this.getAllProv();
    return proveedores.find(proveedor => proveedor.id == id);
  },

  setProveedor(proveedor) {
    return new Promise((res, rej) => {
      try {
        //const proveedor = [];
        const proveedores = this.getAllProv();

        const p = {
          id: this.getLastIdProv() + 1,
          nombre: proveedor.nombre,
          lead_time: proveedor.leadTime,
        };
        proveedores.push(p);
        this.saveProv(proveedores);
        this.saveLastIdProv(p.id);
        setTimeout(() => {
          res("", "");
        }, 2000);
      } catch (e) {
        rej(e.toString());
      }
    });
  },

  saveProv(proveedores) {
    const parsed = JSON.stringify(proveedores);
    localStorage.setItem('proveedores', parsed);
  },

  saveLastIdProv(lastIdProv) {
    localStorage.setItem('lastIdProv', lastIdProv);
  },

  deleteProv(id) {
    const proveedores = this.getAllProv();
    const list = proveedores.filter(proveedor => proveedor.id !== id);
    this.saveProv(list);
  },
}
