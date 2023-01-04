<?php
    include('./parametros.php');
    date_default_timezone_set('America/Monterrey');
    //-----------------conectando con la base de datos---------------------
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    
    if($mysqli->connect_error){exit('No se pudo conectar a la base de datos');}

    $tabla              = "apt_afiliaciones";
    $json = json_decode(file_get_contents('php://input'),true);

    $sql = "SELECT COUNT(idafiliacion) as cantidad FROM " .$tabla. " where numeroafiliado != ''";
    
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
        echo "consultavacia";
    }
    $mysqli->close();
?>