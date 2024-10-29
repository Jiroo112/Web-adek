<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'koneksi.php';
ob_clean();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = array();
    $sql = "SELECT id_menu, nama_menu, kategori_menu, protein, karbohidrat, lemak, kalori, resep, gambar, satuan FROM menu";
    $result = $koneksi->query($sql);
    $data['menu'] = array();

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data['menu'][] = $row;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($data);
    exit();
}

$koneksi->close();

?>
