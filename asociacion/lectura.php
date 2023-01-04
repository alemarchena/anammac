<?php
    $host="127.0.0.1";
    $port=3306;
    $socket="";
    $user="u275204779_violetadavid";
    $password="Contador777";
    $dbname="u275204779_aptvg";

    date_default_timezone_set('America/Monterrey');
    //-----------------conectando con la base de datos---------------------
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    
    if($mysqli->connect_error){exit('No se pudo conectar a la base de datos');}

    $tabla              = "apt_afiliaciones";
    $sql = "Select idafiliacion,codigoareacelular,numerocelularmexico from " .$tabla. " where 1";
    $sql = "update $tabla set (whatsapp = $tabla.codigoareacelular.$tablanumerocelularmexico) where 1"
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