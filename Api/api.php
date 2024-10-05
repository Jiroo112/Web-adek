<?php

header("Access-Control-Allow-Origin: *"); // Mengizinkan semua asal
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Mengizinkan metode HTTP
header("Access-Control-Allow-Headers: Content-Type"); 
// Koneksi ke database
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "adek_aplication"; 

// Buat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Array untuk menampung semua data dari berbagai tabel
$data = array();

// Ambil data dari tabel buku
$sql_buku = "SELECT * FROM buku";
$result_buku = $conn->query($sql_buku);
$data['buku'] = array();

if ($result_buku->num_rows > 0) {
    while($row = $result_buku->fetch_assoc()) {
        $data['buku'][] = $row;
    }
}

// Ambil data dari tabel data_pengguna
$sql_data_pengguna = "SELECT * FROM data_pengguna";
$result_data_pengguna = $conn->query($sql_data_pengguna);
$data['data_pengguna'] = array();

if ($result_data_pengguna->num_rows > 0) {
    while($row = $result_data_pengguna->fetch_assoc()) {
        $data['data_pengguna'][] = $row;
    }
}

// Ambil data dari tabel detail_kalori
$sql_detail_kalori = "SELECT * FROM detail_kalori";
$result_detail_kalori = $conn->query($sql_detail_kalori);
$data['detail_kalori'] = array();

if ($result_detail_kalori->num_rows > 0) {
    while($row = $result_detail_kalori->fetch_assoc()) {
        $data['detail_kalori'][] = $row;
    }
}

// Ambil data dari tabel detail_olahraga
$sql_detail_olahraga = "SELECT * FROM detail_olahraga";
$result_detail_olahraga = $conn->query($sql_detail_olahraga);
$data['detail_olahraga'] = array();

if ($result_detail_olahraga->num_rows > 0) {
    while($row = $result_detail_olahraga->fetch_assoc()) {
        $data['detail_olahraga'][] = $row;
    }
}

// Ambil data dari tabel konsultan
$sql_konsultan = "SELECT * FROM konsultan";
$result_konsultan = $conn->query($sql_konsultan);
$data['konsultan'] = array();

if ($result_konsultan->num_rows > 0) {
    while($row = $result_konsultan->fetch_assoc()) {
        $data['konsultan'][] = $row;
    }
}

// Ambil data dari tabel menu
$sql_menu = "SELECT * FROM menu";
$result_menu = $conn->query($sql_menu);
$data['menu'] = array();

if ($result_menu->num_rows > 0) {
    while($row = $result_menu->fetch_assoc()) {
        $data['menu'][] = $row;
    }
}

// Ambil data dari tabel olahraga
$sql_olahraga = "SELECT * FROM olahraga";
$result_olahraga = $conn->query($sql_olahraga);
$data['olahraga'] = array();

if ($result_olahraga->num_rows > 0) {
    while($row = $result_olahraga->fetch_assoc()) {
        $data['olahraga'][] = $row;
    }
}

// Mengirimkan semua data dalam format JSON
header('Content-Type: application/json');
echo json_encode($data);

// Tutup koneksi
$conn->close();
?>
