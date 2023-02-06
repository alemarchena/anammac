<?php

include('./parametros.php');

date_default_timezone_set('America/Monterrey');


//---------------------parametros recibidos en el POST----------------------
    $json = file_get_contents('php://input');
    $publicacion = json_decode($json, true);
    $codigoevento           = $publicacion['codigoevento'];
   
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    if($mysqli->connect_error) exit('No se pudo conectar a la base de datos');

    $data = array();

    $tablaeve               = "apt_eventos";
    $tablaevepru            = "apt_eventoprueba";
    $tablapru               = "apt_pruebas";
    $tabladet               = "apt_pruebasdetalle";

    $basesql = "Select " .$tablaeve. ".*," .$tablaevepru. ".*," .$tablapru. ".*," .$tabladet. ".* from (((" 
    .$tablaevepru. "    INNER JOIN " .$tablapru. " ON " .$tablaevepru. ".codigoprueba = " .$tablapru. ".codigoprueba )
                        INNER JOIN " .$tabladet. " ON " .$tablaevepru. ".codigodetalle = " .$tabladet. ".codigodetalle )
                        INNER JOIN " .$tablaeve. " ON " .$tablaevepru. ".codigoevento = " .$tablaeve. ".idevento )";

    if($codigoevento==0)
    {
        $sql = $basesql . " order by $tablapru.nombreprueba asc, $tabladet.nombredetalle asc";
    }
    else{
        $sql = $basesql . " where $tablaevepru.codigoevento = $codigoevento order by $tablapru.nombreprueba asc, $tabladet.nombredetalle asc";
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
