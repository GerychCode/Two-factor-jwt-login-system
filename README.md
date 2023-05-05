# Two-factor Authentication Practice Project

This is a mini project that implements two-factor authentication in a registration and login system. The project is a Node.js server that includes routes for registration, login, token refreshing, and displaying a QR code for setting up two-factor authentication.

## Installation
1.Clone this repository to your local machine.\
2.Install the dependencies by running the following command in your terminal:\
`npm install`

## Usage
1.Start the server by running the following command in your terminal: \
`node .` \
*The server will start listening on port 3001* \
2.Use a tool such as Postman to send HTTP requests to the server.

## Routes
### /user/registration
+ Method: **POST** 
+ Endpoint: **/user/registration** 
+ Request Body: JSON Object with the following properties: 
> login: **(string, required) The login of the user being registered.** \
> email: **(string, required) The email address of the user being registered.** \
> password: **(string, required) The password of the user being registered.** 

### /user/login
+ Method: **POST** 
+ Endpoint: **/user/login** 
+ Request Body: JSON Object with the following properties: \
> login: (string, required) The login of the user attempting to log in. \
> password: (string, required) The password of the user attempting to log in. \
> key: (string, required) The two-factor authentication key provided by the user. 

### /user/refresh
+ Method: **POST** 
+ Endpoint: **/user/refresh**

### /user/qr
+ Method: GET
+ Endpoint: /user/qr
+ Query Parameters:
> secret: (string, required) The base32-encoded secret key for setting up two-factor authentication. \
> name: (string, required) The username of the user. 

## Dependencies
+ bcrypt: Used for password hashing and comparison.
+ cookie-parser: Used for parsing cookies.
+ dotenv: Used for loading environment variables.
+ express: Web framework used for building the server.
+ jsonwebtoken: Used for generating and verifying JSON Web Tokens.
+ mysql2: Used for connecting to a MySQL database.
+ qrcode: Used for generating the QR code for two-factor authentication.
+ speakeasy: Used for implementing two-factor authentication.
+ validator: Used for data validation.

