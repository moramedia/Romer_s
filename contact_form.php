<?php
/*
*
* edit these 3 lines
*
*/

$your_name			= "Romer's";
$your_email			= "moramedia@gmail.com";
$your_web_site_name		= "Confecciones Romer's";

?>

<?php 
//If the form is submitted
if(isset($_POST['name'])) {

		//Check to make sure that the name field is not empty
		if(trim($_POST['name']) === '') {
			$hasError = true;
		} else {
			$name = trim($_POST['name']);
		}
		
		//Check to make sure sure that a valid email address is submitted
		if(trim($_POST['email']) === '')  {
			$hasError = true;
		} else if (!preg_match('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$^', trim($_POST['email']))) {
			$hasError = true;
			$errorMessage = "Verifique que el correo este correctamente escrito.";
		} else {
			$email = trim($_POST['email']);
		}

		//phone
		if(isset($_POST['tel'])) $phone = trim($_POST['tel']);
		
		//Ciudad
		if(isset($_POST['ciudad'])) $ciudad = trim($_POST['ciudad']);

		//Tipo de tela
		if(isset($_POST['tipo-tela'])) $tipo_tela = trim($_POST['tipo-tela']);

		//Que productos fabrica
		if(isset($_POST['empresa'])) $empresa = trim($_POST['empresa']);

			
		//Check to make sure comments were entered	
		if(trim($_POST['message']) === '') {
			$hasError = true;
		} else {
			if(function_exists('stripslashes')) {
				$comments = stripslashes(trim($_POST['message']));
			} else {
				$comments = trim($_POST['message']);
			}
		}



		//If there is no error, send the email
		if(!isset($hasError)) {

			$emailTo = $your_email;
			$subject = 'Contacto recibido del sitio - '.$name;
			
			//message body 
			$body  ="Nombre: $name \n\n";
			$body .="Email: $email \n\n";
			if(isset($phone)) $body .="Telefono: $phone\n\n";
			if(isset($ciudad)) $body .="Ciudad: $ciudad\n\n";
			if(isset($tipo_tela)) $body .="Tipo de tela que busca: $tipo_tela\n\n";
			if(isset($empresa)) $body .="Tipo de productos que fabrica :$empresa\n\n";
			$body .="Message: $comments";


			$headers = 'From: '.$your_web_site_name.' <'.$emailTo.'>' . "\r\n" . 'Reply-To: ' . $email;
			
			mail($emailTo, $subject, $body, $headers);

			$emailSent = true;
	}
} 
?>

<?php if(isset($emailSent) == true) { ?>
	<div class="ok_box">
		<h3>Gracias, <?php echo $name;?></h3>
		<p>Su correo ha sido recibido. Nos pondremos en contacto a la brevedad.</p>
	</div>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
		 <script type="text/javascript">
  	$(document).ready(function() {
  		setTimeout(function() {
  		window.location.href = "index.html";
		}, 5000);
  	});
  </script>
<?php } ?>

<?php if(isset($hasError) ) { ?>
	<div style="text-align:center; font-size:1.5em; margin-top:50px;" class="error_box">
		Hubo un error en el envio. Por favor verifique su informacion.
		<br />
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
		 <script type="text/javascript">
  	$(document).ready(function() {
  		setTimeout(function() {
  		window.location.href = "contacto.html";
		}, 5000);
  	});
  </script>
		<?php echo $errorMessage;?>
	</div>
<?php } ?>
