<?php

include('./parametros.php');

date_default_timezone_set('America/Monterrey');


//---------------------parametros recibidos en el POST----------------------
    $json = file_get_contents('php://input');
    $publicacion = json_decode($json, true);
    $idestado           = $publicacion['idestado'];
   
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    if($mysqli->connect_error) exit('No se pudo conectar a la base de datos');

    $data = array();

    $tablausu               = "apt_usuarios";
    $tablaest               = "apt_estados";

    $basesql = "Select " .$tablausu. ".*,"
    .$tablaest. ".nombreestado from (" 
    .$tablausu. " LEFT JOIN " .$tablaest. " ON " .$tablausu. ".idestado = " .$tablaest. ".idestado )";

    $sql = $basesql . " where $tablausu.idestado =  $idestado";


    $resultado = $mysqli->query($sql);

    if ($resultado->num_rows > 0) {
        while($publicaciones = $resultado->fetch_assoc())
        {
            array_push($data,$publicaciones);
        }
    } 
    
    //returns data as JSON format
    echo json_encode($data);
    $mysqli->close();
?>
