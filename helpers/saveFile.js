const fs = require("fs");

const rute = `./db/data.json`;

const saveInf = (data) => {
  fs.writeFileSync(rute, JSON.stringify(data));
};

const leerDB = () => {
  try {
    if (!fs.existsSync(rute)) {
      return null;
    }

    const inf = fs.readFileSync(rute, { encoding: "utf-8" });
    const data = JSON.parse(inf);

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  saveInf,
  leerDB,
};
