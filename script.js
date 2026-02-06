const qrcode = new QRCode(document.getElementById("qrcode"), {
    text: "https://example.com",
    width: 256,
    height: 256
});

document.getElementById('urlInput').addEventListener('input', function(e) {
    qrcode.makeCode(e.target.value || "https://example.com");
});

function downloadQR() {
    const canvas = document.querySelector('#qrcode canvas');
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL();
    link.click();
}
