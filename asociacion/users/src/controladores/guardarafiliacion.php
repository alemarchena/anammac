<?php
    include('./parametros.php');
    date_default_timezone_set('America/Monterrey');
    //-----------------conectando con la base de datos---------------------
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    
    if($mysqli->connect_error){exit('No se pudo conectar a la base de datos');}
    $fho = new DateTime();
    $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');

    $tabla              = "apt_afiliaciones";
    $json = json_decode(file_get_contents('php://input'),true);

    $numeroafiliado =  $json['numeroafiliado'];
    $usuario =  $json['usuario'];
    $nombres            =  $json['nombres'];
    $apellidos          =  $json['apellidos'];
    $genero =  $json['genero'];
    $fechanacimiento =  $json['fechanacimiento'];
    $email =  $json['email'];
    $codigoestado =  $json['codigoestado'];
    $direccion =  $json['direccion'];
    $whatsapp =  $json['whatsapp'];
    $codigosangre =  $json['codigosangre'];
    $codigoespecialidad =  $json['codigoespecialidad'];
    $enfermedadcronica =  $json['enfermedadcronica'];
    $codigotalla =  $json['codigotalla'];
    $fotoatleta =  $json['fotoatleta'];
    $fotodocumento =  $json['fotodocumento'];
    $fotopago =  $json['fotopago'];
    $aprobado =  $json['aprobado'];
    $desactivado =  $json['desactivado'];
    
   
    $sql = "INSERT INTO " .$tabla. "(numeroafiliado,usuario,nombres,apellidos,genero,fechanacimiento, email, codigoestado,direccion,whatsapp,
    codigosangre,codigoespecialidad,enfermedadcronica,codigotalla,fechainscripcion,fotoatleta,fotodocumento,fotopago,aprobado,desactivado)
    values('$numeroafiliado','$usuario','$nombres','$apellidos','$genero','$fechanacimiento','$email','$codigoestado','$direccion','$whatsapp',
    '$codigosangre','$codigoespecialidad','$enfermedadcronica','$codigotalla','$fechahoraoperativa','$fotoatleta','$fotodocumento','$fotopago',$aprobado,$desactivado)";


    $resultado = $mysqli->query($sql);

    if($resultado)
    {
        echo $resultado;
    }else{
        echo "consultavacia ".$sql;
    }
    
    $mysqli->close();
?>