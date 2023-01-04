
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
    <title>Ingreso</title>

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- <link rel="stylesheet" href="bootstrap.css"> -->
    <script>var version=10  ;</script>

    <link rel="stylesheet" href="./estilos.css?a=10">
    <link rel="stylesheet" href="./main.css?a=10">

    <script src="./maindelegado.js?a=10" type="module"></script>
    
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
                  
                    <!-- -------------------- Datos personales ---------------------- -->
                    <div class="carousel-item active">
                        <div class="d-flex justify-content-center">
                            <div class="col-sm-12 col-md-4 ">
                                <input type="text" class="form-control" id="buscado" placeholder="Busca nombre,o apellido,o usuario, o email">
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-sm-12 col-md-2 offset-md-6" style="text-align: right;">
                                <div class="tooltipbutton">
                                    <a id="buscar" type="button" class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Buscar atletas">Buscar<span class="material-icons md-light md-48">search</span></a>
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
                                                <label for="fotoatleta">Tu foto</label>
                                                </div>
                                                <div class="row justify-content-center">
                                                <img id="fotoatleta" src="./img/avatarvacio.jpg" alt="Atleta" class="zoom img-fluid"> 
                                                <a href="" id="descargaatleta" download >Descargar</a> 
                                                </div>
                                                </div>
                                            <div class="col-sm-12 col-md-2">
                                                <div class="row justify-content-center">
                                                <label for="fotodocumento">Tu IFE</label>
                                                </div>
                                                <div class="row justify-content-center">
                                                <img id="fotodocumento" src="./img/avatarvacio.jpg" alt="IFE" class="zoom img-fluid"> 
                                                <a href="" id="descargadocumento" download>Descargar</a> 
                                                </div>
                                            </div>

                                            <div class="col-sm-12 col-md-2">
                                                <div class="row justify-content-center">
                                                <label for="fotopago">Tu Pago</label>
                                                </div>
                                                <div class="row justify-content-center">
                                                <img id="fotopago" src="./img/avatarvacio.jpg" alt="Pago" class="zoom img-fluid"> 
                                                <a href="" id="descargapago" download>Descargar</a> 
                                                </div>
                                            </div>

                                            <div class="col-sm-12 col-md-6 p-1">
                                                <div class="row justify-content-center"><input type="text" class="form-control" id="numeroafiliado" placeholder='Falta Nº afiliado' disabled readonly></div>
                                                <div class="row justify-content-center"><input type="text" class="form-control" id="nombreespecialidad"  placeholder='Falta especialidad' disabled readonly></div>
                                                <div class="row justify-content-center"><input type="text" class="form-control" id="nombretalla" placeholder='Falta talla' disabled readonly></div>
                                                <div class="row justify-content-center"><hr></div>
                                                <div class="row justify-content-center"><input type="text" class="form-control" id="nombreestado" placeholder='Falta estado' disabled readonly></div>
                                                <div class="row justify-content-center"><textarea class="form-control" id="direccion" rows="3" placeholder='Falta dirección' disabled readonly></textarea></div>
                                                <div class="row justify-content-center"><input type="text" class="form-control" id="whatsapp" placeholder='Falta whatsapp' disabled readonly></div>
                                                <div class="row justify-content-center"><p id="vfechanacimientotexto"></p></div>
                                                <div class="row justify-content-center"><input type="text" class="form-control" id="nombresangre" placeholder='Falta sangre' disabled readonly></div>
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
                
                <div class="carousel-item">
                    <div class="d-flex justify-content-center">
                        <h5>Genera un usuario aleatorio</h5>
                    </div>
                    <div class="d-flex justify-content-center">
                        <h5>Luego modifica el registro desde el ingreso como atleta</h5>
                    </div>
                    <div class="row">
                      <div class="col-sm-10 col-md-2 offset-md-4" style="text-align: center;">
                          <input type="text" disabled class="form-control" id="keyusuario" placeholder="Usuario aleatorio">
                      </div>
                      <div class="col-sm-10 col-md-2 " style="text-align: center;">
                          <a href="#" class="btn btn-success" id="generarusuario">Generar usuario</a>
                      </div>
                    </div>
                    
                </div>

                <!-- -------------------- email, direccion y whatsapp  ---------------------- -->
                <div class="carousel-item">
                    <h5>Datos del delegado</h5>
                    <p id="uemail"><?php echo $arr['email']; ?></p>
                    <p id="upas"><?php echo $arr['usuario']; ?></p>
                    <p id="uidestado"><?php echo $arr['idestado']; ?></p>
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
      <p>®2023 - ANAMM,A.C</p>
    </div> 

    <!-- JavaScript Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>


</body>