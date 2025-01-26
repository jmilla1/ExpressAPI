import express from "express";
import peliculaRoutes from "./pelicula/peliculaRoutes.js";
import actorRoutes from "./actor/actorRoutes.js";

const router = express.Router();

// Rutas para películas
router.use("/pelicula", peliculaRoutes);

// Rutas para actores
router.use("/actor", actorRoutes);

export default router;
