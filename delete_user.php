<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "diet_application";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Handle DELETE request to delete a user
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Get input JSON
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Check if id_user is set
    if (!isset($input['id_user'])) {
        echo json_encode(["success" => false, "message" => "User ID is required"]);
        exit();
    }

    // Get id_user from input
    $id_user = $input['id_user'];

    $sql = "DELETE FROM data_pengguna WHERE id_user = ?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $id_user);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "User deleted successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
    }
    
    $stmt->close();
    $conn->close();
    exit();
}

// If the request method is not DELETE
echo json_encode(["success" => false, "message" => "Invalid request method"]);
$conn->close();
?>
