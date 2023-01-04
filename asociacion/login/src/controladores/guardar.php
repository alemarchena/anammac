<?php
    include('./parametros.php');
    date_default_timezone_set('America/Monterrey');
    //-----------------conectando con la base de datos---------------------
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    
    if($mysqli->connect_error){exit('No se pudo conectar a la base de datos');}
    $fho = new DateTime();
    $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');

    $tabla              = "apt_usuarios";
    $json = json_decode(file_get_contents('php://input'),true);

    $usuario        =  $json['usuario'];
    $email          =  $json['email'];
   
    $sql = "INSERT INTO " .$tabla. "(usuario, email) values('$usuario','$email')";

    $resultado = $mysqli->query($sql);

    if($resultado)
    {
        echo $resultado;
    }else{
        echo "consultavacia ".$sql;
    }
    
    $mysqli->close();
?>