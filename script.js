// Generate QR on load
let qrcode = new QRCode(document.getElementById("qrcode"), {
  text: "https://example.com",
  width: 256,
  height: 256,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H
});

// Update QR as user types
document.getElementById('urlInput').addEventListener('input', function(e) {
  const text = e.target.value || " ";
  qrcode.makeCode(text);
});

// Download as PNG
function downloadQR() {
  const canvas = document.querySelector('#qrcode canvas');
  if (!canvas) return;

  const link = document.createElement('a');
  link.download = 'qrgenius-qr-code.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}