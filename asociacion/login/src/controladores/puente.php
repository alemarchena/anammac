<?php 
    header("Content-type: application/json; charset=utf-8");
    $datos = array();
    $datos = json_decode(file_get_contents("php://input"), true);

    session_start();
    $_SESSION['datospaquete'] = $datos['paquete'][0];
    
    var_dump($_SESSION['datospaquete']);
?>