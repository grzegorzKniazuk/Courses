import { RouterModule, Routes } from '@angular/router';

const routesConfig: Routes = [
  { path: '', redirectTo: 'music', pathMatch: 'full'}, // przekierowanie domyslnej sciezki na inny adress
  { path: '**', redirectTo: 'music'}, // przekierowanie do music jesli sciezka nieznaleziona
];

// konfiguracja routera
export const routerModule = RouterModule.forRoot(routesConfig, {
  // enableTracing: true, // sledzenie zmian
  useHash: false, // dodawanie hasha do adresu, jesli false to history api
});
