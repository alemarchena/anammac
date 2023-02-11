<?php
    include('./parametros.php');
    date_default_timezone_set('America/Monterrey');
    //-----------------conectando con la base de datos---------------------
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    
    if($mysqli->connect_error){exit('No se pudo conectar a la base de datos');}
    $fho = new DateTime();
    $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');

    $tabla              = "apt_inscriptos";
    $json = json_decode(file_get_contents('php://input'),true);

    $numeroafiliado = $json['numeroafiliado'];
    $idevento       = $json['idevento'];
    $codigoprueba   = $json['codigoprueba'];
    $codigodetalle  = $json['codigodetalle'];
    $ideventoprueba = $json['ideventoprueba'];
   
    $sql = "delete from $tabla where numeroafiliado='$numeroafiliado' and idevento=$idevento 
    and codigoprueba=$codigoprueba and codigodetalle=$codigodetalle and ideventoprueba=$ideventoprueba";
    
    $resultado = $mysqli->query($sql);
    if($resultado)
    {
        echo json_encode($resultado);
    }else
    {
        echo json_encode("consultavacia");
    }
    $mysqli->close();
?>