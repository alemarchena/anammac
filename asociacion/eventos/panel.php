
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
    <script>var version=13  ;</script>

    <link rel="stylesheet" href="./estilos.css?a=14">
    <link rel="stylesheet" href="./main.css?a=14">

    <script src="./main.js?a=14" type="module"></script>
    <script src="./funciones.js?a=14"></script>
    
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
                  
                     <!-- --------------------- Creacion de eventos  --------------------------- -->
                    <div class="carousel-item active">
                        <div class="row ">
                            <div class="col-sm-12 col-md-4 offset-md-4">
                                <a id="nuevoevento" href="!#" class="btn btn-warning">Nuevo evento</a>
                            </div>
                            <div class="col-sm-12 col-md-3">
                                <div class="row justify-content-center">
                                    <label style="text-align:center;">Id evento (automático)</label>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <input id="ideventoauto" type="number" readonly disabled>
                                </div>
                            </div>
                        </div>

                        <br>
                        <div class="row ">
                            <div class="col-sm-10 col-md-4 offset-md-4" style="text-align: center;">
                                <label for="nombreeventog" class="col-form-label">Nombre del evento (*)</label>
                                <input type="text" class="form-control" id="nombreeventog" style="text-align: center;" placeholder = "Ej: Competencia Nacional">
                            </div>
                            <div class="col-sm-12 col-md-3 form-group">
                                <div class="row justify-content-center">
                                    <label style="text-align:center;">Fecha del evento (*)</label>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <input id="fechaeventog" type="date">
                                </div>
                            </div>
                            
                        </div>
                        <br>
                       
                        <div class="row">
                        
                            <div class="col-sm-10 col-md-4 offset-md-4">
                                <label for="descripcioneventog">Descripción del evento (*)</label>
                                <textarea class="form-control" id="descripcioneventog" rows="3"></textarea>
                            </div>
                            <div class="col-sm-10 col-md-2" style="text-align: center;">
                                <div class="row justify-content-center">
                                    <label for="horaeventog" class="col-form-label">Hora del evento (*)</label>
                                </div>
                                <div class="row justify-content-center">
                                    <input type="time" class="form-control" id="horaeventog" style="text-align: center;" placeholder = "Ej: 20:30">
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="row justify-content-center">
                            <div class="col-sm-10 col-md-4" style="text-align: center;">
                                <label for="whatsappg" class="col-form-label">Whatsapp del referente</label>
                                <input type="text" class="form-control" id="whatsappg" style="text-align: center;" placeholder = "Ej: 52 999 xxx xxx">
                            </div>
                        </div>
                        <br>
                        <div class="row justify-content-center">
                            <div class="col-sm-12 col-md-4">
                                <label for="cantidadpruebasbase" class="col-form-label">Cantidad de pruebas base  (*)</label>
                                <input type="number" class="form-control" id="cantidadpruebasbase" style="text-align: center;" placeholder = "Ej: 3">
                            </div>
                            <div class="col-sm-12 col-md-4">
                                <label for="costopruebabase" class="col-form-label">Costo total de pruebas base  (*)</label>
                                <input type="number" class="form-control" id="costopruebabase" style="text-align: center;" placeholder = "Ej: 350">
                            </div>
                            <div class="col-sm-12 col-md-4">
                                <label for="costopruebaextra" class="col-form-label">Costo de prueba extra</label>
                                <input type="number" class="form-control" id="costopruebaextra" style="text-align: center;" placeholder = "Ej: 150">
                            </div>
                        </div>
                        <br>
                        <hr>
                        <div class="row justify-content-center">
                            <div class="col-sm-12 col-md-4">
                                <label for="costomenores" class="col-form-label">Costo a menores</label>
                                <input type="number" class="form-control" id="costomenores" style="text-align: center;" placeholder = "Ej: 150">
                            </div>
                            <div class="col-sm-12 col-md-4">
                                <label for="edadmaximamenor" class="col-form-label">Edad Maxima del menor</label>
                                <input type="number" class="form-control" id="edadmaximamenor" style="text-align: center;" placeholder = "Ej: 12">
                            </div>
                            <div class="col-sm-12 col-md-4">
                                <label for="costopruebacombinada" class="col-form-label">Costo de prueba combinada</label>
                                <input type="number" class="form-control" id="costopruebacombinada" style="text-align: center;" placeholder = "Ej: 650">
                            </div>
                        </div>
                        <br>
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
                                            <select  class="form-select" aria-label="Default select example" id="codigoevento" name="codigoprueba" ></select>
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

                        <div class="row">
                            <div class="col-sm-10 col-md-4 offset-md-4" style="text-align: center;">
                                <label for="nombreprueba" class="col-form-label">Nombre de la prueba</label>
                                <input type="text" class="form-control" id="nombreprueba" style="text-align: center;">
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

