const itemAdd = document.querySelector('[data-item=itemAdd]');
const form = document.querySelector('[data-form=form]');
const itemPrice = document.querySelector('[data-input=itemPrice]');
const itemName = document.querySelector('[data-input=itemName]');
const table = document.querySelector('[data-table=table]');
let idCount = 2;
let editing = false;
let itemEdit = '';

itemAdd.addEventListener('click', () => {
  form.style.display = 'block';
});

table.addEventListener('click', (event) => {
  if (event.toElement.className === 'item_delete') { // удалить
    const itemDeleteId = document.getElementById(event.toElement.id);
    const itemDelete = itemDeleteId.parentNode.parentNode;
    itemDelete.remove();
  }

  if (event.toElement.className === 'item_edit') { // редактировать
    const itemEditId = document.getElementById(event.toElement.id);
    itemEdit = itemEditId.parentNode.parentNode;

    form.style.display = 'block';

    const name = itemEdit.children[0].textContent;
    const price = Number(itemEdit.children[1].textContent);

    itemName.value = name;
    itemPrice.value = price;

    editing = true;
  }
});


let errorMes = false;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const isValid = event.currentTarget.checkValidity();

  if (!isValid) {
    const first = [...form.elements].find(o => !o.validity.valid);
    first.focus();

    if (first.validity.typeMismatch === false) {
      first.customError = `Необходимо ввести данные типа ${first.type}`;
    }

    if (first.validity.rangeUnderflow) { // если true
      first.customError = 'Значение должно быть больше нуля';
    }

    const error = document.createElement('div');
    error.className = 'form-error';
    error.id = 'form-error';
    error.textContent = first.customError;
    first.offsetParent.appendChild(error);
    error.style.top = `${first.offsetTop + first.offsetHeight}px`;

    errorMes = true;
  } else {
    const name = itemName.value;
    const price = itemPrice.value;

    if (editing) {
      itemEdit.children[0].textContent = name;
      itemEdit.children[1].textContent = price;
      editing = false;
    } else {
      const trEl = document.createElement('tr');
      trEl.id = `item_${idCount}`;
      trEl.innerHTML = `<td>${name}</td>
        <td>${price}</td>
        <td class="actions">
          <div class="item_edit" id="edFor_${idCount}">&#9998;</div>
          <div class="item_delete" id="delFor_${idCount}">&#215;</div>
        </td>`;
      table.children[0].appendChild(trEl);
      idCount += 1;
    }

    itemName.value = '';
    itemPrice.value = '';
    form.style.display = 'none';
  }

  event.preventDefault();
});

form.addEventListener('keydown', () => {
  if (errorMes) {
    const error = document.getElementById('form-error');
    error.remove();
    errorMes = false;
  }
});

form.addEventListener('reset', () => {
  form.style.display = 'none';
});
