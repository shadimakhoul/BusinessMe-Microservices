import mongoose from 'mongoose'


const dbConnection = async () => {
    try {
        const DatabaseUrl = `mongodb+srv://${process.env.MongoDBUsername}:${process.env.MongoDBPassword}@cluster0.x8qewhr.mongodb.net/`
        const DatabaseOptions = {
            dbName: 'businessMe'
        }
        await mongoose.connect(DatabaseUrl, DatabaseOptions);
        
        console.log("DB Connected");
    } catch (error) {
        if (error instanceof Error) {
            // Here, 'error' is recognized as an instance of the 'Error' class, so 'message' is accessible
            console.log("DB Error", error.message);
        } else {
            // If 'error' is not an instance of 'Error', log the error object for further inspection
            console.log("DB Error", error);
        }
    }
}

export default dbConnection