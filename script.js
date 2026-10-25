
function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function switchTab(tabId, btn) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
}

function openModal(id) { document.getElementById(id).style.display = 'block'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) event.target.style.display = 'none';
}


const dgnlTable = [
    { p: 1, dgnl: 1108, thpt: 29.75 }, { p: 5, dgnl: 932, thpt: 25.85 },
    { p: 10, dgnl: 873, thpt: 24.95 }, { p: 20, dgnl: 795, thpt: 23.50 },
    { p: 30, dgnl: 740, thpt: 22.50 }, { p: 50, dgnl: 655, thpt: 20.30 },
    { p: 70, dgnl: 582, thpt: 17.85 }, { p: 100, dgnl: 370, thpt: 10.85 }
];

function interpolateDGNL(score) {
    if (!score || score <= 0) return 0;
    if (score >= 1139) return 30;
    if (score <= 370) return 10.85;
    
    for (let i = 0; i < dgnlTable.length - 1; i++) {
        let top = dgnlTable[i], bot = dgnlTable[i+1];
        if (score <= top.dgnl && score >= bot.dgnl) {
            return bot.thpt + (top.thpt - bot.thpt) * (score - bot.dgnl) / (top.dgnl - bot.dgnl);
        }
    }
    return 0;
}

const majors2026 = [
    { id: '7480101TT', name: 'Khoa học máy tính (CT Tiên tiến)', benchmark30: 29.32 },
    { id: '7480107', name: 'Trí tuệ nhân tạo', benchmark30: 28.68 },
    { id: '7480201NN', name: 'Nhóm ngành Máy tính và CNTT', benchmark30: 26.30 },
    { id: '75202a1', name: 'Thiết kế vi mạch', benchmark30: 27.93 },
    { id: '7460101NN', name: 'Nhóm ngành Toán học', benchmark30: 26.28 },
    { id: '7520207', name: 'Kỹ thuật điện tử - viễn thông', benchmark30: 26.55 },
    { id: '7440112', name: 'Hóa học', benchmark30: 26.15 }
];

function calculateScore() {
    const m1_hb = parseFloat(document.getElementById('hb-toan').value) || 0;
    const m1_thpt = parseFloat(document.getElementById('thpt-toan').value) || 0;
    const m2_hb = parseFloat(document.getElementById('hb-van').value) || 0;
    const m2_thpt = parseFloat(document.getElementById('thpt-van').value) || 0;

    const tc1 = document.getElementById('sel-tc1').value;
    const m3_hb = parseFloat(document.getElementById('hb-tc1').value) || 0;
    const m3_thpt = parseFloat(document.getElementById('thpt-tc1').value) || 0;

    const tc2 = document.getElementById('sel-tc2').value;
    const m4_hb = parseFloat(document.getElementById('hb-tc2').value) || 0;
    const m4_thpt = parseFloat(document.getElementById('thpt-tc2').value) || 0;

    if(tc1 === tc2) {
        alert("Lỗi: Môn tự chọn 1 và 2 không được trùng nhau!");
        return;
    }

    const comb1_thpt = m1_thpt + m2_thpt + m3_thpt;
    const comb1_hb = m1_hb + m2_hb + m3_hb;
    const name1 = `Toán - Văn - ${tc1}`;

    const comb2_thpt = m1_thpt + m2_thpt + m4_thpt;
    const comb2_hb = m1_hb + m2_hb + m4_hb;
    const name2 = `Toán - Văn - ${tc2}`;
    
    const comb3_thpt = m1_thpt + m3_thpt + m4_thpt;
    const comb3_hb = m1_hb + m3_hb + m4_hb;
    const name3 = `Toán - ${tc1} - ${tc2}`;

    let bestTHPT = 0, bestHB = 0, bestName = "";
    if (comb1_thpt >= comb2_thpt && comb1_thpt >= comb3_thpt) { bestTHPT = comb1_thpt; bestHB = comb1_hb; bestName = name1; }
    else if (comb2_thpt >= comb1_thpt && comb2_thpt >= comb3_thpt) { bestTHPT = comb2_thpt; bestHB = comb2_hb; bestName = name2; }
    else { bestTHPT = comb3_thpt; bestHB = comb3_hb; bestName = name3; }

    const dgnlRaw = parseFloat(document.getElementById('score-dgnl').value) || 0;
    const dgnlTHPT = interpolateDGNL(dgnlRaw);

    const hocLuc1 = (0.8 * bestTHPT) + (0.2 * bestHB);
    const hocLuc2 = (0.8 * dgnlTHPT) + (0.2 * bestHB);
    const diemHocLuc = Math.max(hocLuc1, hocLuc2);

    let diemCongCoSo = parseFloat(document.getElementById('diem-cong').value);
    let diemCongThuc = diemCongCoSo;
    if (diemHocLuc >= 28.5) {
        diemCongThuc = ((30 - diemHocLuc) / 1.5) * diemCongCoSo;
    }

    const tongDiemTam = diemHocLuc + diemCongThuc;

    const diemKV = parseFloat(document.getElementById('khu-vuc').value);
    const diemDT = parseFloat(document.getElementById('doi-tuong').value);
    let mucUuTien = diemKV + diemDT;
    let diemUuTienThuc = mucUuTien;
    if (tongDiemTam >= 22.5) {
        diemUuTienThuc = ((30 - tongDiemTam) / 7.5) * mucUuTien;
    }

    let diemXetTuyen = tongDiemTam + diemUuTienThuc;
    if (diemXetTuyen > 30) diemXetTuyen = 30;
    const diemCongBo = (diemXetTuyen / 30) * 100;

    document.getElementById('calc-results').style.display = 'block';
    document.getElementById('res-tohop').innerText = `${bestName} (Điểm gốc THPT: ${bestTHPT.toFixed(2)})`;
    document.getElementById('res-thpt').innerText = bestTHPT.toFixed(2);
    document.getElementById('res-hocba').innerText = bestHB.toFixed(2);
    document.getElementById('res-dgnl').innerText = `${dgnlRaw} -> Quy đổi: ${dgnlTHPT.toFixed(2)}`;
    
    document.getElementById('res-final30').innerText = diemXetTuyen.toFixed(2);
    document.getElementById('res-final100').innerText = diemCongBo.toFixed(2);

    const recContainer = document.getElementById('recommendations');
    recContainer.innerHTML = '<h4>Gợi Ý Nguyện Vọng (Dựa trên điểm chuẩn 2026)</h4>';
    
    majors2026.forEach(major => {
        let diff = diemXetTuyen - major.benchmark30;
        let status = "", className = "";
        if (diff >= 0.5) { status = "An toàn (Dư điểm)"; className = "safe"; }
        else if (diff >= -0.5 && diff < 0.5) { status = "Vừa tầm"; className = "dream"; }
        else { status = "Ước mơ"; className = "challenge"; }

        recContainer.innerHTML += `
            <div class="rec-item ${className}">
                <strong>${major.name}</strong><br>
                Điểm chuẩn: ${major.benchmark30} | Khả năng: <span>${status}</span>
            </div>
        `;
    });
}


function updateCard() {
    document.getElementById('out-name').innerText = document.getElementById('card-name').value.toUpperCase() || '------';
    document.getElementById('out-dob').innerText = document.getElementById('card-dob').value || '--/--/2009';
    document.getElementById('out-id').innerText = document.getElementById('card-id').value || '27------';
    document.getElementById('out-major').innerText = document.getElementById('card-major').value || '------';
    document.getElementById('out-level').innerText = document.getElementById('card-level').value || 'Đại học';
    document.getElementById('out-year').innerText = document.getElementById('card-year').value || '2027 - 2031';
    
    let idVal = document.getElementById('card-id').value || '27------';
    document.querySelector('.barcode-font').innerText = `*${idVal}*`;
}
document.getElementById('upload-photo').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('out-photo').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

function downloadCard() {
    const cardElement = document.getElementById('real-id-card');
    html2canvas(cardElement, { 
        scale: 3, 
        useCORS: true, 
        backgroundColor: null 
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'The_Sinh_Vien_Mo_Phong.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }).catch(err => {
        alert("Lỗi khi tạo ảnh thẻ. Hãy tải lại trang và thử lại!");
        console.error(err);
    });
}