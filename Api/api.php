<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "adek_aplication";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// Handle GET request to fetch all data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = array();
    $tables = ['buku', 'data_pengguna', 'detail_kalori', 'detail_olahraga', 'konsultan', 'menu', 'olahraga'];

    foreach ($tables as $table) {
        $sql = "SELECT * FROM $table";
        $result = $conn->query($sql);
        $data[$table] = array();

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $data[$table][] = $row;
            }
        }
    }

    header('Content-Type: application/json');
    echo json_encode($data);
    exit();
}


$conn->close();
?>
