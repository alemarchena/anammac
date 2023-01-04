<?php
    include('./parametros.php');
    date_default_timezone_set('America/Monterrey');
    //-----------------conectando con la base de datos---------------------
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    
    if($mysqli->connect_error){exit('No se pudo conectar a la base de datos');}
    $fho = new DateTime();
    $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');

    $tabla              = "apt_afiliaciones";
    $json = json_decode(file_get_contents('php://input'),true);

    $usuario =  $json['usuario'];
    $codigoestado =  $json['codigoestado'];
   
    $sql = "INSERT INTO " .$tabla. "(usuario,codigoestado,aprobado,desactivado) values('$usuario','$codigoestado',0,1)";


    $resultado = $mysqli->query($sql);

    if($resultado)
    {
        echo $resultado;
    }else{
        echo "consultavacia ".$sql;
    }
    
    $mysqli->close();
?>