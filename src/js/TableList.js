import EditForm from './EditForm';

export default class TableList {
  constructor(parent) {
    this.itemAdd = document.querySelector('[data-item=itemAdd]');
    this.form = document.querySelector('[data-form=form]');
    this.table = parent;
    this.idCount = 2;
    this.editing = false;
    this.itemEdit = '';
    this.errorMes = false;
    this.editForm = null;
  }

  create() {
    this.addListenerAddItem();
    this.addListenerClickToTable();
  }

  // создать форму для добавления информации
  addListenerAddItem() {
    this.itemAdd.addEventListener('click', () => {
      this.editForm = new EditForm(this.table);
      this.editForm.create('', '');
    });
  }

  addListenerClickToTable() {
    this.table.addEventListener('click', (event) => {
      if (event.toElement.className === 'itemDelete') { // удалить
        const itemDeleteId = document.querySelector(`[data-id=${event.toElement.id}]`);
        const itemDelete = itemDeleteId.parentElement.parentElement;
        itemDelete.remove();
      }

      if (event.toElement.className === 'itemEdit') { // редактировать
        const itemEditId = document.querySelector(`[data-id=${event.toElement.id}]`);
        this.itemEdit = itemEditId.parentNode.parentNode;

        const name = this.itemEdit.children[0].textContent;
        const price = Number(this.itemEdit.children[1].textContent);

        this.editForm = new EditForm(this.table, this.itemEdit);
        this.editing = true;
        this.editForm.create(name, price, this.editing);
      }
    });
  }
}
