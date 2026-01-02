import mongoose, { Connection } from "mongoose";

// Type for the cached connection object
interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// Declare global to persist connection across module reloads in development
declare global {
  var mongooseCache: MongooseCache | undefined;
}

// Initialize global cache if it doesn't exist
let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Connects to MongoDB using Mongoose and caches the connection.
 * In development, this prevents multiple connections during hot reloads.
 * In production, maintains a single connection for the application.
 */
async function connectDB(): Promise<Connection> {
  // Return cached connection if already established
  if (cached.conn) {
    return cached.conn;
  }

  // If connection is in progress, wait for the promise to resolve
  if (cached.promise) {
    cached.conn = await cached.promise;
    return cached.conn;
  }

  // Validate MongoDB URI exists
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI environment variable is not defined");
  }

  // Create new connection promise
  cached.promise = mongoose
    .connect(mongoUri, {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
    })
    .then((mongoose) => mongoose.connection);

  // Await and cache the connection
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    // Reset promise on connection failure to allow retry
    cached.promise = null;
    throw error;
  }
}

export default connectDB;