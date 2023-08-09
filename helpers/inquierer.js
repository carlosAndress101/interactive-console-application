const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿What do you want to do?",
    choices: [
      {
        value: "1",
        name: `${"1".green}. Create Task`,
      },
      {
        value: "2",
        name: `${"2".green}. Task List`,
      },
      {
        value: "3",
        name: `${"3".green}. Completed task list`,
      },
      {
        value: "4",
        name: `${"4".green}. To Do List`,
      },
      {
        value: "5",
        name: `${"5".green}. Complete Task(s)`,
      },
      {
        value: "6",
        name: `${"6".green}. Delete Task`,
      },
      {
        value: "0",
        name: `${"0".green}. Leave`,
      },
    ],
  },
];

const inquiererMenu = async () => {
  console.log(
    `
      ===========================
          Choose a Option
      ===========================`.green
  );

  const opt = await inquirer.prompt(preguntas);
  return opt;
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "description",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingresa un valor";
        }
        return true;
      },
    },
  ];
  const { description } = await inquirer.prompt(question);
  return description;
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"Enter".green} para continuar`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question);
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    const inx = `${++index}`.green;

    return {
      value: tarea.id,
      name: `${inx}. ${tarea.description}`,
    };
  });

  choices.unshift({
    value: "0",
    name: `${"0".green} cancel`,
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

const confirm = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const mostrarListadoCheckList = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    const inx = `${++index}`.green;

    return {
      value: tarea.id,
      name: `${inx}. ${tarea.description}`,
      checked: (tarea.completadoEn) ? true : false
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

module.exports = {
  inquiererMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirm,
  mostrarListadoCheckList,
};
