const daftarAntrian = [];

function tambahAntrian() {
    const nama = document.getElementById('inputPenduduk').value;
    const nomorKTP = document.getElementById('inputKTP').value;
    const keperluan = document.getElementById('selectKeperluan').value;


    if (nama && nomorKTP && keperluan ) {
        const nomorAntrian = daftarAntrian.length + 1;
        const antrian = { nomorAntrian, nama, nomorKTP, keperluan };
        daftarAntrian.push(antrian);
        tampilkanAntrian();
        document.getElementById('inputPenduduk').value = '';
        document.getElementById('inputKTP').value = '';
        document.getElementById('selectKeperluan').selectedIndex = 0;
    } else {
        alert('Silakan lengkapi semua field!');
    }
}

function tampilkanAntrian() {
    const daftarElement = document.getElementById('listAntrianPenduduk');
    daftarElement.innerHTML = '';

    daftarAntrian.forEach((antrian) => {
        const div = document.createElement('div');
        div.className = 'antrian';
        div.innerHTML = `
            <div class="antrian-item">
                Nama Penduduk: ${antrian.nama}<br>
                Nomor KTP: ${antrian.nomorKTP}<br>
                Keperluan: ${antrian.keperluan}<br>
                Nomor Antrian: ${antrian.nomorAntrian}
            </div>
        `;

        const hapusButton = document.createElement('button');
        hapusButton.innerHTML = 'Hapus';
        hapusButton.onclick = () => hapusAntrian(antrian.nomorAntrian);
        div.appendChild(hapusButton);

        daftarElement.appendChild(div);
    });
}

function hapusAntrian(nomorAntrian) {
    const index = daftarAntrian.findIndex(antrian => antrian.nomorAntrian === nomorAntrian);
    if (index !== -1) {
        daftarAntrian.splice(index, 1);
        tampilkanAntrian();
    }
}
