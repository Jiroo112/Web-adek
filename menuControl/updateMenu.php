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
    $id_menu = cleanInput($_POST['id_menu']);
    
    // Get existing menu data first
    $stmt = $koneksi->prepare("SELECT * FROM menu WHERE id_menu = ?");
    $stmt->bind_param("s", $id_menu);
    $stmt->execute();
    $result = $stmt->get_result();
    $existing_menu = $result->fetch_assoc();
    $stmt->close();
    
    // Clean and validate input data
    $nama_menu = !empty($_POST['nama_menu']) ? cleanInput($_POST['nama_menu']) : $existing_menu['nama_menu'];
    $kategori_menu = !empty($_POST['kategori_menu']) ? cleanInput($_POST['kategori_menu']) : $existing_menu['kategori_menu'];
    $protein = !empty($_POST['protein']) ? floatval($_POST['protein']) : $existing_menu['protein'];
    $karbohidrat = !empty($_POST['karbohidrat']) ? floatval($_POST['karbohidrat']) : $existing_menu['karbohidrat'];
    $lemak = !empty($_POST['lemak']) ? floatval($_POST['lemak']) : $existing_menu['lemak'];
    $kalori = !empty($_POST['kalori']) ? floatval($_POST['kalori']) : $existing_menu['kalori'];
    $resep = !empty($_POST['resep']) ? cleanInput($_POST['resep']) : $existing_menu['resep'];
    $satuan = !empty($_POST['satuan']) ? cleanInput($_POST['satuan']) : $existing_menu['satuan'];

    
    // Handle file upload
    $gambar = $existing_menu['gambar']; // Default to existing image
    if(isset($_FILES['gambar']) && $_FILES['gambar']['error'] == 0) {
        $allowed = array('jpg', 'jpeg', 'png', 'gif');
        $filename = $_FILES['gambar']['name'];
        $ext = pathinfo($filename, PATHINFO_EXTENSION);
        
        if(in_array(strtolower($ext), $allowed)) {
            $upload_dir = 'uploads/';
            $newname = uniqid() . "." . $ext;
            $target = $upload_dir . $newname;
            
            if(move_uploaded_file($_FILES['gambar']['tmp_name'], $target)) {
                // Delete old image if exists and different
                if($existing_menu['gambar'] && $existing_menu['gambar'] != $newname) {
                    $old_file = $upload_dir . $existing_menu['gambar'];
                    if(file_exists($old_file)) {
                        unlink($old_file);
                    }
                }
                $gambar = $newname;
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to upload file']);
                exit;
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'File format not allowed']);
            exit;
        }
    }
    
    // Prepare statement untuk update
    $sql = "UPDATE menu SET 
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
    $stmt->bind_param("ssddddssss", 
        $nama_menu,
        $kategori_menu,
        $protein,
        $karbohidrat,
        $lemak,
        $kalori,
        $resep,
        $gambar,
        $satuan,
        $id_menu
    );
    
    if($stmt->execute()) {
        echo json_encode([
            'success' => true, 
            'message' => 'Menu updated successfully',
            'data' => [
                'id_menu' => $id_menu,
                'nama_menu' => $nama_menu,
                'kategori_menu' => $kategori_menu,
                'protein' => $protein,
                'karbohidrat' => $karbohidrat,
                'lemak' => $lemak,
                'kalori' => $kalori,
                'resep' => $resep,
                'gambar' => $gambar,
                'satuan' => $satuan
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update menu: ' . $stmt->error]);
    }
    
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}