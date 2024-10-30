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


    function loadData() {
    fetch('userControl/fetch_data.php')
        .then(response => response.text()) // Mengambil response sebagai teks
        .then(text => {
            console.log("Response from server:", text); // Cek respons di console
            let data;
            try {
                data = JSON.parse(text); // Coba parsing JSON
            } catch (error) {
                console.error('JSON parsing error:', error); 
                alert('Invalid JSON format: ' + error.message);
                return;
            }

            // Jika parsing berhasil, lanjutkan proses data
            if (data && data.data_pengguna) {
                const tableBody = document.getElementById('data_user');
                tableBody.innerHTML = '';

                data.data_pengguna.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.id_user}</td>
                        <td>${user.nama_lengkap}</td>
                        <td>${user.email}</td>
                        <td>${user.password}</td>
                        <td>${user.no_hp}</td>
                        <td>${user.berat_badan}</td>
                        <td>${user.tinggi_badan}</td>
                        <td>${user.umur}</td>
                        <td>${user.tipe_diet}</td>
                        <td>${user.gender}</td>
                        <td>
                          <i class="bx bx-edit-alt edit-icon" onclick="editUser('${user.id_user}')" title="Edit"></i> 
                          <i class="bx bx-trash delete-icon" onclick="deleteUser('${user.id_user}')" title="Delete"></i>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });

            } else {
                console.error('Error loading data: data_pengguna not found in response');
                alert('Error loading data: data_pengguna not found in response');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while loading the data: ' + error.message);
        });
}
function loadMenu() {
    fetch('menuControl/getMenu.php')
        .then(response => response.text())
        .then(text => {
            console.log("Response from server:", text);
            let data;
            try {
                data = JSON.parse(text); 
            } catch (error) {
                console.error('JSON parsing error:', error);
                alert('Invalid JSON format: ' + error.message);
                return;
            }

            if (data && data.menu) {
                const tableBody = document.getElementById('data_menu');
                tableBody.innerHTML = '';

                data.menu.forEach(menu => {
                    const row = document.createElement('tr');
                    const imgSrc = menu.gambar ? `menuControl/uploads/${menu.gambar}` : '';

                    // Konversi kategori_menu menggunakan nilai dari API
                    let kategoriText;
                    switch(menu.kategori_menu) {
                        case 'makanan_berat':
                            kategoriText = 'Makanan Berat';
                            break;
                        case 'makanan_ringan':
                            kategoriText = 'Makanan Ringan';
                            break;
                        case 'minuman':
                            kategoriText = 'Minuman';
                            break;
                        default:
                            kategoriText = '-'; // Nilai default jika tidak cocok
                    }

                    // Memastikan ada nilai untuk satuan
                    const satuanText = menu.satuan ? menu.satuan : '-';

                    // Isi row tabel
                    row.innerHTML = `
                        <td>${menu.id_menu}</td>
                        <td>${menu.nama_menu}</td>
                        <td>${kategoriText}</td>
                        <td>${menu.protein || '0'}</td>
                        <td>${menu.karbohidrat || '0'}</td>
                        <td>${menu.lemak || '0'}</td>
                        <td>${menu.kalori || '0'}</td>
                        <td>${menu.resep || '-'}</td>
                        <td>
                            <img src="${imgSrc}" alt="Gambar Menu" width="50" height="50">
                        </td>
                        <td>${satuanText}</td>
                        <td>
                            <i class="bx bx-edit-alt edit-icon" onclick="editMenu('${menu.id_menu}')" title="Edit"></i> 
                            <i class="bx bx-trash delete-icon" onclick="deleteMenu('${menu.id_menu}')" title="Delete"></i>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });

            } else {
                console.error('Error loading data: menu not found in response');
                alert('Error loading data: menu not found in response');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while loading the data: ' + error.message);
        });
    }

   
    // Call loadData when the page loads
    document.addEventListener('DOMContentLoaded', loadData);
    document.addEventListener('DOMContentLoaded', loadMenu);


  const addButton = document.getElementById('addUser');
        const tableContainer = document.getElementById('tableContainer');
        const tableMenu = document.getElementById('tableMenu');
        const formContainer = document.getElementById('formContainer');
        const cancelButton = document.getElementById('cancelButton');
        const dataForm = document.getElementById('dataForm');
        const tableBody = document.getElementById('tableBody');
        const searchPlusContainer = document.getElementById('searchPlusContainer');
        const formTitle = document.getElementById('formTitle');
        const editform = document.getElementById('editForm');
        const editcontainer = document.getElementById('editFormContainer');
        const editcancel = document.getElementById('editCancelButton');
        const addMenu = document.getElementById('addMenu');
        const formMenu = document.getElementById('formMenu');
        const dataMenu = document.getElementById('addmenuForm');
        const menuCancel = document.getElementById('cancelMenu');
        const editmenucontainer = document.getElementById('editmenuFormContainer');
        const editmenucancel= document.getElementById('editcancelMenu');
        const editmenuform = document.getElementById('editmenuForm');

        menuCancel.addEventListener('click',() =>{
            formMenu.classList.remove('active');
            tableMenu.classList.remove('hidden');
            searchPlusContainer.classList.remove('hidden');
            dataMenu.reset();
        })

        addMenu.addEventListener('click',() =>{
            tableMenu.classList.add('hidden');
            formMenu.classList.add('active');
            searchPlusContainer.classList.add('hidden');
        })

        addButton.addEventListener('click', () => {
            tableContainer.classList.add('hidden');
            formContainer.classList.add('active');
            searchPlusContainer.classList.add('hidden');
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

        editmenucancel.addEventListener('click', () =>{
            editmenucontainer.classList.remove('active');
            tableMenu.classList.remove('hidden');
            searchPlusContainer.classList.remove('hidden');
            
        });


        dataForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(dataForm);
        
            fetch('userControl/post_user.php', {
                method: 'POST',
                action: 'postUser',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('User added successfully!');
                    formTitle.classList.remove('active');
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

        formMenu.addEventListener('submit', async function (e) {
            e.preventDefault();
        
            // Ambil form dan buat objek FormData
            const form = document.getElementById('addmenuForm');
            const formData = new FormData(form);
        
            try {
                // Kirim data ke insert_menu.php menggunakan fetch
                const response = await fetch('menuControl/post_menu.php', {
                    method: 'POST',
                    body: formData,
                });
        
                // Cek respons dari server
                if (response.ok) {
                    alert('User added successfully!');
                    formMenu.classList.remove('active');
                    tableMenu.classList.remove('hidden');
                    searchPlusContainer.classList.remove('hidden');
                    dataMenu.reset();
                    loadMenu(); 
                } else {
                    alert('Gagal mengirim data');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Terjadi kesalahan saat mengirim data');
            }
        });

        editmenuform.addEventListener('submit', async (e) => {
            e.preventDefault();
        
            const formData = new FormData(editmenuform);
            
            // Log form data for debugging
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
            
            try {
                const response = await fetch('menuControl/updateMenu.php', {
                    method: 'POST',
                    body: formData
                });
        
                const text = await response.text();
                console.log("Server response:", text); // For debugging
                
                let data;
                try {
                    data = JSON.parse(text);
                } catch (error) {
                    console.error("JSON parsing error:", error);
                    alert('Server response was not in the expected format');
                    return;
                }
        
                if (data.success) {
                    alert('Menu updated successfully!');
                    editmenucontainer.classList.remove('active');
                    tableMenu.classList.remove('hidden');
                    searchPlusContainer.classList.remove('hidden');
                    editmenuform.reset();
                    loadMenu();
                } else {
                    throw new Error(data.message || 'Unknown error occurred');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while updating the menu: ' + error.message);
            }
        });
        

        editform.addEventListener('submit', (e) =>{
            e.preventDefault();
            
            const formData = new FormData(editform);
        
            fetch('userControl/update_user.php', {
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
                fetch('userControl/delete_user.php', {
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

        function deleteMenu(id_menu) {
            if (confirm("Are you sure you want to delete this user?")) {
                fetch('menuControl/deleteMenu.php', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id_menu: id_menu })
                })
                .then(response => response.text()) // Change to text() for debugging
                .then(text => {
                    console.log("Response:", text); // Log the response text
                    return JSON.parse(text); // Then parse it as JSON
                })
                .then(data => {
                    if (data.success) {
                        alert('User deleted successfully!');
                        loadMenu(); // Refresh the data table after deletion
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
            fetch(`userControl/get_user.php?id=${id_user}`)
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

        function editMenu(id_menu) {
            fetch(`menuControl/editMenu.php?id=${id_menu}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const menu = data.menu;
                        console.log('Retrieved menu data:', menu); // Debug log
        
                        // Populate form fields
                        document.getElementById('editid_menu').value = menu.id_menu;
                        document.getElementById('editnama_menu').value = menu.nama_menu || '';
                        
                        // Set kategori_menu
                        const kategoriSelect = document.getElementById('editkategori_menu');
                        if (kategoriSelect && menu.kategori_menu) {
                            console.log('Setting kategori_menu to:', menu.kategori_menu); // Debug log
                            kategoriSelect.value = menu.kategori_menu;
                        }
        
                        // Numeric fields
                        document.getElementById('editprotein').value = menu.protein || '0';
                        document.getElementById('editkarbohidrat').value = menu.karbohidrat || '0';
                        document.getElementById('editlemak').value = menu.lemak || '0';
                        document.getElementById('editkalori').value = menu.kalori || '0';
                        document.getElementById('editresep').value = menu.resep || '';
        
                        // Set satuan
                        const satuanSelect = document.getElementById('editsatuan');
                        if (satuanSelect && menu.satuan) {
                            console.log('Setting satuan to:', menu.satuan); // Debug log
                            satuanSelect.value = menu.satuan;
                        }
        
                        // Handle file display
                        const editFileNameSpan = document.getElementById('editFileName');
                        const editRemoveFileSpan = document.getElementById('editRemoveFile');
                        
                        if (menu.gambar) {
                            editFileNameSpan.textContent = menu.gambar;
                            editRemoveFileSpan.style.display = 'inline';
                            editFileNameSpan.style.cursor = 'pointer';
                            editFileNameSpan.onclick = () => {
                                showPreview(`menuControl/uploads/${menu.gambar}`);
                            };
                        } else {
                            editFileNameSpan.textContent = 'No file chosen';
                            editRemoveFileSpan.style.display = 'none';
                        }
        
                        // Update UI state
                        tableMenu.classList.add('hidden');
                        editmenucontainer.classList.add('active');
                        searchPlusContainer.classList.add('hidden');
        
                        console.log('Form populated with values:', {
                            kategori_menu: kategoriSelect.value,
                            satuan: satuanSelect.value
                        }); // Debug log
                    } else {
                        alert('Error: ' + data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred while fetching menu data: ' + error.message);
                });
        }
        

        function searchFromDatabase() {
            const searchInput = document.getElementById('searchUser');
            const searchTerm = searchInput.value;
        
            
            fetch(`userControl/search_user.php?term=${encodeURIComponent(searchTerm)}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        updateTable(data.users);
                    } else {
                        console.error('Error:', data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
        
        function updateTable(users) {
            const tableBody = document.getElementById('data_user');
            tableBody.innerHTML = '';
        
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id_user}</td>
                    <td>${user.nama_lengkap}</td>
                    <td>${user.email}</td>
                    <td>${user.password}</td>
                    <td>${user.no_hp}</td>
                    <td>${user.berat_badan}</td>
                    <td>${user.tinggi_badan}</td>
                    <td>${user.umur}</td>
                    <td>${user.tipe_diet}</td>
                    <td>${user.gender}</td>
                    <td>
                        <i class="bx bx-edit-alt edit-icon" onclick="editUser('${user.id_user}')" title="Edit"></i> 
                        <i class="bx bx-trash delete-icon" onclick="deleteUser('${user.id_user}')" title="Delete"></i>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }
        
        
        document.addEventListener('DOMContentLoaded', function() {
            const searchInput = document.getElementById('searchUser');
            if (searchInput) {
                searchInput.addEventListener('input', searchFromDatabase);
            }
        });

        const fileInput = document.getElementById('fileUpload');
        const fileNameSpan = document.getElementById('fileName');
        const removeFileSpan = document.getElementById('removeFile');
        
        fileInput.addEventListener('change', function () {
          if (fileInput.files.length > 0) {
            fileNameSpan.textContent = fileInput.files[0].name;
            removeFileSpan.style.display = 'inline';
            const file = this.files[0];
                fileName.textContent = file.name;
                const previewUrl = URL.createObjectURL(file);
                fileName.onclick = function() {
                    showPreview(previewUrl);
                };
          } else {
            fileNameSpan.textContent = 'No file chosen';
          }
        });
        
        removeFileSpan.addEventListener('click', function () {
          fileInput.value = '';  // Clear file input
          fileNameSpan.textContent = 'No file chosen';
          removeFileSpan.style.display = 'none';  // Hide remove button
        });
        
        function showPreview(url) {
            const modal = document.getElementById('previewModal');
            const previewImage = document.getElementById('previewImage');
            const close = document.getElementById('closeModal')
            
            previewImage.src = url;
            modal.style.display = 'flex';

            close.addEventListener('click', ()=>{
                modal.style.display = 'none';
            })
            
            modal.onclick = function(e) {
                if (e.target === modal) {
                    closePreview();
                }
            };
        }

        function closePreview() {
            const modal = document.getElementById('previewModal');
            modal.style.display = 'none';
        }
        const editFileNameSpan = document.getElementById('editFileName');
        const editRemoveFileSpan = document.getElementById('editRemoveFile');

         // Add file input handler
         const editFileInput = document.getElementById('editFileUpload');
         if (editFileInput) {
             editFileInput.addEventListener('change', function() {
                 const editFileNameSpan = document.getElementById('editFileName');
                 const editRemoveFileSpan = document.getElementById('editRemoveFile');
                 
                 if (this.files.length > 0) {
                     editFileNameSpan.textContent = this.files[0].name;
                     editRemoveFileSpan.style.display = 'inline';
                     
                     // Preview for new file
                     const file = this.files[0];
                     const previewUrl = URL.createObjectURL(file);
                     editFileNameSpan.onclick = () => showPreview(previewUrl);
                 } else {
                     editFileNameSpan.textContent = 'No file chosen';
                     editRemoveFileSpan.style.display = 'none';
                 }
             });

        editRemoveFileSpan.addEventListener('click', function () {
        editFileInput.value = '';  // Clear file input
        editFileNameSpan.textContent = 'No file chosen';
        editRemoveFileSpan.style.display = 'none';  // Hide remove button
        });
    }