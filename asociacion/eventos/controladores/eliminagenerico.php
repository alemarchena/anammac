<?php
    include('./parametros.php');
    date_default_timezone_set('America/Monterrey');
    header('Content-Type: text/html; charset=UTF-8');

    //---------------------parametros recibidos en el POST----------------------
    
    $datosconsulta      = json_decode(file_get_contents('php://input'),true);
    
    $tabla      = $datosconsulta['tabla'];
    $campo      = $datosconsulta['campo'];
    $valor      = $datosconsulta['valor'];
    $tipodato   = $datosconsulta['tipodato'];

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
    
    $basesql = "delete from " .$tabla;
    if($tipodato=='texto')
        $sql = $basesql . " where $campo='$valor'";
    else
        $sql = $basesql . " where $campo=$valor";

    $resultado  = $mysqli->query($sql);
    echo $resultado;

    $mysqli->close();
?>