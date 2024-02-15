// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private tokenSource = new BehaviorSubject<string>('');
  currentToken = this.tokenSource.asObservable();

  updateToken(token: string): void {
    this.tokenSource.next(token);
  }
}
