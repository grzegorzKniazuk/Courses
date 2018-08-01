import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {MessageService} from "../services/message.service";
import {Injectable} from "@angular/core";

// globalna obsluga bledow
@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService){};
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse) {
        this.messageService.error('Błąd połączenia ze serwerem.');
      }
      return throwError(error);
    }));
  }

}
