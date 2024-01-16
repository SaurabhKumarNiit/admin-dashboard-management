// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private tokenSource = new BehaviorSubject<number>(0);
  currentToken = this.tokenSource.asObservable();

  updateToken(token: number): void {
    this.tokenSource.next(token);
  }
}
