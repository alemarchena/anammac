<?php
    include('./parametros.php');

    date_default_timezone_set('America/Monterrey');
    //-----------------conectando con la base de datos---------------------
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    
    if($mysqli->connect_error){exit('No se pudo conectar a la base de datos');}
    $fho = new DateTime();
    $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');
    
    $tablaafi               = "apt_afiliaciones";
    $tablaest               = "apt_estados";
    $tablasan               = "apt_sangres";
    $tablaesp               = "apt_especialidades";
    $tablatal               = "apt_tallas";

    $paqueteJson           = json_decode(file_get_contents('php://input'),true);

    $basesql = "Select " .$tablaafi. ".*,"
    .$tablaest. ".idestado," .$tablaest. ".nombreestado," 
    .$tablasan. ".idsangre," .$tablasan. ".nombresangre,"
    .$tablaesp. ".codigoespecialidad," .$tablaesp. ".nombreespecialidad,"
    .$tablaest. ".nombreestado,"
    .$tablatal. ".codigotalla," .$tablatal. ".nombretalla from (((( " .$tablaafi. " LEFT JOIN " .$tablaest. " ON " .$tablaafi. ".codigoestado = " .$tablaest. ".idestado ) LEFT JOIN " 
    .$tablasan. " ON " .$tablaafi. ".codigosangre       = " .$tablasan. ".idsangre ) LEFT JOIN " 
    .$tablaesp. " ON " .$tablaafi. ".codigoespecialidad = " .$tablaesp. ".codigoespecialidad ) LEFT JOIN "
    .$tablatal. " ON " .$tablaafi. ".codigotalla        = " .$tablatal. ".codigotalla )  ";


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
                    $criteriowhere = ' aprobado = 1 ';
                }
                
                if($donde == 2)
                {
                    $criteriowhere = ' aprobado = 0 ';
                }
                
                if($donde == 3)
                {
                    $criteriowhere = ' ( fechapago != "0000-00-00" and aprobado = 0 ) ';
                }
            }else
            {

                if($contador==1)
                {
                    $criteriowhere = " ( nombreestado like '%$palabra%' or nombres like '%$palabra%' or apellidos like '%".$palabra."%' or usuario like '%".$palabra."%' or whatsapp like '%$palabra%' or email like '%$palabra%' or numeroafiliado like '%$palabra%') ";

                    if($donde == 1)
                    {
                        $criteriowhere = $criteriowhere . ' and aprobado = 1 ';
                    }
                    
                    if($donde == 2)
                    {
                        $criteriowhere = $criteriowhere . ' and aprobado = 0 ';
                    }
                    
                    if($donde == 3)
                    {
                        $criteriowhere = $criteriowhere . ' and ( fechapago != "0000-00-00" and aprobado = 0 ) ';
                    }
                }else
                {
                    $criteriowhere = $criteriowhere . " and ( nombreestado like '%$palabra%' or nombres like '%$palabra%' or apellidos like '%".$palabra."%' or usuario like '%".$palabra."%' or whatsapp like '%$palabra%' or email like '%$palabra%' or numeroafiliado like '%$palabra%') ";
                }
            }
        }
    }
   
    $sql = $basesql . " where " . $criteriowhere . " GROUP by apellidos order by apellidos asc; ";

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

