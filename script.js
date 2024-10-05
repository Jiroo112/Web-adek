const body = document.querySelector("body"),
      sidebar = body.querySelector(".sidebar"),
      toggle = body.querySelector(".toggle");

      toggle.addEventListener("click", () =>{
        sidebar.classList.toggle("close");
      });

      
      function showContent(contentId) {
        // Sembunyikan semua konten
        var contents = document.getElementsByClassName('content');
        for (var i = 0; i < contents.length; i++) {
            contents[i].style.display = 'none';
        }

        // Tampilkan konten yang dipilih
        document.getElementById(contentId).style.display = 'block';
    }

    // Fungsi untuk mengambil data dari ambil_data.php dan menampilkannya di tabel
    function loadData() {
      var xhr = new XMLHttpRequest(); 
      
      xhr.open("GET", "fetch_data.php", true); 
      xhr.onload = function() { 
          // Memeriksa status respons
          if (this.status == 200) { 
              // Mengonversi respons JSON menjadi objek JavaScript
              var data = JSON.parse(this.responseText); 
              var output = ''; // Variabel untuk menyimpan HTML tabel
  
              // Mengakses data dari tabel data_pengguna
              var pengguna = data.data_pengguna;
  
              // Looping data dari data_pengguna dan tambahkan baris ke tabel
              for (var i in pengguna) { 
                  // Menambahkan baris baru untuk tabel
                  output += '<tr>' + 
                            '<td>' + pengguna[i].id_user + '</td>' + 
                            '<td>' + pengguna[i].nama_lengkap + '</td>' + 
                            '<td>' + pengguna[i].email + '</td>' + 
                            '<td>' + pengguna[i].password + '</td>' + 
                            '<td>' + pengguna[i].no_hp + '</td>' + 
                            '<td>' + pengguna[i].berat_badan + '</td>' + 
                            '<td>' + pengguna[i].tinggi_badan + '</td>' + 
                            '</tr>';
              }
  
              // Memasukkan hasil ke dalam elemen dengan id tableBody
              document.getElementById('tableBody').innerHTML = output; 
          }
      }
      
      // Mengirimkan permintaan
      xhr.send(); 
  }
  
  window.onload = loadData;

  const addButton = document.getElementById('addButton');
        const tableContainer = document.getElementById('tableContainer');
        const formContainer = document.getElementById('formContainer');
        const cancelButton = document.getElementById('cancelButton');
        const dataForm = document.getElementById('dataForm');
        const tableBody = document.getElementById('tableBody');
        const searchPlusContainer = document.getElementById('searchPlusContainer');
        const formTitle = document.getElementById('formTitle');

        addButton.addEventListener('click', () => {
            tableContainer.classList.add('hidden');
            formContainer.classList.add('active');
            searchPlusContainer.classList.add('hidden');
            formTitle.classList.add('active');
        });

        cancelButton.addEventListener('click', () => {
            formContainer.classList.remove('active');
            tableContainer.classList.remove('hidden');
            searchPlusContainer.classList.remove('hidden');
            formTitle.classList.remove('active');
            dataForm.reset();
        });

        dataForm.addEventListener('submit', (e) => {
            e.preventDefault();
            //masmu suruh coding disini bill ngroknya ta hodupim ak mau sarapan
            formContainer.classList.remove('active');
            tableContainer.classList.remove('hidden');
            searchPlusContainer.classList.remove('hidden');
            formTitle.classList.remove('active');
            dataForm.reset();
        });