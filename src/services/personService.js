export default {
  /// Proveedores  
  getAllProv() {
    return JSON.parse(localStorage.getItem("proveedores")) || [];
  },

  getLastIdProv() {
    return parseInt(localStorage.getItem("lastIdProv")) || 0;
  },

  getOneProv(id) {
    return new Promise((res, rej) => {
      try {
        const proveedores = this.getAllProv();
        setTimeout(() => {
          res(proveedores.find(person => person.id === id));
        }, 2000);
      } catch (e) {
        rej(e.toString());
      }
    });
  },

  setProveedor(proveedor) {
    return new Promise((res, rej) => {
      try {
        //const proveedor = [];
        const proveedores = this.getAllProv();

        const p = {
          id: this.getLastIdProv() + 1,
          nombre: proveedores.nombre,
          lead_time: proveedores.lead_time,
        };
        proveedores.push(p);
        this.saveProv(proveedor);
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
    this.savePeople(list);
  },

  /// Productos

  getAllProd() {
    return JSON.parse(localStorage.getItem("productos")) || [];
  },

  getLastIdProd() {
    return parseInt(localStorage.getItem("lastIdProd")) || 0;
  },

  getOneProd(id) {
    return new Promise((res, rej) => {
      try {
        const productos = this.getAllProd();
        setTimeout(() => {
          res(productos.find(producto => producto.id === id));
        }, 2000);
      } catch (e) {
        rej(e.toString());
      }
    });
  },

  setProducto(producto) {
    return new Promise((res, rej) => {
      try {
        //const productos = [];
        const productos = this.getAllProd();

        const p = {
          id: this.getLastIdProd() + 1,
          nombre: producto.nombre,
          edad: producto.precio_venta,
          sexo: producto.precio_costo,
          stock: producto.stock,
        };
        productos.push(p);
        this.saveProd(productos);
        this.saveLastIdProd(p.id);
        setTimeout(() => {
          res("", "");
        }, 2000);
      } catch (e) {
        rej(e.toString());
      }
    });
  },

  saveProd(productos) {
    const parsed = JSON.stringify(productos);
    localStorage.setItem('productos', parsed);
  },

  saveLastIdProd(lastIdProd) {
    localStorage.setItem('lastIdProd', lastIdProd);
  },

  deleteProd(id) {
    const productos = this.getAllProd();
    const list = productos.filter(producto => producto.id !== id);
    this.saveProd(list);
  }
}