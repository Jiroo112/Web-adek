<?php
// Koneksi ke database
$servername = "localhost";
$username = "root"; // default username MySQL XAMPP
$password = ""; // kosong jika default di XAMPP
$dbname = "test"; // Ganti dengan nama database Anda

// Buat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Query untuk mengambil data dari tabel
$sql = "SELECT nama_produk, harga FROM produk"; // Ganti dengan nama tabel dan kolom Anda
$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    // Menyimpan hasil query ke array
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Mengirimkan data dalam format JSON
header('Content-Type: application/json');
echo json_encode($data);

// Tutup koneksi
$conn->close();
?>
