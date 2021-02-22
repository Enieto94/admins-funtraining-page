<?php 
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

$solicitud = $_POST['solicitud'];

if (isset($solicitud)) {

    switch ($solicitud) {
        case 'enviarMsj':
            enviarMsj();
            break;

        default:
            print_r(json_encode(array('respuesta' => "error", 'mensaje' => "Lo sentimos, no tienes acceso a este apartado")));
            break;
    }
} else {
    print_r(json_encode(array('respuesta' => "error", 'mensaje' => "Lo sentimos, no tienes acceso a este apartado")));
}

function enviarMsj()
{
    require_once '../vendor/autoload.php';

    try {
        $mail_HTML = "<!DOCTYPE html><html lang='es'><head> <meta charset='UTF-8'> <meta http-equiv='X-UA-Compatible' content='IE=edge'> <meta name='viewport' content='width=device-width, initial-scale=1.0'> <title>Document</title> <link rel='preconnect' href='https://fonts.gstatic.com'> <link href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,400&display=swap' rel='stylesheet'> <style>body{font-family: 'Montserrat-Medium'; font-family: 'Montserrat', sans-serif;color: #232323 !important;}p{color: #232323}h2{text-align: center; color: #FF6D00;}p{margin-bottom: 0px;}a{text-decoration: none; color: #FF6D00 !important;}a:visited{color: #0BC9FF;}a:hover{color: #0BC9FF !important;}i{color: #232323;}cite{color:#232323 !important;display: flex; justify-content: center; text-align: center; font-family: 'Montserrat-Bold'; font-weight: 800; font-size: 24px; margin: 20px 0px;}a, a:hover, a:visited{transition: ease-in-out all 0.3s;}</style></head><body> <h2>Bienvenido a la familia FUN TRAINING </h2> <p>".$_POST['name']."Te invitamos a que des lo mejor de ti para alcanzar las metas que te propongas, nuestros entrenadores te apoyaran en el proceso y serán tus coequiperos en el camino que solo los grandes recorren. </p><p> En el siguiente link podrás acceder al sistema de agendamiento: <a href='https://clientes.funtraining.net' target='_blank'>Da click Aquí</a> </p><p><strong>Usuario:".$_POST['email']."</strong> <br><strong>Contraseña: ".$_POST['password']."</strong> </p><cite> “Acepta los retos para así poder sentir la euforia de la victoria” George S. Patton </cite> <p style='display: flex;'> <img style=' width: 300px; margin: 0 auto;' src='https://funtraining.net/src/img/W3.jpg' alt='imagen' id='img-mail'> </p><i>Cordialmente: </i> <h4>John Fredy González </h4> <p><i>Fundador de la familia FUN TRAINING. </i> <br><i>Centro de Entrenamiento Funcional</i></p><p><strong>Carrera 10 # 1 – 35</strong> <br>Centro Comercial Portal Salinas Local 212 <br><a href='tel:+573204562224'>Cel 3204562224</a> – <a href='https://api.whatsapp.com/send?phone=573235220130&text=%C2%A1Hola!,%20quiero%20ser%20parte%20de%20la%20familia%20FUN%20TRAINING%20%F0%9F%91%8A%20%C2%BFMe%20puedes%20dar%20m%C3%A1s%20informaci%C3%B3n?'>WhatsApp 3235220130</a> <br><a href='mailto:funtraininggym@gmail.com'>funtraininggym@gmail.com</a> </p></body></html>";

        $mail = new PHPMailer;
        $mail->Host = "localhost";
        $mail->From = "funtraininggym@gmail.com";
        $mail->FromName = "Fun Training";
        $mail->addAddress($_POST['email']);

        $mail->CharSet = 'UTF-8';
        $mail->Subject = ("Inscrito a la plataforma Fun Training");
        $mail->MsgHTML($mail_HTML);

        if ($mail->Send()) {
            $jsonResponse = array(
                'respuesta' => "ok",
                'mensaje' => '¡Mensaje enviado!',
            );
        } else {
            $jsonResponse = array(
                'respuesta' => "error",
                'mensaje' => 'no se envió el email',
            );
        }
        
        print_r(json_encode($jsonResponse));
    } catch (Exception $e) {
        print_r(json_encode(array('respuesta' => "error", 'mensaje' => "Surgió un error al enviar el correo. ")));
    }
}