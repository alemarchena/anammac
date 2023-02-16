<?php
    include('./parametros.php');

    date_default_timezone_set('America/Monterrey');
    //-----------------conectando con la base de datos---------------------
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    
    if($mysqli->connect_error){exit('No se pudo conectar a la base de datos');}
    $fho = new DateTime();
    $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');
    
    $tablapin               = "apt_pagosinscripciones";
    $tablaafi               = "apt_afiliaciones";
    

    $paqueteJson           = json_decode(file_get_contents('php://input'),true);

   

    $basesql = "Select $tablaafi.numeroafiliado,$tablaafi.nombres,$tablaafi.apellidos,$tablaafi.fotoatleta,
        $tablaafi.idafiliacion,$tablaafi.whatsapp,$tablaafi.email,$tablaafi.usuario,$tablapin.aprobado as aprobacionevento,
        $tablapin.fechapago as fechapagoevento,$tablapin.fotopagoevento,$tablapin.idevento,$tablapin.idinscripcion,
        $tablapin.montopagado,$tablapin.montopagadodolar from ( 
        $tablapin INNER JOIN $tablaafi ON $tablapin.numeroafiliado =  $tablaafi.numeroafiliado )";


    $contador = 0;
    $criteriowhere = '';

    if(count($paqueteJson) ==0)
    {
        $sql = $basesql . " where 1 ";
    }else{
        foreach ($paqueteJson as $i => $datosconsulta) 
        {
            $palabra = $datosconsulta['palabra'];
            $donde = $datosconsulta['donde'];

            $contador = $contador + 1;

            if($palabra == "-x*#*x/") //No trae ninguna palabra y busca por aprobados o desaprobados o recientes
            {
                if($donde == 1)
                {
                    $criteriowhere = ' ' .$tablapin.'.aprobado = 1 ';
                }
                
                if($donde == 2)
                {
                    $criteriowhere = ' ' .$tablapin.'.aprobado = 0 ';
                }
                
               
            }else
            {

                if($contador==1)
                {
                    $criteriowhere = " ( nombres like '%$palabra%' or apellidos like '%".$palabra."%' or usuario like '%".$palabra."%' or whatsapp like '%$palabra%' or email like '%$palabra%' or $tablapin.numeroafiliado like '%$palabra%') ";

                    if($donde == 1)
                    {
                        $criteriowhere = $criteriowhere . ' and ' .$tablapin.'.aprobado = 1 ';
                    }
                    
                    if($donde == 2)
                    {
                        $criteriowhere = $criteriowhere . ' and ' .$tablapin.'.aprobado = 0 ';
                    }
                    
                    
                }else
                {
                    $criteriowhere = $criteriowhere . " and ( nombres like '%$palabra%' or apellidos like '%".$palabra."%' or usuario like '%".$palabra."%' or whatsapp like '%$palabra%' or email like '%$palabra%' or $tablapin.numeroafiliado like '%$palabra%') ";
                }
            }
        }
    }
   
    $sql = $basesql . " where " . $criteriowhere . " order by apellidos asc; ";

    // var_dump($sql);

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

