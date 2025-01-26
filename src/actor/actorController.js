import { ObjectId } from "mongodb";
import client from "../common/db.js";

const dbName = "cine-db";
const actorCollection = "actores";


// Insertar un actor
export async function handleInsertActorRequest(req, res) {
    try {
      const actor = req.body;
  
      // Convertir idPelicula a ObjectId
      if (!ObjectId.isValid(actor.idPelicula)) {
        return res.status(400).json({ mensaje: "El idPelicula no es válido" });
      }
      actor.idPelicula = new ObjectId(actor.idPelicula);
  
      const db = client.db(dbName);
      const result = await db.collection("actores").insertOne(actor);
  
      res.status(201).json({
        mensaje: "Actor creado con éxito",
        id: result.insertedId,
      });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al crear el actor", error: error.message });
    }
  }

// Obtener todos los actores
export async function handleGetActoresRequest(req, res) {
  try {
    const db = client.db(dbName);
    const actores = await db.collection(actorCollection).find().toArray();
    res.status(200).json(actores);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los actores", error: error.message });
  }
}

// Obtener un actor por ID
export async function handleGetActorByIdRequest(req, res) {
  try {
    const { id } = req.params;
    const db = client.db(dbName);
    const actor = await db.collection(actorCollection).findOne({ _id: new ObjectId(id) });

    if (!actor) {
      return res.status(404).json({ mensaje: "Actor no encontrado" });
    }

    res.status(200).json(actor);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el actor", error: error.message });
  }
}

// Obtener actores por ID de película
export async function handleGetActoresByPeliculaIdRequest(req, res) {
    try {
      const { id } = req.params;
  
      // Validar si el id es un ObjectId válido
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ mensaje: "El idPelicula no es válido" });
      }
  
      const peliculaId = new ObjectId(id);
      const db = client.db(dbName);
      const actores = await db.collection(actorCollection).find({ idPelicula: peliculaId }).toArray();
  
      if (actores.length === 0) {
        return res.status(404).json({ mensaje: "No se encontraron actores para esta película" });
      }
  
      res.status(200).json(actores);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener los actores", error: error.message });
    }
  }
  
  // Actualizar actores por ID
  export async function handleUpdateActorRequest(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ mensaje: "El ID no es válido" });
      }
  
      const db = client.db("cine-db");
      const result = await db.collection("actores").updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      );
  
      if (result.matchedCount === 0) {
        return res.status(404).json({ mensaje: "Actor no encontrado" });
      }
  
      res.status(200).json({ mensaje: "Actor actualizado con éxito" });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al actualizar el actor", error: error.message });
    }
  }
   
  // Eliminar un actor por ID
export async function handleDeleteActorRequest(req, res) {
    try {
      const { id } = req.params;
  
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ mensaje: "El ID del actor no es válido" });
      }
  
      const db = client.db(dbName);
      const result = await db.collection(actorCollection).deleteOne({ _id: new ObjectId(id) });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ mensaje: "Actor no encontrado" });
      }
  
      res.status(200).json({ mensaje: "Actor eliminado con éxito" });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al eliminar el actor", error: error.message });
    }
  }
  
