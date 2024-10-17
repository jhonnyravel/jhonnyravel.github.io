<?php
// Mostrar erros para depuração
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Definir variáveis
$to = 'jhonny.ravel@gmail.com';
$subject = 'Teste de Envio de Email';
$message = 'Este é um teste para verificar a configuração do servidor de email.';
$headers = 'From: test@example.com';

// Enviar email
if (mail($to, $subject, $message, $headers)) {
    echo 'Email enviado com sucesso';
} else {
    echo 'Falha ao enviar email';
}
?>
