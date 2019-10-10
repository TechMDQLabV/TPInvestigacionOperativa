export default {

  /// Productos

  getAllProd() {
    return JSON.parse(localStorage.getItem("productos")) || [];
  },

  getAllProdWithStock() {
    const productos = this.getAllProd();
    return (productos.filter(producto => parseInt(producto.stock) > 0));
  },

  getLastIdProd() {
    return parseInt(localStorage.getItem("lastIdProd")) || 0;
  },
  
    getOne(id) {
      return new Promise((res, rej) => {
        try {
          const productos = this.getAllProd();
          setTimeout(() => {
            res(productos.find(producto => producto.id == id));
          }, 2000);
        } catch (e) {
          rej(e.toString());
        }
      });
    },


  getOneProd(id) {
    const productos = this.getAllProd();
    return productos.find(producto => producto.id == id);
  },


  setProducto(producto) {
    return new Promise((res, rej) => {
      try {
        //const productos = [];
        const productos = this.getAllProd();
        const p = {
          id: this.getLastIdProd() + 1,
          idProveedor: producto.idProveedor,
          nombre: producto.nombre,
          precio_venta: producto.precio_venta,
          precio_costo: producto.precio_costo,
          stock: producto.stock,
          puntoReOrden: producto.puntoReOrden,
          Q: producto.Q,
          d: producto.d,                    
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
