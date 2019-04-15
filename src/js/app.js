const itemAdd = document.querySelector('[data-item=itemAdd]');
const form = document.querySelector('[data-form=form]');
const itemPrice = document.querySelector('[data-input=itemPrice]');
const itemName = document.querySelector('[data-input=itemName]');
const table = document.querySelector('[data-table=table]');
const save = document.querySelector('[type=submit]');
let idCount = 2;
let editing = false;
let item_edit = '';

itemAdd.addEventListener('click', (event) => {
  form.style.display = 'block';
});

function remove() {
  if (this.parentNode) {
    this.parentNode.removeChild(this);
  }
};

table.addEventListener('click', (event) => {
  if (event.toElement.className === 'item_delete'){ // удалить
    // const alertEl = document.createElement('div');
    // alertEl.className = 'alert';
    // alertEl.innerHTML = `
    //   <p>Вы действительно хотите удалить запись?</p>
    //   <span class="btn yes">Да</span>
    //   <span class="btn no">Нет</span>`;
    // table.children[0].appendChild(alertEl);

    const item_deleteId = document.getElementById(event.toElement.id);
    const item_delete = item_deleteId.parentNode.parentNode;
    item_delete.remove();

    // const alert = document.getElementsByClassName('alert');
    // console.log(alert);
    // alert.addEventListener('click', (event) => {
    //   if (event.toElement.className === 'yes'){
    //     const item_deleteId = document.getElementById(event.toElement.id);
    //     const item_delete = item_deleteId.parentNode.parentNode;
    //     item_delete.remove();
    //   }
    //   if (event.toElement.className === 'no'){
    //     alertEl.remove();
    //   }
    // });
  }

  if (event.toElement.className === 'item_edit'){ // редактировать
    const item_editId = document.getElementById(event.toElement.id);
    item_edit = item_editId.parentNode.parentNode;

    form.style.display = 'block';
    
    const name = item_edit.children[0].textContent;
    const price = Number(item_edit.children[1].textContent);

    itemName.value = name;
    itemPrice.value = price;
    
    editing = true;
  }
});


let errorMes = false;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const isValid = event.currentTarget.checkValidity();

  if (!isValid){
    const first = [...form.elements].find(o => !o.validity.valid);
    first.focus();

    if (first.validity.typeMismatch === false){
      first.customError = `Необходимо ввести данные типа ${first.type}`;
    }

    if (first.validity.rangeUnderflow){ // если true
      first.customError = `Значение должно быть больше нуля`;
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
      item_edit.children[0].textContent = name;
      item_edit.children[1].textContent = price;
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
      idCount++;
    }

    itemName.value = '';
    itemPrice.value = '';
    form.style.display = 'none';
  }

  event.preventDefault();
});

form.addEventListener('keydown', (event) => {
  if (errorMes){
    const error = document.getElementById('form-error');
    error.remove();
    errorMes = false;
  }
});

form.addEventListener('reset', (event) => {
  form.style.display = 'none';
});
