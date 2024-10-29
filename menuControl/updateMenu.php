<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'koneksi.php';
ob_clean();

// Memeriksa apakah form telah disubmit
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Mengambil data dari form
    $id_menu = $_POST["id_menu"];
    $nama_menu = $_POST["nama_menu"];
    $kategori_menu = $_POST["kategori_menu"];
    $protein = $_POST["protein"];
    $karbohidrat = $_POST["karbohidrat"];
    $lemak = $_POST["lemak"];
    $kalori = $_POST["kalori"];
    $resep = $_POST["resep"];
    $satuan = $_POST["editsatuan"];

    // Memeriksa apakah file gambar telah diupload
    if ($_FILES["gambar"]["name"] != "") {
        $gambar = $_FILES["gambar"]["name"];
        $temp = $_FILES["gambar"]["tmp_name"];
        $folder = "uploads/"; // Folder untuk menyimpan gambar
        move_uploaded_file($temp, $folder . $gambar);
    } else {
        $gambar = ""; // Jika tidak ada file gambar yang diupload
    }

    // Membuat query SQL untuk mengupdate data
    $sql = "UPDATE menu SET 
            id_menu = ?, 
            nama_menu = ?,
            kategori_menu = ?,
            protein = ?,
            karbohidrat = ?,
            lemak = ?,
            kalori = ?,
            resep = ?,
            gambar = ?,
            satuan = ?
            WHERE id_menu = ?";

    $stmt = $koneksi->prepare($sql);
    $stmt->bind_param("sssiiiisss", $id_menu, $nama_menu, $kategori_menu, $protein, $karbohidrat, $lemak, $kalori, $resep, $gambar, $satuan, $id_menu);

    // Menjalankan query dan memeriksa hasil
    if ($stmt->execute()) {
        echo "Data berhasil diupdate.";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Menutup koneksi
    $stmt->close();
    $koneksi->close();
}