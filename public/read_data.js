import { readFileSync } from "fs";
import npyjs from "npyjs";

const npyFilePath = "recording1-1fr.npy";

try {

  const data = readFileSync(npyFilePath);
  const npy = new npyjs();
  const parsedData = npy.parse(data.buffer);
  const npyData = new Uint8Array(parsedData.data);

//   console.log(npyData);

  const numberOfZeros = Array.from(npyData).reduce((count, value) => {
    return count + (value === 0 || value === "0" ? 1 : 0);
  }, 0);
  console.log(
    `Number of 0s in npyData: ${numberOfZeros}`
  );

} catch (err) {
  console.error("Error reading the .npy file:", err);
}

function readNpyFile(npyFilePath) {
    try {
        const data = readFileSync(npyFilePath);
        const npy = new npyjs();
        const parsedData = npy.parse(data.buffer);
        const npyData = new Uint8Array(parsedData.data);
      //  console.log(npyData);
        return npyData;
       // callback(npyData);
    } catch (error) {
        console.error('Error reading npy file:', error);
        return null;
        // callback(null);
    }
}

export {readNpyFile};

