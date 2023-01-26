import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefetchService {
  private refetchSubject = new Subject<void>();
  
  refetch$ = this.refetchSubject.asObservable();
  
  refetch() {
    this.refetchSubject.next();
  }
}
