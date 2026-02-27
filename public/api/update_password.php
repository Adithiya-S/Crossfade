<?php
// public/api/update_password.php

require_once 'db.php';
require_once 'auth.php';

// Ensure the user is authenticated 
$admin_id = checkAuth($pdo);

// Read input JSON
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($input['new_password']) || empty($input['new_password'])) {
        http_response_code(400);
        echo json_encode(['error' => 'New password is required.']);
        exit;
    }

    $newPassword = $input['new_password'];

    // Hash the new password securely
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    try {
        $stmt = $pdo->prepare("UPDATE admins SET password_hash = ? WHERE id = ?");
        $stmt->execute([$hashedPassword, $admin_id]);

        echo json_encode(['success' => true, 'message' => 'Password updated successfully.']);
    }
    catch (\PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error updating password: ' . $e->getMessage()]);
    }

}
else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Use POST.']);
}
?>
