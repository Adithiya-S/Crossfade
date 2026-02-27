<?php
// blogs.php
require 'db.php';
require 'auth.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $id = $_GET['id'] ?? null;
    if ($id) {
        $stmt = $pdo->prepare("SELECT * FROM blogs WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode($stmt->fetch() ?: []);
    }
    else {
        $stmt = $pdo->query("SELECT * FROM blogs ORDER BY created_at DESC");
        echo json_encode($stmt->fetchAll());
    }
}
elseif ($method === 'POST') {
    checkAuth($pdo);
    $data = json_decode(file_get_contents("php://input"));
    $stmt = $pdo->prepare("INSERT INTO blogs (title, excerpt, content, image_url) VALUES (?, ?, ?, ?)");
    $stmt->execute([$data->title, $data->excerpt, $data->content, $data->image_url]);
    echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
}
elseif ($method === 'PUT') {
    checkAuth($pdo);
    $data = json_decode(file_get_contents("php://input"));
    $id = $_GET['id'] ?? null;
    if ($id) {
        $stmt = $pdo->prepare("UPDATE blogs SET title=?, excerpt=?, content=?, image_url=? WHERE id=?");
        $stmt->execute([$data->title, $data->excerpt, $data->content, $data->image_url, $id]);
        echo json_encode(["success" => true]);
    }
}
elseif ($method === 'DELETE') {
    checkAuth($pdo);
    $id = $_GET['id'] ?? null;
    if ($id) {
        $stmt = $pdo->prepare("DELETE FROM blogs WHERE id=?");
        $stmt->execute([$id]);
        echo json_encode(["success" => true]);
    }
}
?>
