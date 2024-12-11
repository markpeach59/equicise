import { MongoClient, BSON } from "mongodb";

let connection_string = process.env.CONNECTION_STRING || "";

if (!connection_string){throw new Error("No MongoDb Connection String  in .env")}

let mongodb: MongoClient;

declare global{
    var __db:MongoClient | undefined;
}

  mongodb = new MongoClient(connection_string);
  
  let ObjectId = BSON.ObjectId;


export {mongodb, ObjectId}