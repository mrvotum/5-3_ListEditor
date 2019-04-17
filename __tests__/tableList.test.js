/* eslint-disable no-undef */
import TableList from '../src/js/class_TableList';

test('Creating table', () => {
  const inputTable = new TableList('table');

  const expected = { // ожидает
    itemAdd: document.querySelector('[data-item=itemAdd]'),
    form: document.querySelector('[data-form=form]'),
    itemPrice: document.querySelector('[data-input=itemPrice]'),
    itemName: document.querySelector('[data-input=itemName]'),
    table: document.querySelector('[data-id=table]'),
    idCount: 2,
    editing: false,
    itemEdit: '',
    errorMes: false,
  };

  const received = inputTable; // получает
  expect(received).toEqual(expected); // сравнивает
});
