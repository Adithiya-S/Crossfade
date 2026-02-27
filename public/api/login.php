<?php
// login.php
require 'db.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $data->username ?? '';
    $password = $data->password ?? '';

    if (empty($username) || empty($password)) {
        http_response_code(400);
        echo json_encode(["error" => "Username and password required"]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM admins WHERE username = ?");
    $stmt->execute([$username]);
    $admin = $stmt->fetch();

    if ($admin && password_verify($password, $admin['password_hash'])) {
        // Generate a random token
        $token = bin2hex(random_bytes(32));

        // Save token to DB
        $update = $pdo->prepare("UPDATE admins SET token = ? WHERE id = ?");
        $update->execute([$token, $admin['id']]);

        echo json_encode(["success" => true, "token" => $token]);
    }
    else {
        http_response_code(401);
        echo json_encode(["error" => "Invalid credentials"]);
    }
}
else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>
