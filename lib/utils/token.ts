/**
 * Decode JWT token to extract payload
 * Note: This is a simple base64 decode, not verification
 * For production, use a proper JWT library
 */
export function decodeJWT(token: string): any {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    const payload = parts[1];
    // Handle base64url encoding (replace - with + and _ with /)
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    // Add padding if needed
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    
    // Use Buffer in Node.js environment
    if (typeof Buffer !== 'undefined') {
      const decoded = Buffer.from(padded, 'base64').toString('utf-8');
      return JSON.parse(decoded);
    } else {
      // Fallback for browser environment (though this should only run server-side)
      const decoded = atob(padded);
      return JSON.parse(decoded);
    }
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

/**
 * Extract shop_id from JWT token
 */
export function getShopIdFromToken(token: string): string | null {
  try {
    const decoded = decodeJWT(token);
    if (!decoded) {
      return null;
    }
    
    // Check various possible fields for shop_id
    return decoded.shop_id || decoded.shopId || decoded.shop || null;
  } catch (error) {
    console.error('Error extracting shop_id from token:', error);
    return null;
  }
}

