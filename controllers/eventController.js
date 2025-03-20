const Student = require('../models/Student');
const generateQR = require('../utils/qrGenerator');
const sendEmail = require('../utils/emailSender');

const registerStudent = async (req, res) => {
  const { name, email, phone, event } = req.body;

  try {
    // Check if email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    // Generate QR code
    const qrData = JSON.stringify({ name, email, event });
    const qrCodeUrl = await generateQR(qrData);

    // Save student to database
    const student = new Student({ name, email, phone, event, qrCode: qrCodeUrl });
    await student.save();

    // Send email with QR code
    await sendEmail(email, qrCodeUrl);

    res.status(201).json({ message: 'Registration successful!', qrCodeUrl });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
};
module.exports = { registerStudent };