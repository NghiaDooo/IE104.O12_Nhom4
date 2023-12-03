
async function hashPassword(password, salt = crypto.getRandomValues(new Uint8Array(16))) {
  // Convert password and salt to ArrayBuffer
  const encoder = new TextEncoder();
  const passwordData = encoder.encode(password);
  const saltData = salt.buffer;
  // Concatenate password and salt
  const concatenatedBuffer = new Uint8Array(passwordData.byteLength + saltData.byteLength);
  concatenatedBuffer.set(new Uint8Array(passwordData), 0);
  concatenatedBuffer.set(new Uint8Array(saltData), passwordData.byteLength);

  try {
    // Hash the concatenated data with SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', concatenatedBuffer);

    // Convert the hashed result and salt to hex
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    const saltHex = Array.from(salt).map(byte => byte.toString(16).padStart(2, '0')).join('');
    return {
      hashedPassword,
      salt: saltHex,
    };
  } catch (error) {
    throw error;
  }
}

async function verifyPassword(enteredPassword, hashedPassword, salt) {
  try {
    // Convert entered password and salt to ArrayBuffer
    const encoder = new TextEncoder();
    const enteredPasswordData = encoder.encode(enteredPassword);
    const saltData = new Uint8Array(salt.match(/.{1,2}/g).map(byte => parseInt(byte, 16))).buffer;

    // Concatenate entered password and salt
    const concatenatedBuffer = new Uint8Array(enteredPasswordData.byteLength + saltData.byteLength);
    concatenatedBuffer.set(new Uint8Array(enteredPasswordData), 0);
    concatenatedBuffer.set(new Uint8Array(saltData), enteredPasswordData.byteLength);

    // Hash the concatenated data with SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', concatenatedBuffer);

    // Convert the hashed result to hex
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const enteredHashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    // Compare the entered hashed password with the stored hashed password
    return enteredHashedPassword === hashedPassword;
  } catch (error) {
    throw error;
  }
}

function filterXSS(input) {
  return input.replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}