<?php
// Ganti dengan URL Ngrok Anda
$apiUrl = 'https://945e-140-213-118-69.ngrok-free.app/latihan/adek_aplication/Api/api.php'; // URL Ngrok

// Inisialisasi cURL
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $apiUrl);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($curl);
curl_close($curl);

// Mengonversi respons JSON menjadi array
$data = json_decode($response, true);

// Tampilkan data dalam tabel
$output = '<table>';
$output .= '<thead><tr><th>Nama</th><th>Harga</th></tr></thead>';
$output .= '<tbody>';

foreach ($data as $item) {
    $output .= '<tr>';
    $output .= '<td>' . htmlspecialchars($item['nama_produk']) . '</td>'; // Ganti sesuai dengan nama kolom Anda
    $output .= '<td>' . htmlspecialchars($item['harga']) . '</td>'; // Ganti sesuai dengan nama kolom Anda
    $output .= '</tr>';
}

$output .= '</tbody></table>';
echo $output;
?>
