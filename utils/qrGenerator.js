const QRCode = require('qrcode');

const generateQR = async (data) => {
  try {
    return await QRCode.toDataURL(data);
  } catch (err) {
    console.error('QR Generation Error:', err);
    throw err;
  }
};

module.exports = generateQR;