// Function to encrypt using a simple reversible method
function encrypt(inputString:string) {
    // Base64 encoding
    const base64Encoded = Buffer.from(inputString).toString('base64');
    
    // Take the first 10 characters
    return base64Encoded.slice(0, 10);
}

// Function to decrypt using the reversible method
function decrypt(encryptedString:string) {
    // Decode from Base64
    const decoded = Buffer.from(encryptedString, 'base64').toString();
    return decoded;
}

// Example usage
const input = "0x4b883991eb7d4f74be72b53ba3aa0e2a93c9c05ae9ba82e1fdc00debfe09ac0f";
const encrypted = encrypt(input);
console.log("Original Input:", input);
console.log("Encrypted:", encrypted);

const decrypted = decrypt(encrypted);
console.log("Decrypted:", decrypted);
