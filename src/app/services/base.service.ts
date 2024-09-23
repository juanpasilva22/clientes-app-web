import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor(
    protected http: HttpClient
  ) {}

  public createParams(object: object): URLSearchParams {
    const params = new URLSearchParams();
    Object.keys(object).forEach(param => {
      if (object[param] != null) {
        params.set(param, object[param]);
      }
    });

    return params;
  }
}
