<?php
    include('./parametros.php');
    date_default_timezone_set('America/Monterrey');
    header('Content-Type: text/html; charset=UTF-8');
    
    //-----------------conectando con la base de datos---------------------
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    
    if($mysqli->connect_error){exit('No se pudo conectar a la base de datos');}
    $fho = new DateTime();
    $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');

    $tabla              = "apt_usuarios";
    $json = json_decode(file_get_contents('php://input'),true);

    $usuario        =  $json['usuario'];
    $email          =  $json['email'];
    $idestado       =  $json['idestado'];
    $estaautorizado =  $json['estaautorizado'];
    $esadministrador=  $json['esadministrador'];
    
   
    $sql = "INSERT INTO " .$tabla. "(usuario,email,idestado,estaautorizado,esadministrador)
    values('$usuario','$email',$idestado,$estaautorizado,$esadministrador)";

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