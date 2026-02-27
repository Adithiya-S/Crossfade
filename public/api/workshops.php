<?php
// workshops.php
require 'db.php';
require 'auth.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $id = $_GET['id'] ?? null;
    if ($id) {
        $stmt = $pdo->prepare("SELECT * FROM workshops WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode($stmt->fetch() ?: []);
    }
    else {
        $stmt = $pdo->query("SELECT * FROM workshops ORDER BY created_at DESC");
        echo json_encode($stmt->fetchAll());
    }
}
elseif ($method === 'POST') {
    checkAuth($pdo);
    $data = json_decode(file_get_contents("php://input"));
    $features = isset($data->features) ? json_encode($data->features) : '[]';

    $stmt = $pdo->prepare("INSERT INTO workshops (title, category, description, duration, group_size, price, image_url, features_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$data->title, $data->category, $data->description, $data->duration, $data->group_size, $data->price, $data->image_url, $features]);
    echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
}
elseif ($method === 'PUT') {
    checkAuth($pdo);
    $data = json_decode(file_get_contents("php://input"));
    $id = $_GET['id'] ?? null;
    if ($id) {
        $features = isset($data->features) ? json_encode($data->features) : '[]';
        $stmt = $pdo->prepare("UPDATE workshops SET title=?, category=?, description=?, duration=?, group_size=?, price=?, image_url=?, features_json=? WHERE id=?");
        $stmt->execute([$data->title, $data->category, $data->description, $data->duration, $data->group_size, $data->price, $data->image_url, $features, $id]);
        echo json_encode(["success" => true]);
    }
}
elseif ($method === 'DELETE') {
    checkAuth($pdo);
    $id = $_GET['id'] ?? null;
    if ($id) {
        $stmt = $pdo->prepare("DELETE FROM workshops WHERE id=?");
        $stmt->execute([$id]);
        echo json_encode(["success" => true]);
    }
}
?>
