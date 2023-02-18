
<?php 
session_start();
$arr = array();

if(!isset($_SESSION['datospaquete']) || $_SESSION['datospaquete'] == ''){
    header('Location: ../index.html');
    exit;
}else{
    $arr = $_SESSION['datospaquete'];
}
session_destroy();
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="../img/favicon.png">
    <title>Eventos</title>

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- <link rel="stylesheet" href="bootstrap.css"> -->
    <script>var version=18  ;</script>

    <link rel="stylesheet" href="./estilos.css?a=18">
    <link rel="stylesheet" href="./main.css?a=18">

    <script src="./main.js?a=18" type="module"></script>
    <script src="./funciones.js?a=18"></script>
    
  </head>
  <body>
    
  <nav id="navbar" class="navbar navbar-expand-lg bg-light navbar-light ">
    <div class="container">
      <div style="margin: 0.5em;">
        <a href="#"><img id="logo" src="../img/logo.png" alt="ANAMM,A.C" width="ms-auto" height="100"></a>
      </div>
      
  </nav>
      
    <!-- Div for application -->
    <div id="App"></div>

    <div id="espera" class="d-flex justify-content-center" style="visibility: hidden;">
        <div class="spinner-border text-warning" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>



    <div id="sistema" class="p-3" >
      <div  style="text-align: center;">
        <form id="formulario">
            <div class="row" style="text-align: center;">

                <div class="col" >

                    <button id="previo" class="btn btn-light text-muted btn-sm" data-bs-target="#carrusel" data-bs-slide="prev" >Anterior</button>
                </div>
                <div  class="col" >

                    <button id="siguiente" class="btn btn-light text-black btn-sm" data-bs-target="#carrusel" data-bs-slide="next" >Siguiente</button> 
                </div>
            </div>
            <br>

            <div id="carrusel" class="carousel slide" data-bs-ride="carousel">
            
                <div class="carousel-inner">
                    <!-- -------------------------- Consulta de Inscriptos -------------------- -->
                    <div class="carousel-item active">
                        <div class="d-flex justify-content-center">
                            <div class="col-sm-12 col-md-4 ">
                                <input type="text" class="form-control" id="buscado" placeholder="Busca nombre,o apellido,o usuario, o email">
                            </div>
                        </div>
                        <br>
                        <div class="row justify-content-center">
                            <div class="col-sm-12 col-md-4" style="text-align: center;">
                                <select  class="form-select" aria-label="Default select example" id="codigoeventopagado" name="codigoeventopagado" ></select>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-sm-1 offset-md-6" style="text-align: right;">
                                <div class="tooltipbutton">
                                    <a id="buscar" type="button" class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Buscar atletas">Todos<span class="material-icons md-light md-48">search</span></a>
                                </div>
                            </div>
                            <div class="col-sm-1" style="text-align: right;">
                                <div class="tooltipbutton">
                                    <a id="buscarreciente" type="button" class="btn btn-info" data-toggle="tooltip" data-placement="top" title="Buscar con pago reciente">Recientes<span class="material-icons md-light md-48">search</span></a>
                                </div>
                            </div>
                            <div class="col-sm-2" style="text-align: right;">
                                <div class="tooltipbutton">
                                    <a id="buscaraprobados" type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Buscar atletas aprobados">Aprobados<span class="material-icons md-light md-48">search</span></a>
                                </div>
                            </div>
                            
                        </div>
                        <hr>
                        
                        <div class="accordion" id="accordionExample">

                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Datos
                                </button>
                                </h2>

                                <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                
                                    <div class="accordion-body">

                                        <div class="d-flex justify-content-center">
                                            <label for="divdatos" class="col-form-label">Resultados</label>
                                        </div>

                                        <div id="divdatos" class="row" >
                                            <div class="col-sm-12 col-md-2">
                                                <div class="row justify-content-center">
                                                <label for="fotoatleta">Foto del inscrito</label>
                                                </div>
                                                <div class="row justify-content-center">
                                                <img id="fotoatleta" src="./img/avatarvacio.jpg" alt="Atleta" class="zoom img-fluid"> 
                                                <a href="" id="descargaatleta" download >Descargar</a> 
                                                </div>
                                            </div>
                                            
                                            <div class="col-sm-12 col-md-2">
                                                <div class="row justify-content-center">
                                                <label for="fotopago">Pago al evento</label>
                                                </div>
                                                <div class="row justify-content-center">
                                                <img id="fotopago" src="./img/avatarvacio.jpg" alt="Pago" class="zoom img-fluid"> 
                                                <a href="" id="descargapago" download>Descargar</a> 
                                                </div>
                                            </div>

                                            <div class="col-sm-12 col-md-6 p-1">
                        
                                                <div class="row justify-content-center"><input type="text" class="form-control" id="idafiliacion" placeholder='Nº control interno' disabled readonly></div>
                                                <div class="row justify-content-center"><input type="text" class="form-control" id="numeroafiliado" placeholder='Falta Nº afiliado' disabled readonly></div>
                                                
                                                <div class="row justify-content-center"><input type="text" class="form-control" id="nombrecambia" placeholder='Nombres' ></div>
                                                <div class="row justify-content-center"><input type="text" class="form-control" id="apellidocambia" placeholder='Apellidos' ></div>
                                                <div class="row justify-content-center">
                                                
                                                <!-- ----------------------------------------------------------- -->
                                                </div>

                                                <div class="row justify-content-center"><input type="text" class="form-control" id="montopagado"  placeholder='monto $ Mex' disabled readonly></div>
                                                <div class="row justify-content-center"><input type="text" class="form-control" id="montopagadodolar"  placeholder='monto U$S EEUU' disabled readonly></div>
                                                <div class="row justify-content-center"><input type="text" class="form-control" id="whatsappc"  placeholder='Falta el Whatsapp' disabled readonly></div>
                                                <div class="row justify-content-center"><input type="text" class="form-control" id="emailc"  placeholder='Falta el email' disabled readonly></div>
                                            </div>
                                        </div>

                                    </div> 

                                </div>
                            </div>
                        
                        </div>

                        <div class="d-flex justify-content-center">
                            <p id="totalencontrado"></p>
                        </div>
                        <!-- ---------------- Tabla con resultados de la busqueda ---------------------- -->
                        <div id="resultadobusqueda"></div>

                    </div>
                     <!-- --------------------- Creacion de eventos  --------------------------- -->
                    <div class="carousel-item ">
                        <div class="row justify-content-center">
                            <div class="col-sm-12 col-md-2">
                                <div class="d-flex justify-content-center">
                                    <label for="ideventoauto">Id (auto)</label>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <input id="ideventoauto" type="number" readonly disabled>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-3">
                                <a id="nuevoevento" href="!#" class="btn btn-warning">Nuevo evento</a>
                            </div>
                        </div>
                        <br>
                        <div class="row justify-content-center">

                            <div class="col-sm-12 col-md-3 form-group">
                                <div class="row justify-content-center">
                                    <label style="text-align:center;" ">Fecha del evento (*)</label>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <input id="fechaeventog" type="date">
                                </div>
                            </div>
                        </div>
                        <br>
                        <hr>
                        <div class="row justify-content-center">

                            <div class="col-sm-10 col-md-1" style="text-align: center;">
                                <div class="row justify-content-center">
                                    <label for="horaeventog" class="col-form-label">Hora (*)</label>
                                </div>
                                <div class="row justify-content-center">
                                    <input type="time" class="form-control" id="horaeventog" style="text-align: center;" placeholder = "Ej: 20:30">
                                </div>
                            </div>
                            <div class="col-sm-10 col-md-3" style="text-align: center;">
                                <label for="whatsappg" class="col-form-label">Whatsapp contacto</label>
                                <input type="text" class="form-control" id="whatsappg" style="text-align: center;" placeholder = "Ej: 52 999 xxx xxx">
                            </div>
                        </div>
                        <br>
                        <div class="row justify-content-center">
                            <div class="col-sm-10 col-md-6" style="text-align: center;">
                                <label for="nombreeventog" class="col-form-label">Nombre del evento (*)</label>
                                <input type="text" class="form-control" id="nombreeventog" style="text-align: center;" placeholder = "Ej: Competencia Nacional">
                            </div>
                        </div>
                        <br>
                       
                        <div class="row justify-content-center">
                            <div class="col-sm-10 col-md-6">
                                <label for="descripcioneventog">Descripción del evento (*)</label>
                                <textarea class="form-control" id="descripcioneventog" rows="3"></textarea>
                            </div>
                        </div>
            
                        <br>
                        <div class="row justify-content-center">
                            <div class="col-sm-12 col-md-3">
                                <label for="cantidadpruebasbase" class="col-form-label">Cantidad de pruebas base  (*)</label>
                                <input type="number" class="form-control" id="cantidadpruebasbase" style="text-align: center;" placeholder = "Ej: 3">
                            </div>
                            <div class="col-sm-12 col-md-3">
                                <label for="costopruebabase" class="col-form-label">Costo total de pruebas base  (*)</label>
                                <input type="number" class="form-control" id="costopruebabase" style="text-align: center;" placeholder = "Ej: 350">
                            </div>
                            <div class="col-sm-12 col-md-3">
                                <label for="costopruebaextra" class="col-form-label">Costo de prueba extra</label>
                                <input type="number" class="form-control" id="costopruebaextra" style="text-align: center;" placeholder = "Ej: 150">
                            </div>
                            <div class="col-sm-12 col-md-3">
                                <label for="costopruebacombinada" class="col-form-label">Costo de prueba combinada</label>
                                <input type="number" class="form-control" id="costopruebacombinada" style="text-align: center;" placeholder = "Ej: 650">
                            </div>
                        </div>
                        <br>
                        <div class="row ">
                            <div class="col-sm-12 col-md-3 offset-md-3">
                                <label for="costopruebabasedolar" class="col-form-label">Costo total U$S pruebas base  (*)</label>
                                <input type="number" class="form-control" id="costopruebabasedolar" style="text-align: center;" placeholder = "Ej: 350">
                            </div>
                            <div class="col-sm-12 col-md-3">
                                <label for="costopruebaextradolar" class="col-form-label">Costo U$S de prueba extra</label>
                                <input type="number" class="form-control" id="costopruebaextradolar" style="text-align: center;" placeholder = "Ej: 150">
                            </div>
                            <div class="col-sm-12 col-md-3">
                                <label for="costopruebacombinadadolar" class="col-form-label">Costo U$S de prueba combinada</label>
                                <input type="number" class="form-control" id="costopruebacombinadadolar" style="text-align: center;" placeholder = "Ej: 650">
                            </div>
                        </div>
                        <br>
                        <hr>
                        <div class="row ">
                            <div class="col-sm-12 col-md-3 offset-md-3">
                                <label for="costomenores" class="col-form-label">Costo a menores</label>
                                <input type="number" class="form-control" id="costomenores" style="text-align: center;" placeholder = "Ej: 150">
                            </div>
                            <div class="col-sm-12 col-md-3">
                                <label for="edadmaximamenor" class="col-form-label">Edad Maxima del menor</label>
                                <input type="number" class="form-control" id="edadmaximamenor" style="text-align: center;" placeholder = "Ej: 12">
                            </div>
                            
                        </div>
                        <br>
                        <hr>
                        <div class="row justify-content-center">
                            <div class="col-sm-10 col-md-4">
                                <a id="guardarevento" href="#" class="btn btn-info p-1">Guardar<span class="material-icons">save</span></a>
                                <a id="vereventos" href="#" class="btn btn-info p-1">Ver eventos<span class="material-icons">visibility</span></a>
                            </div>
                        </div>
                        <br>
                        <div class="row justify-content-center">
                            <div class="col-sm-10 col-md-12">
                                <div id="resultadoseventos"></div>
                            </div>
                        </div>
                    </div>

                    <!-- --------------------- Asignación de pruebas al evento  --------------------------- -->
                    <div class="carousel-item">
                        
                        <div class="row">
                            
                            <div class="col-sm-12 col-md-6"> <!-- pruebas disponibles -->
                                <div class="row justify-content-center">
                                    <div class="col-sm-12">
                                        <a id="verpruebasevento" href="#" class="btn btn-info p-1">Ver pruebas disponibles<span class="material-icons">visibility</span></a>
                                    </div>
                                </div>
                                <br>
                                <div class="row justify-content-center">
                                    <div class="col-sm-12">
                                        <div id="resultadopruebasevento"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6"> <!-- pruebas del evento -->
                                <div class="row justify-content-center">
                                    <div class="col-sm-12">
                                        <a id="vereventoconpruebas" href="#" class="btn btn-info p-1">Ver pruebas del evento<span class="material-icons">visibility</span></a>
                                    </div>
                                </div>
                                <br>
                                <div class="row justify-content-center">
                                    <div class="row">
                                        <div class="col-sm-12" style="text-align: center;">
                                            <select  class="form-select" aria-label="Default select example" id="codigoevento" name="codigoevento" ></select>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row justify-content-center">
                                        <div class="col-sm-12">
                                            <div id="resultadoeventoconpruebas"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        
                    </div>
                    <!-- --------------------- Creacion de nombres de pruebas  --------------------------- -->
                    <div class="carousel-item ">
                        <div class="row justify-content-center">
                            <div class="col-sm-12 col-md-2">
                                <div class="d-flex justify-content-center">
                                    <label for="idpruebaauto">Id prueba (auto)</label>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <input id="idpruebaauto" type="number" readonly disabled>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-3">
                                <a id="nuevaprueba" href="!#" class="btn btn-warning">Nueva prueba</a>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-sm-10 col-md-4 offset-md-4" style="text-align: center;">
                                <label for="nombreprueba" class="col-form-label">Nombre de la prueba</label>
                                <input type="text" class="form-control" id="nombreprueba" style="text-align: center;">
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-sm-10 col-md-4 offset-md-4" style="text-align: center;">
                                <label for="ordenprueba" class="col-form-label">Nº de orden visual</label>
                                <input type="number" class="form-control" id="ordenprueba" style="text-align: center;" placeholder = "Ej: 1 se verá primero">
                            </div>
                        </div>
                        <br>
                        <div class="row justify-content-center">
                            <div class="col-sm-10 col-md-4">
                                <a id="guardarnombreprueba" href="#" class="btn btn-info p-1">Guardar<span class="material-icons">save</span></a>
                                <a id="verpruebas" href="#" class="btn btn-info p-1">Ver pruebas<span class="material-icons">visibility</span></a>
                            </div>
                        </div>
                        <br>
                        <div class="row justify-content-center">
                            <div class="col-sm-12 col-md-6">
                                <div id="resultadobusquedapruebas"></div>
                            </div>
                        </div>

                    </div>
                    <!-- -------------------- pruebas  ---------------------- -->
                    <div class="carousel-item">
                        <div class="row justify-content-center">
                            <div class="col-sm-12 col-md-2">
                                <div class="d-flex justify-content-center">
                                    <label for="idpruebaautodetalle">Id detalle (auto)</label>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <input id="idpruebaautodetalle" type="number" readonly disabled>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-3">
                                <a id="nuevapruebadetalle" href="!#" class="btn btn-warning">Nuevo</a>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-sm-10 col-md-4 offset-md-4" style="text-align: center;">
                                <select  class="form-select" aria-label="Default select example" id="codigoprueba" name="codigoprueba" ></select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-10 col-md-4 offset-md-4" style="text-align: center;">
                                <label for="nombredetalle" class="col-form-label">Detalle de la prueba</label>
                                <input type="text" class="form-control" id="nombredetalle" style="text-align: center;" placeholder = "Ej: 100 mtr">
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-sm-10 col-md-4 offset-md-4" style="text-align: center;">
                                <label for="ordenpruebadetalle" class="col-form-label">Nº de orden al visualizar</label>
                                <input type="number" class="form-control" id="ordenpruebadetalle" style="text-align: center;" placeholder = "Ej: 1 se verá primero">
                            </div>
                        </div>
                        <br>
                        <div class="row justify-content-center">
                            <div class="col-sm-10 col-md-4">
                                <a id="guardarnombredetalle" href="#" class="btn btn-info p-1">Guardar<span class="material-icons">save</span></a>
                                <a id="verdetalle" href="#" class="btn btn-info p-1">Ver detalle prueba<span class="material-icons">visibility</span></a>
                            </div>
                        </div>
                        <br>
                        <div class="row justify-content-center">
                            <div class="col-sm-12 col-md-6">
                                <div id="resultadobusquedadetalleprueba"></div>
                            </div>
                        </div>

                    </div>
                   
                </div>
            </div>
          <br>
          <p id="mensaje" class="mensajero" > </p>
            <!-- <button id="enviar" type="submit" class="btn btn-info text-dark mt-5" style="display: none; align-self: center;">Guardar</button> -->
        </form>
      </div>
    </div>

    <br>
    <hr>
    <div class="d-flex justify-content-center">
      <p>®2023 - Eventos</p>
    </div> 

    <!-- JavaScript Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>


</body>

