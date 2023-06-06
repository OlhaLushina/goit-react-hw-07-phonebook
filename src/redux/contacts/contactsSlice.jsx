import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsOperations';

/* Редюсер при запиті */
const pendingReducer = state => {
  state.isLoading = false;
};

/* Редюсер при помилці */
const rejectedReducer = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

/* Редюсер успішного отримання списку контактів */
const fetchContactsFullfieldReducer = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.items = action.payload;
};

/* Редюсер успішного додавання контакту */
const addContactFullfieldReducer = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.items.push(action.payload);
};

/* Редюсер успішного видалення контакту */
const deleteContactFullfieldReducer = (state, action) => {
  state.isLoading = false;
  state.error = null;
  const index = state.items.findIndex(
    contact => contact.id === action.payload.id
  );
  state.items.splice(index, 1);
};

const contactsSlice = createSlice({
  // Ім'я слайсу
  name: 'contacts',
  // Початковий стан редюсера слайсу
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  // Об'єкт редюсерів, що оброблює зовнішні екшени
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.pending, pendingReducer)
      .addCase(fetchContacts.fulfilled, fetchContactsFullfieldReducer)
      .addCase(fetchContacts.rejected, rejectedReducer)
      .addCase(addContact.pending, pendingReducer)
      .addCase(addContact.fulfilled, addContactFullfieldReducer)
      .addCase(addContact.rejected, rejectedReducer)
      .addCase(deleteContact.pending, pendingReducer)
      .addCase(deleteContact.fulfilled, deleteContactFullfieldReducer)
      .addCase(deleteContact.rejected, rejectedReducer),
});

// Експорт редюсера
export const contactsReducer = contactsSlice.reducer;
