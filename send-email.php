<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
    
    $to = "jhonny.ravel@gmail.com";
    $headers = "From: $email";
    $body = "Name: $name\nEmail: $email\nSubject: $subject\nMessage: $message";
    
    if (mail($to, $subject, $body, $headers)) {
        echo "OK";
    } else {
        echo "Oops! Something went wrong.";
    }
}
?>
