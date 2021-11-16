const fs = require("fs");

const getDataFromJSON = (filename) => {
  try {
    const dataBuffer = fs.readFileSync(`${filename}`);
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);

    return data;
  } catch (err) {
    return console.log("An error has ocurred: ", err);
  }
};

const saveDataToJSON = (filename, data = {}) => {
  try {
    const dataJSON = JSON.stringify(data);

    fs.writeFile(`${filename}`, dataJSON, () =>
      console.log("Data saved sucessfully")
    );
  } catch (err) {
    console.log("An error has ocurred: ", err);
  }
};

module.exports = {
    getDataFromJSON,
    saveDataToJSON
}