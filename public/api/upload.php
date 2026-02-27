<?php
// public/api/upload.php

require_once 'db.php';
require_once 'auth.php';

// Ensure the user is authenticated 
$admin_id = checkAuth($pdo);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if file was uploaded without errors
    if (isset($_FILES["image"]) && $_FILES["image"]["error"] == 0) {

        // Allowed file types
        $allowedTypes = array("webp" => "image/webp");

        $filename = $_FILES["image"]["name"];
        $filetype = $_FILES["image"]["type"];
        $filesize = $_FILES["image"]["size"];

        // Verify file extension
        $ext = pathinfo($filename, PATHINFO_EXTENSION);
        if (!array_key_exists(strtolower($ext), $allowedTypes)) {
            http_response_code(400);
            echo json_encode(['error' => 'Error: Please upload images in WEBP format only to ensure fast loading times.']);
            exit;
        }

        // Verify MIME type
        if (in_array($filetype, $allowedTypes)) {

            // Define upload directory relative to this script
            // Since script is in public/api, we want to go up one level to public/uploads
            $uploadDir = '../uploads/';

            // Create directory if it doesn't exist
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }

            // Generate unique filename to prevent overwriting
            $newFilename = uniqid('img_', true) . '.' . $ext;
            $uploadPath = $uploadDir . $newFilename;

            // Move the file
            if (move_uploaded_file($_FILES["image"]["tmp_name"], $uploadPath)) {

                // Return the public URL that the frontend can use
                // If Hostinger serves from the 'public' folder as root, the path should be '/uploads/filename.ext'
                $publicUrl = '/uploads/' . $newFilename;

                echo json_encode([
                    'success' => true,
                    'message' => 'File uploaded successfully.',
                    'url' => $publicUrl
                ]);
            }
            else {
                http_response_code(500);
                echo json_encode(['error' => 'Error: There was a problem moving the uploaded file. Ensure folder permissions are correct on Hostinger.']);
            }
        }
        else {
            http_response_code(400);
            echo json_encode(['error' => 'Error: Invalid MIME type.']);
        }
    }
    else {
        http_response_code(400);
        $errorMsg = isset($_FILES["image"]["error"]) ? 'Upload error code: ' . $_FILES["image"]["error"] : 'No file sent or unknown error.';
        echo json_encode(['error' => 'Error: ' . $errorMsg]);
    }
}
else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Use POST.']);
}
?>
