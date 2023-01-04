<?php

    header('Content-type:application/json;charset=utf-8');

    $json = json_decode(file_get_contents('php://input'),true);

    $archivo = $json['archivo'];
    $buscar = "../imgafiliados/$archivo";

    if(file_exists($buscar)){
        echo  json_encode("existe");
        die();
    }else{
        echo  json_encode($buscar);
    }


?>