<?php
header('Content-Type: application/json');

// Database configuration
$host = "localhost";
$username = "root";
$password = "";
$database = "adek_aplication";

// Create connection
$koneksi = new mysqli($host, $username, $password, $database);

// Check connection
if ($koneksi->connect_error) {
    die(json_encode(['success' => false, 'message' => "Connection failed: " . $koneksi->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_user = $_POST['idUser'];
    $nama_lengkap = $_POST['namaLengkap'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $no_hp = $_POST['noHp'];
    $berat_badan = $_POST['beratBadan'];
    $tinggi_badan = $_POST['tinggiBadan'];

    $query = "UPDATE data_pengguna SET nama_lengkap = ?, email = ?, password = ?, no_hp = ?, berat_badan = ?, tinggi_badan = ? WHERE id_user = ?";
    $stmt = $koneksi->prepare($query);
    $stmt->bind_param("ssssiis", $nama_lengkap, $email, $password, $no_hp, $berat_badan, $tinggi_badan, $id_user);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => $stmt->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

$koneksi->close();
?>