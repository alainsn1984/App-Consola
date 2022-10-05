const inquirer = require("inquirer");
const { Tareas } = require("../models/tareas");

require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "Que desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar tareas `,
      },
      {
        value: "3",
        name: `${"3.".green} Listar tareas completas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listar tarea pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("==============================".green);
  console.log("     Seleccione  una opcion ".white);
  console.log("==============================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "pausa",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ];
  console.log("\n");
  return inquirer.prompt(question);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.trim().length === 0) {
          return "Por favor ingrese un valor valido";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listadoTareasEliminar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const index = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${index} ${tarea.desc}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0.".green + "Cancelar",
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(preguntas);

  return id;
};

const mostarTareasCheckList = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const index = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${index} ${tarea.desc}`,
      checked: tarea.completadaEn ? true : false,
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(pregunta);

  return ids;
};

const confirm = async (message) => {
  const preguntas = [
    {
      type: "confirm",
      name: "result",
      message,
    },
  ];

  const { result } = await inquirer.prompt(preguntas);

  return result;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasEliminar,
  confirm,
  mostarTareasCheckList,
};
