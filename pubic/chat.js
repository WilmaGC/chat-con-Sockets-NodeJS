$(document).ready(function(){
    var messages = []
    //preparamzos la conexion con la pagina
    var socket = io.connect("http://localhost:3700");
    var field = $('#field');
    var name = $('#name');
    //escuvhamos los mensajes del socket
    socket.on("message", function(data){
        //validamos si hay el mensaje
        if(data.message){
            //insertamos al arreglo que se tiene
            messages.push(data);
            var html = '';
            //comenzamos a insertar 
            for(var i=0;i<messages.length;i++){
                html += '<b>'+(messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br/>';    
            }
            //lo agregamos al content
            $('#content').html(html);
        }
        else{
            console.log("Hay un problema: ", data);
        }
    });
    //creamos el evento cuando el usuario haga clik al boton enviar
    $('#send').click(function(){
        //validamos que se haya introducido el nombre
        if(name.val()==""){
            alert("Ingrese su nombre");
        }else{
            //desactivamos la caja de texto para que no pueda cambiar su nombre a mitad de la conversacion
            $('#name').attr('disabled','disabled');    
            var texto = field.val();
            //emitimos usando socket
            socket.emit('send',{message: texto, username: name.val()});
            field.val("");
        }
    });
});