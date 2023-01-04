<?php
    include('./parametros.php');
    date_default_timezone_set('America/Monterrey');
    //-----------------conectando con la base de datos---------------------
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    
    if($mysqli->connect_error){exit('No se pudo conectar a la base de datos');}
    $fho = new DateTime();
    $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');

    $tabla              = "apt_usuarios";
    $datosconsulta      = json_decode(file_get_contents('php://input'),true);
    $tipo               = $datosconsulta['tipo'];
    $id                 = $datosconsulta['id'];
    $email              = $datosconsulta['email'];
    $usuario            = $datosconsulta['usuario'];

    $basesql = "Select * from " .$tabla;

    if($tipo == "consultatodo")
        $sql = $basesql . " where 1 order by email";
    else if($tipo == "consultaxemail")
        $sql = $basesql . " where email ='" . $email . "'";
    else if($tipo == "consultaxusuario")
        $sql = $basesql . " where usuario ='" . $usuario . "'";
    else if($tipo == "consultaxid")
        $sql = $basesql . " where idusuario =" . $id . "";
    
    
    $resultado  = $mysqli->query($sql);
    $data = array();
    if($resultado)
    {
        $resultado->data_seek(0);
        while($fila = $resultado->fetch_assoc()){
            array_push($data,  $fila );         }
    }else{
        array_push($data,"consultavacia"); 
    }
    
    echo  json_encode($data);
    
    $mysqli->close();
?>
