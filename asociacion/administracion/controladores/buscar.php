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
    $criteriowhere = '(';

    if(count($paqueteJson) ==0)
    {
        $sql = $basesql . " where 1 ";
    }else{
        foreach ($paqueteJson as $i => $datosconsulta) 
        {
            $palabra = $datosconsulta['palabra'];
            $donde = $datosconsulta['donde'];

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
                
                if($donde == 3)
                {
                    $criteriowhere = " ( fechapago != '0000-00-00' ) and (";
                }

                if($contador==1)
                {
                    $sql = $basesql . " where ( nombreestado like '%$palabra%' or $criteriowhere nombres like '%".$palabra."%' or apellidos like '%".$palabra."%' or usuario like '%$palabra%' or whatsapp like '%$palabra%' or email like '%$palabra%'  or numeroafiliado like '%$palabra%') ";
                }else{
                    $sql = $sql . " and ( nombreestado like '%$palabra%' or nombres like '%$palabra%' or apellidos like '%".$palabra."%' or usuario like '%".$palabra."%' or whatsapp like '%$palabra%' or email like '%$palabra%' or numeroafiliado like '%$palabra%') ";
                }

                $sql = $sql . " ) GROUP by apellidos order by apellidos asc; ";

            }else
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
                    $criteriowhere = " fechapago != '0000-00-00' ";
                }

                $sql = $basesql . " where " .$criteriowhere;
            }
        }
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

