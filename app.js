//requereimos la variables que usaremos para este proyecto
var express = require("express");
var app = express();
var port =3700;
//necesitamos decirle a node donde estaran los archivos de ccs
app.use(express.static(__dirname + "/pubic"));
//direccion de nuestras vistas
app.set('views', __dirname + '/views');
//motor de plantillas que vamos a utilizar
app.set('view engine', "jade");
app.engine('jade', require("jade").__express);
//vamos a la pagina con la funcion required and response
app.get("/", function(req, res){
    res.render('pagina.jade');
});

//empezamos a iniciar el socket y escuchamos el puerto
var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function(socket){
    //conectamos con el chat
    socket.emit("message", {message: "Bienvenido al chat. "});
    //vamos a revisar cuando se emitio o no un mensaje
    socket.on('send', function(data){
        io.sockets.emit('message', data);
    });
});
//escuchamos el puerto para iniciar el servidor
console.log("escuchando el puerto "+ port);