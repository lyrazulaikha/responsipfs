let dataMember = [
    { nama: "nami", email: "sayangluffy@gmail.com", paket: "Glowing Series", status: "Aktif" },
    { nama: "nico robin", email: "fleurciens@yahoo.com", paket: "Acne Fighter", status: "Non-Aktif" },
    { nama: "shirahoshi", email: "putriduyung@gmail.com", paket: "Anti Aging", status: "Aktif" },
    { nama: "vivi", email: "nefertari@gmail.com", paket: "Glowing Series", status: "Aktif" }
];

function updateDashboard() {
    const total = dataMember.length;
    const aktif = dataMember.filter(item => item.status === 'Aktif').length;
    const nonAktif = dataMember.filter(item => item.status === 'Non-Aktif').length;

    document.getElementById('count-total').innerText = total;
    document.getElementById('count-active').innerText = aktif;
    document.getElementById('count-inactive').innerText = nonAktif;
}

function renderTable() {
    const tableBody = document.getElementById("tableData");
    tableBody.innerHTML = "";

    dataMember.forEach((member, index) => {
        let row = `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${member.nama}</td>
                <td>${member.email}</td>
                <td><span class="badge ${getBadgeColor(member.paket)}">${member.paket}</span></td>
                <td>${member.status === 'Aktif' ? '<i class="fas fa-check-circle text-success"></i>' : '<i class="fas fa-times-circle text-danger"></i>'} ${member.status}</td>
                <td>
                    <button class="btn btn-sm btn-info text-white" onclick="editData(${index})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="deleteData(${index})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
    updateDashboard();
}

function getBadgeColor(paket) {
    if (paket === "Glowing Series") return "bg-warning text-dark";
    if (paket === "Acne Fighter") return "bg-danger";
    return "bg-secondary";
}

function saveData() {
    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const paket = document.getElementById("paket").value;
    const index = document.getElementById("indexData").value;
    let status = "";

    if(document.getElementById("aktif").checked) {
        status = "Aktif";
    } else {
        status = "Non-Aktif";
    }

    if(nama === "" || email === "" || paket === "") {
        alert("Semua data harus diisi!");
        return;
    }

    const newData = { nama, email, paket, status };

    if (index === "") {
        dataMember.push(newData);
    } else {
        dataMember[index] = newData;
    }

    renderTable();
    document.getElementById("dataForm").reset();
    
    const myModalEl = document.getElementById('userModal');
    const modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
}

function editData(index) {
    const member = dataMember[index];
    
    document.getElementById("nama").value = member.nama;
    document.getElementById("email").value = member.email;
    document.getElementById("paket").value = member.paket;
    document.getElementById("indexData").value = index;

    if(member.status === "Aktif") {
        document.getElementById("aktif").checked = true;
    } else {
        document.getElementById("nonaktif").checked = true;
    }

    const myModalEl = document.getElementById('userModal');
    const myModal = new bootstrap.Modal(myModalEl);
    myModal.show();
}

function deleteData(index) {
    if(confirm("Yakin ingin menghapus data member ini?")) {
        dataMember.splice(index, 1);
        renderTable();
    }
}

function resetForm() {
    document.getElementById("dataForm").reset();
    document.getElementById("indexData").value = "";
}

function saveSettings() {
    alert("Pengaturan profil admin berhasil disimpan!");
}

$(document).ready(function() {
    renderTable();
    updateDashboard();

    $(document).on('click', '#menu-toggle', function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    $('#menu-dashboard').click(function(e) {
        e.preventDefault();
        $('#view-dashboard').removeClass('d-none');
        $('#view-member').addClass('d-none');
        $('#view-settings').addClass('d-none');
        $('#page-title').text('Dashboard Overview');
        
        $('.list-group-item').removeClass('active');
        $(this).addClass('active');

        if ($(window).width() < 768) $("#wrapper").removeClass("toggled");
    });

    $('#menu-member').click(function(e) {
        e.preventDefault();
        $('#view-dashboard').addClass('d-none');
        $('#view-member').removeClass('d-none');
        $('#view-settings').addClass('d-none');
        $('#page-title').text('Data Member Skincare');
        
        $('.list-group-item').removeClass('active');
        $(this).addClass('active');

        if ($(window).width() < 768) $("#wrapper").removeClass("toggled");
    });

    $('#menu-settings').click(function(e) {
        e.preventDefault();
        $('#view-dashboard').addClass('d-none');
        $('#view-member').addClass('d-none');
        $('#view-settings').removeClass('d-none');
        $('#page-title').text('Pengaturan Admin');
        
        $('.list-group-item').removeClass('active');
        $(this).addClass('active');

        if ($(window).width() < 768) $("#wrapper").removeClass("toggled");
    });

    $('#menu-logout').click(function(e) {
        e.preventDefault();
        if(confirm("Apakah Anda yakin ingin Logout?")) {
            location.reload(); 
        }
    });
});