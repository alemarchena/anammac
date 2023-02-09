<?php

include('./parametros.php');

date_default_timezone_set('America/Monterrey');


//---------------------parametros recibidos en el POST----------------------
    $json = file_get_contents('php://input');
    $publicacion = json_decode($json, true);
    $codigoprueba           = $publicacion['codigoprueba'];
   
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    if($mysqli->connect_error) exit('No se pudo conectar a la base de datos');

    $data = array();

    $tablapru               = "apt_pruebas";
    $tabladet               = "apt_pruebasdetalle";

    $basesql = "Select " .$tablapru. ".*,"
    .$tabladet. ".* from (" 
    .$tablapru. " INNER JOIN " .$tabladet. " ON " .$tablapru. ".codigoprueba = " .$tabladet. ".codigoprueba )";

    if($codigoprueba==0)
    {
        $sql = $basesql . " order by $tablapru.ordenprueba asc, $tabladet.ordenpruebadetalle asc";
    }
    else{
        $sql = $basesql . " where $tabladet.codigoprueba = $codigoprueba order by $tablapru.ordenprueba asc, $tabladet.ordenpruebadetalle asc";
    }


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
