<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'koneksi.php';

ob_clean();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = array();

    $sql_pengguna = "SELECT * FROM data_pengguna";
    $result_pengguna = $koneksi->query($sql_pengguna);
    $data['data_pengguna'] = array();

    if ($result_pengguna->num_rows > 0) {
        while($row_pengguna = $result_pengguna->fetch_assoc()) {
            $data['data_pengguna'][] = $row_pengguna;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($data);
    exit();
}

$koneksi->close();

?>