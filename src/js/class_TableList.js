export default class TableList {
  constructor(parent) {
    this.itemAdd = document.querySelector('[data-item=itemAdd]');
    this.form = document.querySelector('[data-form=form]');
    this.itemPrice = document.querySelector('[data-input=itemPrice]');
    this.itemName = document.querySelector('[data-input=itemName]');
    this.table = document.querySelector(`[data-id=${parent}]`);
    this.idCount = 2;
    this.editing = false;
    this.itemEdit = '';
    this.errorMes = false;
  }

  create() {
    // this.button.setAttribute('data-content', this.data);

    this.addListenerAddItem();
    this.addListenerClickToTable();
    this.addListenerClickToForm();
    this.addListenerKeydownForm();
    this.addListenerResetForm();
  }

  addListenerAddItem() {
    this.itemAdd.addEventListener('click', () => {
      this.form.style.display = 'block';
    });
  }

  addListenerClickToTable() {
    this.table.addEventListener('click', (event) => {
      if (event.toElement.className === 'item_delete') { // удалить
        const itemDeleteId = document.getElementById(event.toElement.id);
        const itemDelete = itemDeleteId.parentElement.parentElement;
        itemDelete.remove();
      }

      if (event.toElement.className === 'item_edit') { // редактировать
        const itemEditId = document.getElementById(event.toElement.id);
        this.itemEdit = itemEditId.parentNode.parentNode;

        this.form.style.display = 'block';

        const name = this.itemEdit.children[0].textContent;
        const price = Number(this.itemEdit.children[1].textContent);

        this.itemName.value = name;
        this.itemPrice.value = price;

        this.editing = true;
      }
    });
  }

  addListenerClickToForm() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      const isValid = event.currentTarget.checkValidity();

      if (!isValid) {
        const first = [...this.form.elements].find(o => !o.validity.valid);
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

        this.errorMes = true;
      } else {
        const name = this.itemName.value;
        const price = this.itemPrice.value;

        if (this.editing) {
          this.itemEdit.children[0].textContent = name;
          this.itemEdit.children[1].textContent = price;
          this.editing = false;
        } else {
          const trEl = document.createElement('tr');
          trEl.id = `item_${this.idCount}`;
          trEl.innerHTML = `<td>${name}</td>
            <td>${price}</td>
            <td class="actions">
              <div class="item_edit" id="edFor_${this.idCount}">&#9998;</div>
              <div class="item_delete" id="delFor_${this.idCount}">&#215;</div>
            </td>`;
          this.table.children[0].appendChild(trEl);
          this.idCount += 1;
        }

        this.itemName.value = '';
        this.itemPrice.value = '';
        this.form.style.display = 'none';
      }

      event.preventDefault();
    });
  }

  addListenerKeydownForm() {
    this.form.addEventListener('keydown', () => {
      if (this.errorMes) {
        const error = document.getElementById('form-error');
        error.remove();
        this.errorMes = false;
      }
    });
  }

  addListenerResetForm() {
    this.form.addEventListener('reset', () => {
      this.form.style.display = 'none';
    });
  }
}
