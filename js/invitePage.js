const div = document.createElement('div');
const label = document.createElement('label');
const checkbox = document.createElement('input');
const form = document.getElementById('input_name');
const input = form.querySelector('input');
const ul = document.getElementById('invitedList');
const invitees = document.querySelector('.people_list');
const people = document.querySelector('.people_container')
label.textContent = 'hide who havent responded';
checkbox.type = 'checkbox';
div.className = "wontAttend"
div.appendChild(label);
div.appendChild(checkbox);

people.insertBefore(div,invitees);

checkbox.addEventListener('change', e => {
  const isChecked = e.target.checked;
  const lis = ul.children;
  if (isChecked) {
    for (let i = 0; i < lis.length; i+=1) {
      let li = lis[i];
      if (li.className !== 'responded')  {
        li.style.display = 'none';
      }
    }
  } else {
    for (let i = 0; i < lis.length; i+=1) {
      let li = lis[i];
      li.style.display = '';
    }
  }
})

const createLi = (text) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.innerHTML = text;
  li.appendChild(span);
  const label = document.createElement('label');
  label.innerText = 'Confirmed';
  label.className = 'confirmed'
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = "attending"
  label.appendChild(checkbox);
  li.appendChild(label);
  const editButton = document.createElement('button');
  editButton.innerHTML = 'Edit';
  editButton.className = 'edit_button';
  label.appendChild(editButton);
  const removeButton = document.createElement('button');
  removeButton.innerHTML = 'remove';
  removeButton.className = 'remove_button';
  label.appendChild(removeButton);
  return li;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = "Enter Name!";
  const li = createLi(text);
  ul.appendChild(li);
});

ul.addEventListener('change', (e) => {
  const checkbox = event.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode;

  if (checked) {
    listItem.className = 'responded'
  } else {
    listItem.className = ''
  }

});

ul.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    const li = e.target.parentNode.parentNode;
    const ul = li.parentNode;

    if (button.textContent === 'remove') {
      ul.removeChild(li);
    } else if (button.textContent === 'Edit') {
      const span = li.firstElementChild;
      const input = document.createElement('input');
      input.type = 'text';
      input.value = span.innerText;
      li.insertBefore(input,span);
      li.removeChild(span);
      button.textContent = 'save';
    } else if (button.textContent === 'save') {
      const input = li.firstElementChild;
      const span = document.createElement('span');
      span.innerText = input.value;
      li.insertBefore(span, input);
      li.removeChild(input);
  
      button.textContent = 'Edit';
    }
  }
});