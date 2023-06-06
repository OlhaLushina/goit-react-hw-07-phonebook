import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Item, Button } from './ContactItem.styled';
import { deleteContact } from 'redux/contacts/contactsOperations';

export const ContactItem = ({ contact: { id, name, phone } }) => {
  const dispatch = useDispatch();

  return (
    <Item>
      {name} {phone}{' '}
      <Button onClick={() => dispatch(deleteContact(id))}>Delete</Button>
    </Item>
  );
};

/* Опис типів props */
ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};
