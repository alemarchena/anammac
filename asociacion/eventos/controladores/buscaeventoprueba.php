<?php
    include('./parametros.php');
    date_default_timezone_set('America/Monterrey');
    header('Content-Type: text/html; charset=UTF-8');
    
    //-----------------conectando con la base de datos---------------------
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    
    if($mysqli->connect_error){exit('No se pudo conectar a la base de datos');}
    $fho = new DateTime();
    $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');

    $tabla              = "apt_eventoprueba";
    $json = json_decode(file_get_contents('php://input'),true);

    $codigoevento       =  $json['codigoevento'];
    $codigoprueba       =  $json['codigoprueba'];
    $codigodetalle      =  $json['codigodetalle'];
    

    $sql = "select * from " .$tabla. " 
    where   codigoevento = $codigoevento and 
            codigoprueba = $codigoprueba and 
            codigodetalle = $codigodetalle";

            
    $resultado = $mysqli->query($sql);

    // var_dump($resultado);

    if($resultado->num_rows > 0)
    {
        echo json_encode("encontrado");
    }else{
        echo json_encode("consultavacia");
    }
    
    $mysqli->close();
?>