import { HttpInterceptorFn } from '@angular/common/http';

const TOKEN_KEY = 'token';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
 const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(TOKEN_KEY) : null;
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }
  return next(req);
}; 
