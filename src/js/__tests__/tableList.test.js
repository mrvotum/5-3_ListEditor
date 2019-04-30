/* eslint-disable no-undef */
import TableList from '../TableList';

test('Creating table', () => {
  const root = document.querySelector('[data-id=widget]');
  const inputTable = new TableList(root);

  const expected = { // ожидает
    itemAdd: document.querySelector('[data-item=itemAdd]'),
    form: document.querySelector('[data-form=form]'),
    table: document.querySelector('[data-id=table]'),
    idCount: 2,
    editing: false,
    itemEdit: '',
    errorMes: false,
    editForm: null,
  };

  const received = inputTable; // получает
  expect(received).toEqual(expected); // сравнивает
});
