import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // On récupère le paramètre 'id' de l'URL
    const idParam: string | null = route.paramMap.get('id');

    // Vérifier que l'id existe et est un nombre supérieur à 0
    if (!idParam || isNaN(+idParam) || +idParam <= 0) {
      // Si l'id n'est pas valide, on redirige vers le composant NotFound
      return this.router.createUrlTree(['/not-found']);
    }

    // Sinon, l'accès est autorisé
    return true;
  }
}
