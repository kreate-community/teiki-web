import { createHash } from "crypto";

type Sha256 = string;

export function hexToByte(text: string): number {
  return parseInt(text, 16);
}

export function byteToHex(byte: number): string {
  return byte.toString(16).padStart(2, "0");
}

export function arrayBufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer), byteToHex).join("");
}

export function hexToArrayBuffer(text: string): ArrayBuffer {
  const matches = text.match(/[0-9a-fA-F]{2}/gi);
  if (!matches) return new ArrayBuffer(0);
  const typedArray = new Uint8Array(matches.map(hexToByte));
  return typedArray.buffer;
}

export async function arrayBufferToSha256(
  buffer: ArrayBuffer
): Promise<Sha256> {
  const bytesOfSha256 = await crypto.subtle.digest("SHA-256", buffer);
  return arrayBufferToHex(bytesOfSha256);
}

export async function blobToSha256(blob: Blob): Promise<Sha256> {
  const reader = blob.stream().getReader();
  const sha256stream = createHash("sha256");
  while (true) {
    const chunk = await reader.read();
    if (!chunk.value) break;
    sha256stream.update(chunk.value);
  }
  return sha256stream.digest("hex");
}
