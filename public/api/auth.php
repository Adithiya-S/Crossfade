 <?php
// auth.php - Helper to verify tokens for protected routes
require_once 'db.php';

function checkAuth($pdo)
{
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? '';
    if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        $token = $matches[1];
        $stmt = $pdo->prepare("SELECT id FROM admins WHERE token = ?");
        $stmt->execute([$token]);
        $adminId = $stmt->fetchColumn();
        if ($adminId) {
            return $adminId; // Return ID instead of true
        }
    }
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized access"]);
    exit;
}
?>
