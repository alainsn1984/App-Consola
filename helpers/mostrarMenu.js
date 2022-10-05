require("colors");

const mostrarMenu = () => {
  console.clear();
  return new Promise((resolve) => {
    console.log("==============================".green);
    console.log("     Seleccione  una opcion ");
    console.log("==============================\n".green);

    console.log(`${"1.".green} Crear Tarea`);
    console.log(`${"2.".green} Listar Tareas`);
    console.log(`${"3.".green} Listar Tareas Completadas`);
    console.log(`${"4.".green} Listar Tarea Pendientes`);
    console.log(`${"5.".green} Completar Tareas`);
    console.log(`${"6.".green} Borrar Tarea(s)`);
    console.log(`${"0.".green} Salir\n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Seleccione la opcion que desea: ", (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(
      `\nPresione ${"Enter".green} para continuar \n`,
      (opt) => {
        readline.close();
        resolve();
      }
    );
  });
};

module.exports = {
  mostrarMenu,
  pausa,
};
