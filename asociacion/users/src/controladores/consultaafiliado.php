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

    $tipo           = $json['tipo'];
    $idafiliacion   = $json['idafiliacion'];
    $email          = $json['email'];
    $usuario        = $json['usuario'];

    $basesql = "Select * from " .$tabla;

    if($tipo == "consultatodo")
        $sql = $basesql . " where 1 order by apellidos";
    elseif($tipo == "consultaxusuario")
        $sql = $basesql . " where usuario   ='" . $usuario . "' order by apellidos";
    elseif($tipo == "consultaxemail")
        $sql = $basesql . " where email     ='" . $email . "' order by apellidos";
    else
        $sql = $basesql . " where idafiliacion  =" . $idafiliacion . " order by apellidos";
    
    $resultado = $mysqli->query($sql);
    $data = array();
    if($resultado)
    {
        $resultado->data_seek(0);
        while($fila = $resultado->fetch_assoc())
        {
            array_push($data,  $fila );
        }
        echo json_encode($data);
    }else
    {
        echo json_encode("consultavacia");
    }
    $mysqli->close();
?>