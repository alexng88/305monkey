var Http = require( 'http' ),
    Router = require( 'router' ),
    server,
    router;
var counter = 0,
    todoList = {};
var BodyParser = require( 'body-parser' );
router = new Router();
 
server = Http.createServer( function( request, response ) {
  router( request, response, function( error ) {
    if ( !error ) {
      response.writeHead( 404 );
    } else {
      // Handle errors
      console.log( error.message, error.stack );
      response.writeHead( 400 );
    }
    response.end( 'RESTful API Server is running!' );

  });
});
 
server.listen( 3004, function() {
  console.log( 'Listening on port 3000' );
});
router.use( BodyParser.text() );
///////////////////READ///////////////////////////////
function readItem( request, response ) {
 var id = request.params.id,
 item = todoList[ id ];
 
 if ( typeof item !== 'string' ) {
 console.log( 'Item not found', id );
 response.writeHead( 404 );
 response.end( '\n' );
 return;
 }
 
 console.log( 'Read item', id, item);
 
 response.writeHead( 200, {
 'Content-Type' : 'text/plain'
 });
 response.end( item );
}
router.get( '/todo/:id', readItem );


function createItem( request, response ) {
  var id = counter += 1;
  console.log( 'Create item', id );
  response.writeHead( 201, {
    'Content-Type' : 'text/plain'
  });
  response.end( 'Item ' + id );
}
router.post( '/todo', createItem );

//////////////////////////POST////////////////////
function createItem( request, response ) {
  var id = counter += 1,
      item = request.body;
 
  console.log( 'Create item', id, item );
  todoList[ id ] = item;
  response.writeHead( 201, {
    'Content-Type' : 'text/plain',
    'Location' : '/todo/' + id
  });
  response.end( item );
}
router.post( '/todo', createItem );

///////////////DELETE/////////////////////////

function deleteItem( request, response ) {
 var id = request.params.id;

 if ( typeof todoList[ id ] !== 'string' ) {
 console.log( 'Item not found', id );
 response.writeHead( 404 );
 response.end( '\n' );
 return;
 }

 console.log( 'Delete item', id);

 todoList[ id ] = undefined;
 response.writeHead( 204, {
 'Content-Type' : 'text/plain'
 });
 response.end( '' );
}
router.delete( '/todo/:id', deleteItem );

/////////////////PUT/////////////////////////
function updateItem( request, response ){
  var id = request.params.id,
      item = request.body;
 
  if ( typeof todoList[ id ] !== 'string' ) {
    console.log( 'Item not found', id );
    response.writeHead( 404 );
    response.end( '\n' );
    return;
  }
 
  console.log( 'Update item', id, item );
 
  todoList[ id ] = item;
  response.writeHead( 201, {
    'Content-Type' : 'text/plain',
    'Location' : '/todo/' + id
  });
  response.end( item );
}
router.put( '/todo/:id', updateItem );