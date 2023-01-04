<?php
session_start();
include('./parametros.php');
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
		$archivo = 'afiliados.xls';

		// Crear la tabla HTML
		$html = '';
		$html .= '<table border="1">';
		$html .= '<tr>';
		$html .= '<td><b>ID afiliación</b></td>';
		$html .= '<td><b>Nº afiliado</b></td>';
		$html .= '<td><b>Usuario</b></td>';
		$html .= '<td><b>Nombres</b></td>';
		$html .= '<td><b>Apellidos</b></td>';
		$html .= '<td><b>Género</b></td>';
		$html .= '<td><b>Fecha nacimiento</b></td>';
		$html .= '<td><b>email</b></td>';
		$html .= '<td><b>Sangre</b></td>';
		$html .= '<td><b>Cód.Estado</b></td>';
		$html .= '<td><b>Estado</b></td>';
		$html .= '<td><b>Dirección</b></td>';
		$html .= '<td><b>Whatsapp</b></td>';
		$html .= '<td><b>Especialidad</b></td>';
		$html .= '<td><b>Talla</b></td>';
		$html .= '<td><b>Enfermedad</b></td>';
		$html .= '<td><b>Fecha de Inscripción</b></td>';
		$html .= '<td><b>Fecha de Pago</b></td>';
		$html .= '<td><b>Aprobado</b></td>';
		$html .= '</tr>';

		//-----------------conectando con la base de datos---------------------
		date_default_timezone_set('America/Monterrey');
		$mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
		
		if($mysqli->connect_error){exit('No se pudo conectar a la base de datos');}

		$tablaafi               = "apt_afiliaciones";
		$tablaest               = "apt_estados";
		$tablasan               = "apt_sangres";
		$tablaesp               = "apt_especialidades";
		$tablatal               = "apt_tallas";

		$sql = "Select " .$tablaafi. ".*," 
		.$tablaest. ".idestado," .$tablaest. ".nombreestado," 
		.$tablasan. ".idsangre," .$tablasan. ".nombresangre,"
		.$tablaesp. ".codigoespecialidad," .$tablaesp. ".nombreespecialidad,"
		.$tablatal. ".codigotalla," .$tablatal. ".nombretalla from (((( " .$tablaafi. " LEFT JOIN " .$tablaest. " ON " .$tablaafi. ".codigoestado = " .$tablaest. ".idestado ) LEFT JOIN " 
		.$tablasan. " ON " .$tablaafi. ".codigosangre       = " .$tablasan. ".idsangre ) LEFT JOIN " 
		.$tablaesp. " ON " .$tablaafi. ".codigoespecialidad = " .$tablaesp. ".codigoespecialidad ) LEFT JOIN "
		.$tablatal. " ON " .$tablaafi. ".codigotalla        = " .$tablatal. ".codigotalla )  where 1";


		$resultado = $mysqli->query($sql);

		while ($resu = mysqli_fetch_assoc($resultado)) {
			$html .= '<tr>';
			$html .= '<td>' . $resu["idafiliacion"] . '</td>';
			$html .= '<td>' . $resu["numeroafiliado"] . '</td>';
			$html .= '<td>' . $resu["usuario"] . '</td>';
			$html .= '<td>' . $resu["nombres"] . '</td>';
			$html .= '<td>' . $resu["apellidos"] . '</td>';
			$html .= '<td>' . $resu["genero"] . '</td>';
			$data = date('d/m/Y H:i:s', strtotime($resu["fechanacimiento"]));
			$html .= '<td>' . $data . '</td>';
			$html .= '<td>' . $resu["email"] . '</td>';
			$html .= '<td>' . $resu["nombresangre"] . '</td>';
			$html .= '<td>' . $resu["codigoestado"] . '</td>';
			$html .= '<td>' . $resu["nombreestado"] . '</td>';
			$html .= '<td>' . $resu["direccion"] . '</td>';
			$html .= '<td>' . $resu["whatsapp"] . '</td>';
			$html .= '<td>' . $resu["nombreespecialidad"] . '</td>';
			$html .= '<td>' . $resu["nombretalla"] . '</td>';
			$html .= '<td>' . $resu["enfermedadcronica"] . '</td>';
			$html .= '<td>' . $resu["fechainscripcion"] . '</td>';
			$fecpago = '';
			if($resu["fechapago"] != "0000-00-00"){
				$fecpago = $resu["fechapago"];
			}
			$html .= '<td>' . $fecpago . '</td>';

			$aprobacion = '';
			if($resu["aprobado"] == 1)
			{
				$aprobacion = "Aprobado";
			}else{
				$aprobacion = "Pendiente";
			}
			$html .= '<td>' . $aprobacion . '</td>';

			$html .= '</tr>';;
		}
		// Configuración en la cabecera
		header("Expires: Mon, 26 Jul 2227 05:00:00 GMT");
		header("Last-Modified: " . gmdate("D,d M YH:i:s") . " GMT");
		header("Cache-Control: no-cache, must-revalidate");
		header("Pragma: no-cache");
		header("Content-type: application/x-msexcel");
		header("Content-Disposition: attachment; filename=\"{$archivo}\"");
		header("Content-Description: PHP Generado Data");
		// Envia contenido al archivo
		echo $html;
		exit; ?>
	</body>

</html>