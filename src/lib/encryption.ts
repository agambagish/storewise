import crypto from "crypto";

export interface EncryptedData {
  iv: string;
  cipherText: string;
  tag: string;
}

function deriveKey(secret: string): Buffer {
  return crypto.createHash("sha512").update(secret).digest().subarray(0, 32);
}

export function encrypt(plaintext: string, secret: string): EncryptedData {
  const key = deriveKey(secret);

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  let encrypted = cipher.update(plaintext, "utf8", "base64");
  encrypted += cipher.final("base64");

  const authTag = cipher.getAuthTag();

  return {
    iv: iv.toString("base64"),
    cipherText: encrypted,
    tag: authTag.toString("base64"),
  };
}

export function decrypt(payload: EncryptedData, secret: string): string {
  const key = deriveKey(secret);

  const iv = Buffer.from(payload.iv, "base64");
  const authTag = Buffer.from(payload.tag, "base64");

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(payload.cipherText, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
