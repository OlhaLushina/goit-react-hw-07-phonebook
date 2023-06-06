import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
export const selectFilter = state => state.filter;

/* Фільтрація контактів (з мемоізацією) */
export const selectVisibleContacts = createSelector(
  // Масив вхідних селекторів
  [selectContacts, selectFilter],
  // Функція перетворювач
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(item =>
      item.name.toLowerCase().includes(normalizedFilter)
    );
    return visibleContacts;
  }
);

/*
// Фільтрація контактів (без мемоізації)
export const selectVisibleContacts = state => {
  const contacts = selectContacts(state);
  const filter = selectFilter(state);
  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(item =>
    item.name.toLowerCase().includes(normalizedFilter)
  );
  return visibleContacts;
};
*/
