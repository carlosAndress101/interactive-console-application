const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  constructor(_listado) {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  listadoCompleto() {
    this.listadoArr.forEach((tarea, index) => {
      index = `${++index}`.green;
      const { description, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;
      console.log(`${index} ${description} :: ${estado}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    this.listadoArr.forEach((tarea, index) => {
      index = `${++index}`.green;
      const { description, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;
      if (completadas) {
        if (completadoEn) {
          console.log(
            `${index} ${description} :: ${completadoEn} :: ${estado}`
          );
        }
      } else {
        if (!completadoEn) {
          console.log(
            `${index} ${description} :: ${completadoEn} :: ${estado}`
          );
        }
      }
    });
  }

  cargarTaareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea?.id] = tarea;
    });
  }

  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  crearTarea(description = "") {
    const tarea = new Tarea(description);
    this._listado[tarea.id] = tarea;
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach( tarea => {
        if(!ids.includes(tarea.id)){
            this._listado[tarea.id].completadoEn = null;
        }
    })
  }
}

module.exports = Tareas;
