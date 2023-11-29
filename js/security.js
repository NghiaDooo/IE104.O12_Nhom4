function base64UrlEncode(str) {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return atob(str);
}

async function hmacSha256(data, key) {
  const encoder = new TextEncoder();
  const keyBytes = encoder.encode(key);
  const dataBytes = encoder.encode(data);

  const hmacKey = await crypto.subtle.importKey(
    'raw', keyBytes, { name: 'HMAC', hash: { name: 'SHA-256' } }, false, ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', hmacKey, dataBytes);

  return base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));
}

async function encodedJWT(payload, secretKey) {
  const header = {
    "alg": "HS256",
    "type": "JWT"
  };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));

  const signatureInput = encodedHeader + "." + encodedPayload;

  const signature = await hmacSha256(signatureInput, secretKey);

  return `${signatureInput}.${signature}`;
}

async function decodedJwt(jwt, secretKey) {
  const [encodedHeader, encodedPayload, providedSignature] = jwt.split('.');

  const signatureInput = encodedHeader + '.' + encodedPayload;
  const expectedSignature = await hmacSha256(signatureInput, secretKey);

  if (expectedSignature !== providedSignature) {
    throw new Error('Invalid signature');
  }

  const header = JSON.parse(base64UrlDecode(encodedHeader));

  if(header.alg !== "HS256" || header.type !== "JWT"){
    throw new Error('Invalid signature');
  }
  const payload = JSON.parse(base64UrlDecode(encodedPayload));

  return payload;
}

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