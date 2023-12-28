class ErrorHandler extends Error {
    statusCode: number;
    
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;  
        console.log("stage 1");
              
        Error.captureStackTrace(this, this.constructor);
        console.log("stage 2");
    }
}

export {
    ErrorHandler
}