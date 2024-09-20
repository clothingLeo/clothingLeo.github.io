<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';
// Add CORS headers to allow cross-origin requests
header('Access-Control-Allow-Origin: *'); // Replace * with specific domain if needed
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');


// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get the raw POST data and decode it
$data = json_decode(file_get_contents('php://input'), true);

// Provide default values if data is not set
$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$phone = $data['phone'] ?? '';
$cartDetails = $data['cartDetails'] ?? 'No details provided';
$totalPrice = $data['totalPrice'] ?? '0.00';

if (empty($name) || empty($email) || empty($phone) || empty($cartDetails) || empty($totalPrice)) {
    echo json_encode(['success' => false, 'message' => 'Incomplete data received']);
    exit();
}

// Create a new PHPMailer instance
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();                                // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';                 // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                         // Enable SMTP authentication
    $mail->Username = 'haouemjasser@gmail.com';  // SMTP username
    $mail->Password = 'lmwplnwadzdbxxsb';     // SMTP password (app password or your Gmail password)
    $mail->SMTPSecure = 'tls';                      // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                             // TCP port to connect to

    // Recipients
    $mail->setFrom($email, $name);
    $mail->addAddress('haouemjasser@gmail.com'); // Add a recipient

    // Content
    $mail->isHTML(false);                          // Set email format to plain text
    $mail->Subject = 'New Order from ' . $name;
    $mail->Body    = "Name: $name\nEmail: $email\nPhone: $phone\n\nCart Details:\n$cartDetails\n\nTotal Price: $totalPrice";

    $mail->send();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo]);
}
?>
