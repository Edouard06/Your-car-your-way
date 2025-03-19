import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // Remplacez cette logique par votre vérification réelle d'authentification.
    // Ici, nous utilisons une condition fictive pour l'exemple.
    const isAuthenticated: boolean = false; // Modifier à true pour autoriser l'accès

    if (isAuthenticated) {
      return true;
    } else {
      // Redirige vers NotFoundComponent en cas d'accès non autorisé
      return this.router.createUrlTree(['/not-found']);
    }
  }
}
