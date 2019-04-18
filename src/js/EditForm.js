export default class EditForm {
  constructor(itemEdit) {
    this.table = document.querySelector('[data-id=table]');
    this.itemPrice = document.querySelector('[data-input=itemPrice]');
    this.itemName = document.querySelector('[data-input=itemName]');
    this.editing = null;
    this.itemEdit = itemEdit;
  }

  create(name, price, editing) {
    this.formEl = document.createElement('form');
    this.formEl.className = 'form';
    this.formEl.setAttribute('data-form', 'form');
    this.formEl.setAttribute('novalidate', true);

    this.formEl.innerHTML = `<div class="form-control">
      <label class="label" for="item_name">Название</label>
      <input id="itemName" class="input" type="text" data-input="itemName" autocomplete="off" required value=${name}>
    </div>
    <div class="form-control">
      <label class="label" for="item_price">Стоимость</label>
      <input id="itemPrice" class="input" type="number" min="1" data-input="itemPrice" autocomplete="off" required value=${price}>
    </div>
    <div>
      <button type="submit" class="btn">Сохранить</button>
      <button type="reset" class="btn">Отмена</button>
    </div>`;

    this.table.appendChild(this.formEl);
    this.editing = editing;
    this.addListenerResetForm();
    this.addListenerKeydownForm();
    this.addListenerClickToForm();
  }

  addListenerClickToForm() {
    this.formEl.addEventListener('submit', (event) => {
      event.preventDefault();
      const isValid = event.currentTarget.checkValidity();

      if (!isValid) {
        const first = [...this.formEl.elements].find(o => !o.validity.valid);
        first.focus();

        if (first.validity.typeMismatch === false) {
          first.customError = `Необходимо ввести данные типа ${first.type}`;
        }

        if (first.validity.rangeUnderflow) { // если true
          first.customError = 'Значение должно быть больше нуля';
        }

        const error = document.createElement('div');
        error.className = 'formError';
        error.setAttribute('data-id', 'formError');
        error.textContent = first.customError;
        first.offsetParent.appendChild(error);
        error.style.top = `${first.offsetTop + first.offsetHeight}px`;

        this.errorMes = true;
      } else {
        // так как мы ранее перезаписывали это
        this.itemPrice = document.querySelector('[data-input=itemPrice]');
        this.itemName = document.querySelector('[data-input=itemName]');

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
              <div class="itemEdit" data-id="edFor_${this.idCount}" id="edFor_${this.idCount}">&#9998;</div>
              <div class="itemDelete" data-id="delFor_${this.idCount}" id="delFor_${this.idCount}">&#215;</div>
            </td>`;
          this.table.children[0].appendChild(trEl);
          this.idCount += 1;
        }

        this.itemName.value = '';
        this.itemPrice.value = '';
        this.formEl.remove();
      }

      event.preventDefault();
    });
  }

  addListenerResetForm() {
    this.formEl.addEventListener('reset', () => {
      this.formEl.remove();
    });
  }

  addListenerKeydownForm() {
    this.formEl.addEventListener('keydown', () => {
      if (this.errorMes) {
        const error = document.querySelector('[data-id=formError]');
        error.remove();
        this.errorMes = false;
      }
    });
  }
}
