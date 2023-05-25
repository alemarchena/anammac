<?php
session_start();
header('Content-Type: text/html; charset=UTF-8');
date_default_timezone_set('America/Monterrey');

include('./parametros.php');
// include("./setfechaconsulta.php");

$fechaestimada = date('Y-m-d', time());

?>
<!DOCTYPE html>
<html lang="es-es">

<head>
	<meta charset="utf-8">
	<title>Afiliados</title>

	<head>

	<body>
		<?php
		// Definimos el archivo exportado
		$archivo = 'Inscritos.xls';

		// Crear la tabla HTML
		$html .= "<h2>Inscritos ANAMM.A.C</h2>";
		$html .= "<h3>Ordenado por Nombre de estado y Apellido</h3>";
		
		$html .= '<table border="1">';
		$html .= '<tr>';
		$html .= '<td><b>Nº afiliado</b></td>';
		$html .= '<td><b>Apellidos</b></td>';
		$html .= '<td><b>Nombres</b></td>';
		$html .= '<td><b>Género</b></td>';
		$html .= '<td><b>Fecha nacimiento</b></td>';
		$html .= '<td><b>Sangre</b></td>';
		$html .= '<td><b>Estado</b></td>';
		$html .= '<td><b>Especialidad</b></td>';
		$html .= '<td><b>Talla</b></td>';
		$html .= '<td><b>Enfermedad</b></td>';

		$html .= '<td><b>Evento</b></td>';
		$html .= '<td><b>Prueba</b></td>';
		$html .= '<td><b>Detalle</b></td>';
		$html .= '<td><b>Fecha pago al evento</b></td>';

		$html .= '<td><b>Edad</b></td>';
		$html .= '<td><b>Categoría</b></td>';
		$html .= '</tr>';


		//-----------------conectando con la base de datos---------------------
		$mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
		
		if($mysqli->connect_error){exit('No se pudo conectar a la base de datos');}

		$tablaafi               = "apt_afiliaciones";
		$tablaest               = "apt_estados";
		$tablasan               = "apt_sangres";
		$tablaesp               = "apt_especialidades";
		$tablatal               = "apt_tallas";

		$tablains               = "apt_inscriptos";
		$tablapru               = "apt_pruebas";
		$tabladet               = "apt_pruebasdetalle";
		$tablaeve               = "apt_eventos";
		$tablapai               = "apt_pagosinscripciones";

		// ------------- categorias --------------------
		$tablacat               = "apt_categorias";
		$sqlcategorias = "Select * from $tablacat where 1";
		$resultadocategorias = $mysqli->query($sqlcategorias);
		$datacategorias = array();

		while ($resucat = mysqli_fetch_assoc($resultadocategorias))
		{
			array_push($datacategorias,  $resucat );
		}
		// ------------------ fin categorias -----------------


		$sql = "Select " .$tablaafi. ".*," 
		.$tablaest. ".idestado," .$tablaest. ".nombreestado," 
		.$tablasan. ".idsangre," .$tablasan. ".nombresangre,"
		.$tablaesp. ".codigoespecialidad," 	.$tablaesp. ".nombreespecialidad,"
		.$tablapru. ".codigoprueba," 	.$tablapru. ".nombreprueba,"
		.$tabladet. ".codigodetalle," 	.$tabladet. ".nombredetalle,"
		.$tablaeve. ".idevento," 		.$tablaeve. ".nombre,"
		.$tablatal. ".codigotalla," 		.$tablatal. ".nombretalla from " 		.$tablaafi. " 
		LEFT JOIN " .$tablapai. " ON " 		.$tablaafi. ".numeroafiliado = " 		.$tablapai. ".numeroafiliado
		LEFT JOIN " .$tablains. " ON " 		.$tablaafi. ".numeroafiliado = " 		.$tablains. ".numeroafiliado
		LEFT JOIN " .$tablapru. " ON " 		.$tablapru. ".codigoprueba = " 			.$tablains. ".codigoprueba
		LEFT JOIN " .$tabladet. " ON " 		.$tabladet. ".codigodetalle = " 		.$tablains. ".codigodetalle
		LEFT JOIN " .$tablaeve. " ON " 		.$tablaeve. ".idevento = " 				.$tablains. ".idevento
		LEFT JOIN " .$tablaest. " ON " 		.$tablaafi. ".codigoestado = " 			.$tablaest. ".idestado  
		LEFT JOIN " .$tablasan. " ON " 		.$tablaafi. ".codigosangre = " 			.$tablasan. ".idsangre  
		LEFT JOIN " .$tablaesp. " ON " 		.$tablaafi. ".codigoespecialidad = " 	.$tablaesp. ".codigoespecialidad 
		LEFT JOIN " .$tablatal. " ON " 		.$tablaafi. ".codigotalla        = " 	.$tablatal. ".codigotalla where ".$tablaafi.".numeroafiliado = ". $tablapai. ".numeroafiliado ORDER BY apt_estados.nombreestado asc, apt_afiliaciones.apellidos asc";

		$resultado = $mysqli->query($sql);
		
		while ($resu = mysqli_fetch_assoc($resultado)) {
			$html .= '<tr>';
			$html .= '<td>' . $resu["numeroafiliado"] . '</td>';
			$html .= '<td>' . $resu["apellidos"] . '</td>';
			$html .= '<td>' . $resu["nombres"] . '</td>';
			$html .= '<td>' . $resu["genero"] . '</td>';
			
			$data = date('d/m/Y H:i:s', strtotime($resu["fechanacimiento"]));
			

			$html .= '<td>' . $data . '</td>';
			$html .= '<td>' . $resu["nombresangre"] . '</td>';
			$html .= '<td>' . $resu["nombreestado"] . '</td>';
			$html .= '<td>' . $resu["nombreespecialidad"] . '</td>';
			$html .= '<td>' . $resu["nombretalla"] . '</td>';
			$html .= '<td>' . $resu["enfermedadcronica"] . '</td>';
			$html .= '<td>' . $resu["nombre"] . '</td>';
			$html .= '<td>' . $resu["nombreprueba"] . '</td>';
			$html .= '<td>' . $resu["nombredetalle"] . '</td>';
			$fecpago = '';
			if($resu["fechapago"] != "0000-00-00"){
				$fecpago = $resu["fechapago"];
			}else{
				$fechapago = "";
			}
			$html .= '<td>' . $fecpago . '</td>';

			$aprobacion = '';
			if($resu["aprobado"] == 1)
			{
				$aprobacion = "Aprobado";
			}else{
				$aprobacion = "Pendiente";
			}
			// $html .= '<td>' . $aprobacion . '</td>';

			
			$datanacimiento = date('Y/m/d', strtotime($resu["fechanacimiento"]));
			$diferencia = abs((strtotime($fechaestimada) - strtotime($datanacimiento))/86400);
			$anios = $diferencia / 365;
			$anios = intval($anios);
			
			$html .= '<td>' . $anios . '</td>';

			for($a=0;$a< count($datacategorias);$a++)
			{
				if($anios >= $datacategorias[$a]['edad1'] and $anios <= $datacategorias[$a]['edad2'])
				{
					$html .= '<td>' .  $datacategorias[$a]['nombrecategoria'] . '</td>';
				}
			}
			$html .= '<td>' . $fechaestimada . '</td>';

			$html .= '</tr>';
		}

		// Configuración en la cabecera
		header("Pragma: public");
		header("Expires: 0");
		header("Last-Modified: " . gmdate("D,d M YH:i:s") . " GMT");
		header("Cache-Control: no-cache, must-revalidate,post-check=0, pre-check=0");
		header("Pragma: no-cache");
		header("Content-type: application/x-msexcel");
		header("Content-Disposition: attachment; filename=\"{$archivo}\"");
		header("Content-Description: PHP Generado Data");
		// Envia contenido al archivo
		echo $html;
		exit; ?>
	</body>

</html>