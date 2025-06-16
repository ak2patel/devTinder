const otpStore = new Map(); // email => { otp, expiresAt }

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const saveOtp = (email, otp) => {
  const expiresAt = Date.now() + 5 * 60 * 1000; // expires in 5 minutes
  otpStore.set(email, { otp, expiresAt });
};

const verifyOtp = (email, enteredOtp) => {
  const record = otpStore.get(email);
  if (!record) return false;

  const { otp, expiresAt } = record;

  if (Date.now() > expiresAt) {
    otpStore.delete(email); // clean up expired OTP
    return false;
  }

  const isValid = otp === enteredOtp;
  if (isValid) otpStore.delete(email); // consume OTP once used

  return isValid;
};

module.exports = { generateOtp, saveOtp, verifyOtp };
