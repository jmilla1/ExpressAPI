import express from "express";
import {
  handleInsertActorRequest,
  handleGetActoresRequest,
  handleGetActorByIdRequest,
  handleGetActoresByPeliculaIdRequest,
  handleUpdateActorRequest,

} from "./actorController.js";

const router = express.Router();

// Crear actor
router.post("/", handleInsertActorRequest);

// Obtener todos los actores
router.get("/", handleGetActoresRequest);

// Obtener un actor por ID
router.get("/:id", handleGetActorByIdRequest);

// Obtener actores por ID de película
router.get("/pelicula/:id", handleGetActoresByPeliculaIdRequest);

// Actualizar actores por ID
router.put("/:id", handleUpdateActorRequest);

export default router;
