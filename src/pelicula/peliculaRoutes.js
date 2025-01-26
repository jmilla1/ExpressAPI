import express from "express";
import {
  handleInsertPeliculaRequest,
  handleGetPeliculasRequest,
  handleUpdatePeliculaRequest,
  handleDeletePeliculaRequest,
  handleGetPeliculaByIdRequest
} from "./peliculaController.js";

const router = express.Router();

// Crear película
router.post("/", handleInsertPeliculaRequest);

// Obtener todas las películas
router.get("/", handleGetPeliculasRequest);

// Obtener una película por ID
router.get("/:id", handleGetPeliculaByIdRequest);

// Actualizar una película por ID
router.put("/:id", handleUpdatePeliculaRequest);

// Eliminar una película por ID
router.delete("/:id", handleDeletePeliculaRequest);

export default router;

