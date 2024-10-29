<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'koneksi.php';
ob_clean();

function cleanInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Mengambil data dari form
    $id_menu = cleanInput($_POST['id_menu']);
    $nama_menu = cleanInput($_POST['nama_menu']);
    $kategori_menu = cleanInput($_POST['kategori_menu']);
    $protein = floatval($_POST['protein']);
    $karbohidrat = floatval($_POST['karbohidrat']);
    $lemak = floatval($_POST['lemak']);
    $kalori = floatval($_POST['kalori']);
    $resep = cleanInput($_POST['resep']);
    $satuan = cleanInput($_POST['satuan']);
    
    // Handle file upload
    $gambar = "";
    if(isset($_FILES['gambar']) && $_FILES['gambar']['error'] == 0) {
        $allowed = array('jpg', 'jpeg', 'png', 'gif');
        $filename = $_FILES['gambar']['name'];
        $ext = pathinfo($filename, PATHINFO_EXTENSION);
        
        if(in_array(strtolower($ext), $allowed)) {
            $upload_dir = 'uploads/'; // Pastikan folder ini sudah ada dan memiliki permission yang tepat
            $newname = uniqid() . "." . $ext;
            $target = $upload_dir . $newname;
            
            if(move_uploaded_file($_FILES['gambar']['tmp_name'], $target)) {
                $gambar = $newname;
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Gagal mengupload file']);
                exit;
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Format file tidak diizinkan']);
            exit;
        }
    }
    
    // Prepare statement untuk mencegah SQL injection
    $stmt = $koneksi->prepare("INSERT INTO menu (id_menu, nama_menu, kategori_menu, protein, karbohidrat, lemak, kalori, resep, gambar, satuan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    
    $stmt->bind_param("sssddddsss", 
        $id_menu,
        $nama_menu,
        $kategori_menu,
        $protein,
        $karbohidrat,
        $lemak,
        $kalori,
        $resep,
        $gambar,
        $satuan
    );
    
    // Eksekusi query
    if($stmt->execute()) {
        echo $gambar;
        echo json_encode(['status' => 'success', 'message' => 'Data menu berhasil disimpan']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Gagal menyimpan data: ' . $stmt->error]);
    }
    
    // Tutup statement
    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Method tidak diizinkan']);
}

