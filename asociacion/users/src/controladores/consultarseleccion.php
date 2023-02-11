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
   
    $sql = "Select * from $tabla where numeroafiliado='$numeroafiliado' and idevento=$idevento";
    
    $data = array();
    $resultado = $mysqli->query($sql);

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