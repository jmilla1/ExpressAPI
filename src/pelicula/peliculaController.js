import { ObjectId } from "mongodb";
import client from "../common/db.js";

const dbName = "cine-db";
const collectionName = "peliculas";

export async function handleInsertPeliculaRequest(req, res) {
  try {
    const pelicula = req.body;
    const db = client.db(dbName);
    const result = await db.collection(collectionName).insertOne(pelicula);
    res.status(201).json({ mensaje: "Película creada con éxito", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la película", error: error.message });
  }
}

export async function handleGetPeliculasRequest(req, res) {
  try {
    const db = client.db(dbName);
    const peliculas = await db.collection(collectionName).find().toArray();
    res.status(200).json(peliculas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las películas", error: error.message });
  }
}
// Obtener una película por ID
export async function handleGetPeliculaByIdRequest(req, res) {
  try {
    const { id } = req.params;
    const db = client.db(dbName);
    const pelicula = await db.collection(collectionName).findOne({ _id: new ObjectId(id) });

    if (!pelicula) {
      return res.status(404).json({ mensaje: "Película no encontrada" });
    }

    res.status(200).json(pelicula);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la película", error: error.message });
  }
}

// Actualizar una película por ID
export const handleUpdatePeliculaRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const db = client.db('cine-db');
    const result = await db.collection('peliculas').updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ mensaje: 'Película no encontrada para actualizar' });
    }

    res.status(200).json({ mensaje: 'Película actualizada con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la película', error });
  }
};

// Eliminar una película por ID
export const handleDeletePeliculaRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const db = client.db('cine-db');
    const result = await db.collection('peliculas').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ mensaje: 'Película no encontrada para eliminar' });
    }

    res.status(200).json({ mensaje: 'Película eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la película', error });
  }
};
