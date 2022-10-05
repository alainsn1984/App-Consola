require("colors");

const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasEliminar,
  confirm,
  mostarTareasCheckList,
} = require("./helpers/inquirer");

const { Tareas } = require("./models/tareas");

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareaDB = leerDB();
  if (tareaDB) {
    tareas.cargarTareasFromArray(tareaDB);
  }
  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripcion: ");
        tareas.crearTarea(desc);
        break;
      case "2":
        //Listado de todas las tareas
        tareas.listadoCompleto();
        break;
      case "3":
        //Listado de taras completadas
        tareas.listadoCompletadasPendientes(true);
        break;
      case "4":
        //listado de tareas pendientes
        tareas.listadoCompletadasPendientes(false);
        break;
      case "5":
        //tareas.listadoCompletartareas();
        const ids = await mostarTareasCheckList(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        //valor seleccionado para eliminar
        const id = await listadoTareasEliminar(tareas.listadoArr);
        if (id !== "0") {
          const result = await confirm("Esta seguro?");
          if (result) {
            tareas.eliminarTarea(id);
            console.log("Tarea borrada correctamente".yellow);
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt != "0");
  {
  }

  // pausa();
};

main();
