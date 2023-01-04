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
    $tablausu               = "apt_usuarios";

    $paqueteJson           = json_decode(file_get_contents('php://input'),true);

    $basesql = "Select " .$tablaafi. ".*,"
    .$tablaest. ".idestado," .$tablaest. ".nombreestado," 
    .$tablasan. ".idsangre," .$tablasan. ".nombresangre,"
    .$tablaesp. ".codigoespecialidad," .$tablaesp. ".nombreespecialidad,"
    .$tablausu. ".email as emaildelegado," .$tablausu. ".idestado,"
    .$tablatal. ".codigotalla," .$tablatal. ".nombretalla from ((((( " .$tablaafi. " LEFT JOIN " .$tablaest. " ON " .$tablaafi. ".codigoestado = " .$tablaest. ".idestado ) LEFT JOIN " 
    .$tablasan. " ON " .$tablaafi. ".codigosangre       = " .$tablasan. ".idsangre ) LEFT JOIN " 
    .$tablaesp. " ON " .$tablaafi. ".codigoespecialidad = " .$tablaesp. ".codigoespecialidad ) LEFT JOIN "
    .$tablausu. " ON " .$tablausu. ".idestado           = " .$tablaest. ".idestado ) LEFT JOIN "
    .$tablatal. " ON " .$tablaafi. ".codigotalla        = " .$tablatal. ".codigotalla )  ";


    $contador = 0;
    $criteriowhere = '(';
    $sql ='';
    
    foreach ($paqueteJson as $i => $datosconsulta) 
    {
        $palabra = $datosconsulta['palabra'];
        $donde = $datosconsulta['donde'];
        $email = $datosconsulta['email'];
        $usuario = $datosconsulta['usuario'];
        $idestado = $datosconsulta['idestado'];

        $contador = $contador + 1;

        if($palabra != "-x*#*x/") //busqueda por solo aprobados o solo desaprobados
        {

            if($donde == 1)
            {
                $criteriowhere = ' ( aprobado = 1 ) and (';
            }
            
            if($donde == 2)
            {
                $criteriowhere = ' ( aprobado = 0 ) and (';
            }
            
            
            if($contador==1)
            {
                $sql = $basesql . " where ( $criteriowhere $tablaafi.nombres like '%".$palabra."%' or $tablaafi.apellidos like '%".$palabra."%' or $tablaafi.usuario like '%$palabra%' or $tablaafi.whatsapp like '%$palabra%' or $tablaafi.email like '%$palabra%'  or $tablaafi.numeroafiliado like '%$palabra%') ";
            }else{
                $sql = $sql . " and ( $tablaafi.nombres like '%$palabra%' or $tablaafi.apellidos like '%".$palabra."%' or $tablaafi.usuario like '%".$palabra."%' or $tablaafi.whatsapp like '%$palabra%' or $tablaafi.email like '%$palabra%' or $tablaafi.numeroafiliado like '%$palabra%') ";
            }


        }else
        {

            if($donde == 1)
            {
                $criteriowhere = ' and aprobado = 1 ';
            }
            
            if($donde == 2)
            {
                $criteriowhere = ' and aprobado = 0 ';
            }
            
            if($donde == 3)
            {
                $criteriowhere = " and fechapago != '0000-00-00' ";
            }

           
        }
    }

    if( $sql ==''){
        $sql = " where " . $criteriowhere . " $tablausu.idestado = $idestado and ( ( $tablausu.email = '$email'  and $tablausu.email != '' )  or ( $tablausu.usuario = '$usuario' and $tablausu.usuario != '' ) )   ) GROUP by $tablaafi.apellidos order by $tablaafi.apellidos asc"; 
        $sql = $basesql . $sql;
    }else{
        $sql = $sql . " and $tablausu.idestado = $idestado and ( ( $tablausu.email = '$email'  and $tablausu.email != '' )  or ( $tablausu.usuario = '$usuario' and $tablausu.usuario != '' ) )   ) GROUP by $tablaafi.apellidos order by $tablaafi.apellidos asc"; 
    }


   
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

