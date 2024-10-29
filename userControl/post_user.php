<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'koneksi.php';
ob_clean();

// Handle POST request to add new user
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_user = $_POST['idUser'];
    $nama_lengkap = $_POST['namaLengkap'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $no_hp = $_POST['noHp'];
    $berat_badan = $_POST['beratBadan'];
    $tinggi_badan = $_POST['tinggiBadan'];

    $sql = "INSERT INTO data_pengguna (id_user, nama_lengkap, email, password, no_hp, berat_badan, tinggi_badan) 
            VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $koneksi->prepare($sql);
    $stmt->bind_param("sssssii", $id_user, $nama_lengkap, $email, $password, $no_hp, $berat_badan, $tinggi_badan);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "New user added successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
    }
    
    $stmt->close();
    $koneksi->close();
    exit();
}