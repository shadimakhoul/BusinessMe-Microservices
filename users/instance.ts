let userCreatedSuccessfully = "User created successfully"
let somethingWentWrong = "Something went wrong!"
let badRequest = "Bad Request"
let NotValidData = "Not valid data"
let UnknownError = 'Unknown error occurred'
enum accessTypes{
    User = "user",
    Bussiness = "Bussiness"
}

enum accessStatuss{
    Valid = "Valid",
    NotValid = "Not Valid",
    Blocked = "Blocked"
}

type tokenTypes = "Access" | "Refresh"
let accessToken: tokenTypes = "Access"
let refreshToken: tokenTypes = "Refresh"

export {
    userCreatedSuccessfully,
    somethingWentWrong,
    badRequest,
    NotValidData,
    accessTypes,
    accessStatuss,
    tokenTypes,
    accessToken,
    refreshToken,
    UnknownError,
}