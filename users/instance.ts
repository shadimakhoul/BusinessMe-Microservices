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

type tokenTypes = "AccessToken" | "RefreshToken"
let AccessToken: tokenTypes = "AccessToken"
let RefreshToken: tokenTypes = "RefreshToken"

export {
    userCreatedSuccessfully,
    somethingWentWrong,
    badRequest,
    NotValidData,
    accessTypes,
    accessStatuss,
    tokenTypes,
    AccessToken,
    RefreshToken,
    UnknownError,
}