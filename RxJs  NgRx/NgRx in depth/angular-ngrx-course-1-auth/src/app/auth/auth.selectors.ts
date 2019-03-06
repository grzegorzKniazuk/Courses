import { createSelector } from '@ngrx/store';

export const selectAuthState = state => state.auth; // feature selector

export const isLoggedIn = createSelector( // selector function - prawidlowe wyciaganie wartosci ze stora, roznica jest taka ze na subscribe mozemy dostac wartosci ktore sie nie roznia od poprzednich
  selectAuthState, // feature selector, one or more
  auth => !auth.loggedIn // projection function
);

export const isLoggedOut = createSelector( // selector function
  isLoggedIn, // selektor, poprzedni, mozna laczyc
  loggedIn => !loggedIn // funkcja przyjmuje output z ostatniego selektora
);
