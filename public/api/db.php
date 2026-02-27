<?php
// db.php
// Setup CORS for local React development (adjust origin for production if needed)
header("Access-Control-Allow-Origin: http://localhost:5173");

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = 'localhost'; // Hostinger usually uses localhost
$db = 'u411804375_crossfade'; // Replace with actual DB name
$user = 'u411804375_crossfade'; // Replace with Hostinger DB user
$pass = 'tM6l6Vl#'; // Replace with Hostinger DB password
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
}
catch (\PDOException $e) {
    // In production, do not echo the exact error to prevent leaking connection details!
    die(json_encode(["error" => "Database connection failed. Please configure db.php with correct Hostinger database details."]));
}
?>
