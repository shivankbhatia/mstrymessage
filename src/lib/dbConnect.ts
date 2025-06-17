import mongoose from 'mongoose'

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already Connected.")
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '')

        connection.isConnected = db.connections[0].readyState

        console.log("DB connected Successfully.");
    } catch (error) {
        console.log("DB connection Failed.", error);
        //gracefully exit the process as there is no connection to the database...
        process.exit(1)
    }
}

export default dbConnect;