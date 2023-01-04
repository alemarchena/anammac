<?php
    include('./parametros.php');
    date_default_timezone_set('America/Monterrey');
    header('Content-Type: text/html; charset=UTF-8');

    //---------------------parametros recibidos en el POST----------------------
    
    $tabla              = "apt_afiliaciones";
    $datosconsulta      = json_decode(file_get_contents('php://input'),true);

    $idafiliacion           = $datosconsulta['idafiliacion'];
    $imagen                 = $datosconsulta['imagen'];
    $tipo                   = $datosconsulta['tipo'];
        
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
    if($tipo=='atleta')
        $sql = "update " .$tabla. " set fotoatleta='$imagen' where idafiliacion =$idafiliacion";
    else if($tipo=='pago')
        $sql = "update " .$tabla. " set fotopago='$imagen' where idafiliacion =$idafiliacion";
    else if($tipo=='documento')
        $sql = "update " .$tabla. " set fotodocumento='$imagen' where idafiliacion =$idafiliacion";

    $resultado  = $mysqli->query($sql);
    echo $resultado;

    $mysqli->close();
?>
