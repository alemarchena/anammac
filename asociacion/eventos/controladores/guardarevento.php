<?php
    include('./parametros.php');
    date_default_timezone_set('America/Monterrey');
    header('Content-Type: text/html; charset=UTF-8');
    
    //-----------------conectando con la base de datos---------------------
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    
    if($mysqli->connect_error){exit('No se pudo conectar a la base de datos');}
    $fho = new DateTime();
    $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');

    $tabla              = "apt_eventos";
    $json = json_decode(file_get_contents('php://input'),true);

    $nombreevento       =  $json['nombreevento'];
    $descripcionevento  =  $json['descripcionevento'];
    $fechaevento        =  $json['fechaevento'];
    $horaevento         =  $json['horaevento'];
    $whatsapp           =  $json['whatsapp'];

    $cantidadpruebasbase =  $json['cantidadpruebasbase'];
    $costopruebabase     =  $json['costopruebabase'];
    $costopruebaextra    =  $json['costopruebaextra'];

    $costomenores        =  $json['costomenores'];
    $edadmaximamenor     =  $json['edadmaximamenor'];
    $costopruebacombinada=  $json['costopruebacombinada'];

    $sql = "INSERT INTO " .$tabla. "(nombre,descripcion,fecha,hora,whatsapp,
    cantidadpruebasbase,costopruebabase,costopruebaextra,costomenores,edadmaximamenor,costopruebacombinada)
    values('$nombreevento','$descripcionevento','$fechaevento','$horaevento','$whatsapp',
    $cantidadpruebasbase,$costopruebabase,$costopruebaextra,$costomenores,$edadmaximamenor,$costopruebacombinada)";

    // var_dump($sql);

    $resultado = $mysqli->query($sql);

    if($resultado)
    {
        echo $resultado;
    }else{
        echo "consultavacia ".$sql;
    }
    
    $mysqli->close();
?>