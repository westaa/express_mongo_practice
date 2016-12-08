participant Browser

The client accepts a form input from the user, which sends a post request to the server.

participant Express

The Express Server has a route such that when a post request is received, a call to the MongoDB database is made, and if a database is not in place, one is instantiated.

participant Mongo

MongoDB acts on the method:

albumCollection.insert({ name: req.body.album_name });

and inserts the user's input into the database as the req.body.album_name.
