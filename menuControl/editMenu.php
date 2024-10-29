<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'koneksi.php';
ob_clean();


if (isset($_GET['id'])) {
    $id = $_GET['id'];
    
    $query = "SELECT * FROM menu WHERE id_menu = ?";
    $stmt = $koneksi->prepare($query);
    $stmt->bind_param("s", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $menu = $result->fetch_assoc();
        echo json_encode(['success' => true, 'menu' => $menu]);
    } else {
        echo json_encode(['success' => false, 'message' => 'User not found']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No ID provided']);
}

$koneksi->close();
?>