<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

<title>Formulario</title>

</head>

<body>
<?php

    $email = $_POST['email'];
    $password = $_POST['password'];
    $name = $_POST['name'];

    require '../vendors/phpmailer/class.phpmailer.php';
    require '../vendors/phpmailer/class.smtp.php'; //incluimos la clase para envíos por SMTP
    $mail = new PHPMailer();

    $mail->From     = $email;
    $mail->FromName = 'Contacto Fun Training';
    $mail->AddAddress($email); // Dirección a la que llegaran los mensajes.
    $mail->AddAddress($"funtraininggym@gmail.com"); // Dirección a la que llegaran los mensajes.
   
// Aquí van los datos que apareceran en el correo que reciba
            
    $mail->WordWrap = 50; 
    $mail->IsHTML(true);     
    $mail->Subject  =  "Fun Training";
    $mail->Body     = "<!DOCTYPE html><html lang='es'><head> <meta charset='UTF-8'> <meta http-equiv='X-UA-Compatible' content='IE=edge'> <meta name='viewport' content='width=device-width, initial-scale=1.0'> <title>Document</title> <link rel='preconnect' href='https://fonts.gstatic.com'> <link href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,400&display=swap' rel='stylesheet'> <style>body{font-family: 'Montserrat-Medium'; font-family: 'Montserrat', sans-serif;color: #232323 !important;}p{color: #232323}h2{text-align: center; color: #FF6D00;}p{margin-bottom: 0px;}a{text-decoration: none; color: #FF6D00 !important;}a:visited{color: #0BC9FF;}a:hover{color: #0BC9FF !important;}i{color: #232323;}cite{color:#232323 !important;display: flex; justify-content: center; text-align: center; font-family: 'Montserrat-Bold'; font-weight: 800; font-size: 24px; margin: 20px 0px;}a, a:hover, a:visited{transition: ease-in-out all 0.3s;}</style></head><body> <h2>Bienvenido a la familia FUN TRAINING </h2> <p> $name Te invitamos a que des lo mejor de ti para alcanzar las metas que te propongas, nuestros entrenadores te apoyaran en el proceso y serán tus coequiperos en el camino que solo los grandes recorren. </p><p> En el siguiente link podrás acceder al sistema de agendamiento: <a href='https://clientes.funtraining.net' target='_blank'>Da click Aquí</a> </p><p><strong>Usuario: $email</strong> <br><strong>Contraseña: $password</strong> </p><cite> “Acepta los retos para así poder sentir la euforia de la victoria” George S. Patton </cite> <p style='display: flex;'> <img style=' width: 300px; margin: 0 auto;' src='https://funtraining.net/src/img/W3.jpg' alt='imagen' id='img-mail'> </p><i>Cordialmente: </i> <h4>John Fredy González </h4> <p><i>Fundador de la familia FUN TRAINING. </i> <br><i>Centro de Entrenamiento Funcional</i></p><p><strong>Carrera 10 # 1 – 35</strong> <br>Centro Comercial Portal Salinas Local 212 <br><a href='tel:+573204562224'>Cel 3204562224</a> – <a href='https://api.whatsapp.com/send?phone=573235220130&text=%C2%A1Hola!,%20quiero%20ser%20parte%20de%20la%20familia%20FUN%20TRAINING%20%F0%9F%91%8A%20%C2%BFMe%20puedes%20dar%20m%C3%A1s%20informaci%C3%B3n?'>WhatsApp 3235220130</a> <br><a href='mailto:funtraininggym@gmail.com'>funtraininggym@gmail.com</a> </p></body></html>";  
    

// Datos del servidor SMTP

    $mail->IsSMTP();
    $mail->CharSet = 'UTF-8';
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = "ssl";
    $mail->Host = "smtp.gmail.com"; //servidor smtp, esto lo puedes dejar igual
    $mail->Port = 465; //puerto smtp de gmail, tambien lo puedes dejar igual
    $mail->Username = 'contactofuntraining@gmail.com';  // Tu correo gmail
    $mail->Password = 'Funtraining2021.'; // Tu contrasena gmail
    $mail->FromName = 'Contacto funtraining'; // 
    $mail->From = 'contactofuntraining@gmail.com'; //email de remitente desde donde se envía el correo, este caso para evitar spam es el mismo que tu correo gmail
    
    $mail->Send();

    header("Location: https://admins.funtraining.net/agenda");


?>
</body>
</html>