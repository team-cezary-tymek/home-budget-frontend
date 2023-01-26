import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CommunicationService {
    private messageSource = new BehaviorSubject<string>("default")
    currentMessage = this.messageSource.asObservable();

    constructor() { }
}
