//Muestra las peliculas que pide el usuario.
function mostrarPeliculas(){
    $("#peliculas").empty()
    $.ajax({
        url: "https://www.omdbapi.com/?s="+ $("#buscador").val() +"&apikey=113dea2d",
        success: function(respuesta) {
            $.each(respuesta.Search , function( index, value ) {
                Card(value)
           })
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        }
        });
}

// Funcion que crea las card donde aparece la imagen de la pelicula y el titulo.
function Card(objeto){
    divG = $("<div class=\'col\'></div>")
    divP = $("<div class=\"card mt-3\" style=\"width: 18rem; height: 30rem\"></div>")
    divP.id = objeto.imdbID
    divP.append("<img class=\"card-img-top\" src="+ objeto.Poster +" alt=\"Card image cap\">")
    divS = $("<div class=\"card-body\"></div>")
    divS.append("<h5 class=\"card-title\">"+ objeto.Title +"</h5>")
    divS.append("<button class=\"btn btn-outline-success my-2 my-sm-0\" data-toggle=\"modal\" data-target=\"#modal\">Mostrar Contenido</button>")
    divP.append(divS)
    divP.click( () =>{
        $.ajax({
            url: "https://www.omdbapi.com/?i="+ objeto.imdbID +"&apikey=113dea2d" ,
            success: function(respuesta){
                console.log(respuesta)
                descripcionPelicula(respuesta)
            },
            error: function() {
                console.log("No se ha podido obtener la información");
            }
        });
    })
    divG.append(divP)
    $("#peliculas").append(divG)
}

// Funcion que muestra una ventana emergente con la informacion de la pelicula seleccionada
function descripcionPelicula(objeto){
    //Buscamos y borramos el contenido del modal.
    contenidoModal = $(".modal-content")
    contenidoModal.empty()

    //Creamos el header del modal
    header = $("<div class=\"modal-header\"></div>")
    header.append("<h5 class=\"modal-title\">"+objeto.Title+"</h5>")
    header.append("<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>")
    // Indexamos el header al contenido del modal
    contenidoModal.append(header)

    // Creamos el body del modal
    body = $("<div class=\"modal-body\"></div>")
    divCon = $("<div class=\"container-fluid\"></div>")
    row1 = $("<div class=\"row\"></div>")
    row1.append("<div class=\"col-6\"><img src="+ objeto.Poster +" class=\"img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}\" alt=\"\"></div>")
    row1.append("<div class=\"col-6\"><p><b>Fecha de Salida:</b> "+ objeto.Released +"</p><b>Director:</b> "+ objeto.Director +"<p><b>Actores:</b> "+ objeto.Actors +"</p></div>")
    divCon.append(row1)
    body.append(divCon)
    contenidoModal.append(body)
}                