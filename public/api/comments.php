<?php
// comments.php
require 'db.php';
require 'auth.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $blog_id = $_GET['blog_id'] ?? null;
    $admin = isset($_GET['admin']) && $_GET['admin'] === 'true';

    // If asking for admin view, verify token
    if ($admin) {
        checkAuth($pdo);
        if ($blog_id) {
            $stmt = $pdo->prepare("SELECT * FROM comments WHERE blog_id = ? ORDER BY created_at DESC");
            $stmt->execute([$blog_id]);
        }
        else {
            $stmt = $pdo->query("SELECT * FROM comments ORDER BY created_at DESC");
        }
        echo json_encode($stmt->fetchAll());
    }
    else {
        // Public view: only return approved comments
        if ($blog_id) {
            $stmt = $pdo->prepare("SELECT * FROM comments WHERE blog_id = ? AND is_approved = 1 ORDER BY created_at ASC");
            $stmt->execute([$blog_id]);
            echo json_encode($stmt->fetchAll());
        }
        else {
            echo json_encode([]);
        }
    }
}
elseif ($method === 'POST') {
    // Public route to leave comment
    $data = json_decode(file_get_contents("php://input"));
    $stmt = $pdo->prepare("INSERT INTO comments (blog_id, author_name, content, is_approved) VALUES (?, ?, ?, 0)");
    $stmt->execute([$data->blog_id, $data->author_name, $data->content]);
    echo json_encode(["success" => true, "message" => "Comment submitted for approval."]);
}
elseif ($method === 'PUT') {
    // Approve or unapprove comment
    checkAuth($pdo);
    $data = json_decode(file_get_contents("php://input"));
    $id = $_GET['id'] ?? null;
    if ($id) {
        $stmt = $pdo->prepare("UPDATE comments SET is_approved = ? WHERE id = ?");
        $stmt->execute([$data->is_approved ? 1 : 0, $id]);
        echo json_encode(["success" => true]);
    }
}
elseif ($method === 'DELETE') {
    checkAuth($pdo);
    $id = $_GET['id'] ?? null;
    if ($id) {
        $stmt = $pdo->prepare("DELETE FROM comments WHERE id=?");
        $stmt->execute([$id]);
        echo json_encode(["success" => true]);
    }
}
?>
