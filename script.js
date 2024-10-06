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
          if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            var output = '';
            var pengguna = data.data_pengguna;
      
            for (var i in pengguna) {
              output += '<tr>' + 
                        '<td>' + pengguna[i].id_user + '</td>' + 
                        '<td>' + pengguna[i].nama_lengkap + '</td>' + 
                        '<td>' + pengguna[i].email + '</td>' + 
                        '<td>' + pengguna[i].password + '</td>' + 
                        '<td>' + pengguna[i].no_hp + '</td>' + 
                        '<td>' + pengguna[i].berat_badan + '</td>' + 
                        '<td>' + pengguna[i].tinggi_badan + '</td>' + 
                        '<td class="action-icons">' +
                          '<i class="bx bx-edit-alt edit-icon" onclick="editUser(\'' + pengguna[i].id_user + '\')" title="Edit"></i> ' +
                          '<i class="bx bx-trash delete-icon" onclick="deleteUser(\'' + pengguna[i].id_user + '\')" title="Delete"></i>' +
                        '</td>' +
                        '</tr>';
            }
      
            document.getElementById('tableBody').innerHTML = output;
          }
        }
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
        const editform = document.getElementById('editForm');
        const editcontainer = document.getElementById('editFormContainer');
        const editcancel = document.getElementById('editCancelButton');

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

        editcancel.addEventListener('click', () => {
            editcontainer.classList.remove('active');
            tableContainer.classList.remove('hidden');
            searchPlusContainer.classList.remove('hidden');
            formTitle.classList.remove('active');
            dataForm.reset();
        });

        dataForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(dataForm);
        
            fetch('post_user.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('User added successfully!');
                    formContainer.classList.remove('active');
                    tableContainer.classList.remove('hidden');
                    searchPlusContainer.classList.remove('hidden');
                    dataForm.reset();
                    loadData(); 
                } else {
                    throw new Error(data.message || 'Unknown error occurred');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while adding the user: ' + error.message);
            });
        });

        editform.addEventListener('submit', (e) =>{
            e.preventDefault();
            
            const formData = new FormData(editform);
        
            fetch('update_user.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('User added successfully!');
                    editcontainer.classList.remove('active');
                    tableContainer.classList.remove('hidden');
                    searchPlusContainer.classList.remove('hidden');
                    formTitle.classList.remove('active');
                    dataForm.reset();
                    loadData(); 
                } else {
                    throw new Error(data.message || 'Unknown error occurred');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while adding the user: ' + error.message);
            });
        });

        function deleteUser(id_user) {
            if (confirm("Are you sure you want to delete this user?")) {
                fetch('delete_user.php', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id_user: id_user })
                })
                .then(response => response.text()) // Change to text() for debugging
                .then(text => {
                    console.log("Response:", text); // Log the response text
                    return JSON.parse(text); // Then parse it as JSON
                })
                .then(data => {
                    if (data.success) {
                        alert('User deleted successfully!');
                        loadData(); // Refresh the data table after deletion
                    } else {
                        alert('Error: ' + data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred while deleting the user: ' + error.message);
                });
            }
        }

        function editUser(id_user){
            fetch(`get_user.php?id=${id_user}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const user = data.user;
                    document.getElementById('editIdUser').value = user.id_user;
                    document.getElementById('editNamaLengkap').value = user.nama_lengkap;
                    document.getElementById('editEmail').value = user.email;
                    document.getElementById('editPassword').value = user.password;
                    document.getElementById('editNoHp').value = user.no_hp;
                    document.getElementById('editBeratBadan').value = user.berat_badan;
                    document.getElementById('editTinggiBadan').value = user.tinggi_badan;


                    tableContainer.classList.add('hidden');
                    editcontainer.classList.add('active');
                    searchPlusContainer.classList.add('hidden');
                    

                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while fetching user data: ' + error.message);
            });
        }
        
        