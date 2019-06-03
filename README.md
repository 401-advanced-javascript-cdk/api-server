# Block Lab - API Server 
API server with auth middleware for signup and routes
### Author: Chris Kozlowski

## Links and Resources
* [Submission PR](https://github.com/401-advanced-javascript-cdk/api-server/pull/1)
* [Travis](https://travis-ci.com/401-advanced-javascript-cdk/api-server)
* [Heroku Deployment](https://api-server-cdk.herokuapp.com/)

## Auth Routes

#### POST /signup
Signs up a new user.  Requires username and password.  Optionally takes a role (user, editor, or admin) and an email.  Will default to the user role unless one is supplied, which is required for some other routes.  Newly signedup clients will receive a one-time token.
#### POST /signin
Signs in a user with a username and password, and gives a one-time token.
#### GET /key
Once signed in, a user can go to this route to receive a key that does not expire.

## API Routes

### GET Routes
Requires the 'read' capability (user, editor, and admin roles)

#### GET /api/v1/categories
Shows all categories
#### GET /api/v1/products
Shows all products
#### GET /api/v1/categories/:id
Shows the category with the given id.
#### GET /api/v1/products/:id
Shows the product with the given id.

### POST Routes
Requires the 'create' capability (editor and admin roles)

#### POST /api/v1/categories
Creates a new category.  Requires a title.
#### POST /api/v1/products
Creates a new product.  Requires a title, a quantity, and a category.

### PUT Routes
Requires the 'create' capability (editor and admin roles)

#### PUT /api/v1/products/:id
Updates the product with the given id.
#### PUT /api/v1/categories/:id
Updates the category with the given id.

### DELETE Routes
Requires the 'delete' capability (admin role)

#### DELETE /api/v1/products/:id
Deletes the products with the given id.
#### DELETE /api/v1/categories/:id
Deletes the category with the given id.

Any other route will return a 404 error.

#### Testing
`npm test`
