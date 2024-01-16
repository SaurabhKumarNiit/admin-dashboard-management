import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UniqueTokenService {
  private readonly TOKEN_KEY = 'uniqueToken';
  private readonly EXPIRATION_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

  generateUniqueToken(): string {
    const uniqueToken = uuidv4();
    this.storeToken(uniqueToken);
    return uniqueToken;
  }

  private storeToken(token: string): void {
    const expirationTime = Date.now() + this.EXPIRATION_DURATION;
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify({ token, expirationTime }));
  }

  getStoredToken(): string | null {
    const storedData = localStorage.getItem(this.TOKEN_KEY);

    if (storedData) {
      const { token, expirationTime } = JSON.parse(storedData);

      if (expirationTime > Date.now()) {
        // Token is not expired
        return token;
      } else {
        // Token is expired, clear it
        this.clearStoredToken();
      }
    }

    return null;
  }

  clearStoredToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
