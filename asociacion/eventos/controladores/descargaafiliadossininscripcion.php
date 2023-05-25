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
		$archivo = 'Afiliados sin inscripcion.xls';

		// Crear la tabla HTML
		$html .= "<h2>Afiliados con pago y sin inscribirse al evento</h2>";
		$html .= "<h3>Ordenado por Nombre de estado y Apellido</h3>";
		$html .= '<table border="1">';
		$html .= '<tr>';
		$html .= '<td><b>Nº afiliado</b></td>';
		$html .= '<td><b>Apellidos</b></td>';
		$html .= '<td><b>Nombres</b></td>';
		$html .= '<td><b>Whatsapp</b></td>';
		$html .= '<td><b>email</b></td>';
		$html .= '<td><b>Estado</b></td>';
		$html .= '<td><b>Fecha Pago como afiliado</b></td>';
		
		$html .= '</tr>';

		//-----------------conectando con la base de datos---------------------
		$mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
		
		if($mysqli->connect_error){exit('No se pudo conectar a la base de datos');}

		// ------------------ fin categorias -----------------

		$sql ="Select apt_afiliaciones.numeroafiliado,apt_afiliaciones.nombres, apt_afiliaciones.apellidos, apt_afiliaciones.whatsapp, apt_afiliaciones.email,apt_estados.nombreestado,apt_afiliaciones.fechapago FROM apt_afiliaciones 
        INNER JOIN apt_estados ON apt_afiliaciones.codigoestado = apt_estados.idestado 
		WHERE apt_afiliaciones.fechapago != '0000-00-00' and apt_afiliaciones.numeroafiliado NOT IN (SELECT numeroafiliado FROM apt_inscriptos) GROUP by apt_afiliaciones.numeroafiliado ORDER BY apt_estados.nombreestado asc, apt_afiliaciones.apellidos asc";

		$resultado = $mysqli->query($sql);
		
		while ($resu = mysqli_fetch_assoc($resultado)) {
			$html .= '<tr>';
			$html .= '<td>' . $resu["numeroafiliado"] . '</td>';
			$html .= '<td>' . $resu["apellidos"] . '</td>';
			$html .= '<td>' . $resu["nombres"] . '</td>';
			$html .= '<td>' . $resu["whatsapp"] . '</td>';
			$html .= '<td>' . $resu["email"] . '</td>';
			$html .= '<td>' . $resu["nombreestado"] . '</td>';
			$html .= '<td>' . $resu["fechapago"] . '</td>';
			
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