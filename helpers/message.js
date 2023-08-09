require("colors");

const showMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log(
      `
    ===========================
        Choose a Option
    ===========================`.green,
      `
    ${"1.".green} Create Task
    ${"2.".green} Listar tareas
    ${"3.".green} Listar tareas
    ${"4.".green} Listar tareas pendientes
    ${"5.".green} Completar tarea
    ${"6.".green} Borrar
    ${"0.".green} Salir
    `
    );

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Choose a option: ", (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const Pausa = () => {
  return new Promise( resolve => {
    const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
      });
    
      readline.question(`Into  ${"ENTER".green} to continue :V `, (opt) => {
        readline.close();
        resolve();
      });
  })
};

module.exports = { showMenu, Pausa };
