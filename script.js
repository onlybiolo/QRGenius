// Inizializzazione QR Code
const qrcode = new QRCode(document.getElementById("qrcode"), {
    text: "https://example.com",
    width: 200,
    height: 200,
    colorDark: "#0f172a",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.M
});

// Gestione Tabs
function switchMode(mode) {
    const textMode = document.getElementById('textMode');
    const fileMode = document.getElementById('fileMode');
    const tabText = document.getElementById('tabText');
    const tabFile = document.getElementById('tabFile');

    if (mode === 'text') {
        textMode.classList.remove('hidden');
        fileMode.classList.add('hidden');
        tabText.classList.add('active-tab');
        tabFile.classList.remove('active-tab');
        tabFile.classList.add('text-slate-400');
    } else {
        textMode.classList.add('hidden');
        fileMode.classList.remove('hidden');
        tabFile.classList.add('active-tab');
        tabText.classList.remove('active-tab');
        tabText.classList.add('text-slate-400');
    }
}

// Generazione da Testo/Link
document.getElementById('dataInput').addEventListener('input', function(e) {
    const value = e.target.value.trim();
    if (value) {
        qrcode.makeCode(value);
    } else {
        qrcode.makeCode(" ");
    }
});

// Generazione da Immagine (Image to QR)
document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        // Converte l'immagine in Base64 (stringa di testo)
        const base64String = event.target.result;
        // Nota: se la stringa è troppo lunga per un QR, QRCode.js darà errore.
        // I QR code hanno limiti di dati.
        try {
            qrcode.makeCode(base64String);
        } catch (err) {
            alert("Image too large. Please try a smaller icon.");
        }
    };
    reader.readAsDataURL(file);
});

// Funzione Download
function downloadQR() {
    const canvas = document.querySelector('#qrcode canvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'qrgenius-code.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}