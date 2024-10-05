<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "diet_application";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

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
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssii", $id_user, $nama_lengkap, $email, $password, $no_hp, $berat_badan, $tinggi_badan);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "New user added successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
    }
    
    $stmt->close();
    $conn->close();
    exit();
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
