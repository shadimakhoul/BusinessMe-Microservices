import mongoose from 'mongoose'


const dbConnection = async (): Promise<void> => {
    try {
        const DatabaseUrl = `mongodb+srv://${process.env.MongoDBUsername}:${process.env.MongoDBPassword}@cluster0.x8qewhr.mongodb.net/`
        const DatabaseOptions = {
            dbName: 'businessMe'
        }
        await mongoose.connect(DatabaseUrl, DatabaseOptions);
        
        console.log("DB Connected");
    } catch (error) {
        error instanceof Error ? console.log("DB Error", error.message) : console.log("DB Error", error);
    }
}

export default dbConnection