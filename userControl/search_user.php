<?php

include 'koneksi.php';
ob_clean();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$searchTerm = isset($_GET['term']) ? $koneksi->real_escape_string($_GET['term']) : '';

// Query pencarian
$sql = "SELECT * FROM data_pengguna WHERE 
        id_user LIKE '%$searchTerm%' OR 
        nama_lengkap LIKE '%$searchTerm%' OR 
        email LIKE '%$searchTerm%' OR 
        no_hp LIKE '%$searchTerm%'";

$result = $koneksi->query($sql);

if ($result) {
    $users = [];
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    echo json_encode(['success' => true, 'users' => $users]);
} else {
    echo json_encode(['success' => false, 'message' => "Error: " . $koneksi->error]);
}

$koneksi->close();
?>