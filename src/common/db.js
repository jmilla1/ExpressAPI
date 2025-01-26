import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://expressApiUser:5JDb4WsG3J8wShoB@cluster0.fgy50.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default client;


