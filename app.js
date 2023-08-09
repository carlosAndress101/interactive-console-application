require("colors");
const {
  inquiererMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirm,
  mostrarListadoCheckList
} = require("./helpers/inquierer.js");
const Tareas = require("./models/tareas.js");
const { saveInf, leerDB } = require("./helpers/saveFile");

const main = async () => {
  let opt = "";

  const tareas = new Tareas();

  const tareaDB = leerDB();

  if (tareaDB) {
    tareas.cargarTaareasFromArray(tareaDB);
  }

  do {
    opt = await inquiererMenu();

    switch (opt.opcion) {
      case "1":
        const description = await leerInput("Descripción:");
        tareas.crearTarea(description);
        break;

      case "2":
        tareas.listadoCompleto(tareas.listadoArr);
        break;

      case "3": //listar completa
        tareas.listarPendientesCompletadas(true);
        break;

      case "4": //listar pendientes
        tareas.listarPendientesCompletadas(false);
        break;

      case "5": //completado | pendiente
        const ids = await mostrarListadoCheckList(tareas.listadoArr)
        tareas.toggleCompletadas(ids)
        break;

      case "6": //lista borrar
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== '0') {
          const ok = await confirm("are you sure you want to delete this?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log(" ");
            console.log("deleted Task :v");
          }
        } 
        break;
      
      // default:
      //   break;
    }

    saveInf(tareas.listadoArr);

    await pausa();
  } while (opt.opcion !== '0');
};

main();
