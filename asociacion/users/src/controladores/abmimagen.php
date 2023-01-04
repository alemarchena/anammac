<?php
    include('./parametros.php');
    date_default_timezone_set('America/Monterrey');
    header('Content-Type: text/html; charset=UTF-8');

    //---------------------parametros recibidos en el POST----------------------
    
    $tabla              = "apt_imagenes";
    $datosconsulta      = json_decode(file_get_contents('php://input'),true);
    
    $tipo               = $datosconsulta['tipo'];
    $idafiliacion       = $datosconsulta['idafiliacion'];
    $imagen             = $datosconsulta['imagen'];
    
        
    $fho = new DateTime();
    $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');
    //-----------------conectando con la base de datos---------------------
    
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    if($mysqli->connect_error)
    {
        var_dump($host.",".$user.",".$password.",".$dbname.",".$port.",".$socket);
        var_dump($mysqli->connect_error);
        exit('No se pudo conectar a la base de datos del sistema');
    }
    
    mysqli_set_charset($mysqli,"utf8");
    //--------------------------- Acciones -------------------------
    
    if($tipo == "guardar"){
        $basesql = "insert into " .$tabla;
        $sql = $basesql . " (idafiliacion,imagen) values($idafiliacion,'$imagen')";
    }else if($tipo == "eliminar"){
        $basesql = "delete from " .$tabla;
        $sql = $basesql . " where idafiliacion =" . $idafiliacion . " and imagen = '" . $imagen. "'";
    }
    $resultado  = $mysqli->query($sql);
    echo $resultado;

    $mysqli->close();
?>
