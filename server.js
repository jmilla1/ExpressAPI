import express from "express";
import cors from "cors";
import routes from "./src/routes.js";


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
