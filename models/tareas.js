const Tarea = require("./tarea");

class Tareas {
  constructor() {
    this._listado = {};
  }

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  eliminarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareaDB = []) {
    tareaDB.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((tarea, idx) => {
      const index = `${idx + 1}.`.green;
      const { desc, completadaEn } = tarea;
      const result = completadaEn ? "Completada".green : "Pendiente".red;

      console.log(`${index} ${desc} :: ${result} `);
    });
  }
  listadoCompletadasPendientes(flag = true) {
    console.log();
    let contador = 0;
    this.listadoArr.forEach((tarea) => {
      const { desc, completadaEn } = tarea;
      const result = completadaEn ? "Completada".green : "Pendiente".red;
      if (flag) {
        if (completadaEn) {
          contador = contador + 1;
          console.log(
            `${(contador + ".").green} ${desc} :: ${completadaEn.green}`
          );
        }
      } else if (!completadaEn) {
        contador = contador + 1;
        console.log(`${(contador + ".").green} ${desc} :: ${result}`);
      }
    });
  }
  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadaEn) {
        tarea.completadaEn = new Date().toISOString();
      }
    });
    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadaEn = null;
      }
    });
  }
}

module.exports = {
  Tareas,
};
