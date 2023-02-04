<?php

    $json = json_decode(file_get_contents('php://input'),true);
    $fecha =$json['fechaestimada'];
    // var_dump("Fecha:".$fecha."-");


    // $tiempo = strtotime($fecha);
    // $fechaestimada = date('Y-m-d',$tiempo);

    $fechaestimada = date('Y-m-d', time());


    var_dump($fechaestimada);
?>