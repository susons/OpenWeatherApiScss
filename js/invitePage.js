document.addEventListener('DOMContentLoaded', () => {
  const div = document.createElement('div');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  const form = document.getElementById('input_name');
  const input = form.querySelector('input');
  const ul = document.getElementById('invitedList');
  const invitees = document.querySelector('.people_list');
  const people = document.querySelector('.people_container')
  const error = document.querySelector('.errors');
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
    const createElements = (element, property, value, hasClass, classValue) => {
      const created_element = document.createElement(element);
      created_element[property] = value;
      if (typeof hasClass === 'string') {
        created_element.className = classValue;
      }
      return  created_element
    }
    const li = document.createElement('li');
    const span = createElements('span', 'innerHTML', text);
    const label = createElements('label', 'innerHTML', 'Confirmed','', 'confirmed');
    const checkbox = createElements('input', 'type', 'checkbox', '', 'attending');
    const editButton = createElements('button', 'innerHTML', 'edit', '', 'edit_button');
    const removeButton = createElements('button', 'innerHTML', 'remove', '', 'remove_button');
    li.appendChild(span);
    label.appendChild(checkbox);
    li.appendChild(label);
    label.appendChild(editButton);
    label.appendChild(removeButton);

    return li;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    if (text === '') {
      displayError(text);
    } else {
    input.placeholder = "Enter Name!";
    input.value = ''
    const li = createLi(text);
    ul.appendChild(li);
    }
  });

  const displayError = (param) => {
    error.classList.add('text');
    input.classList.add('red_border');
    setTimeout(removeError, 5000);
  }

  const removeError = () => {
    error.classList.remove('text');
    input.classList.remove('red_border');
  };


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
      nameActions = {
        remove: () => {ul.removeChild(li);},
        edit: () => {
          const span = li.firstElementChild;
          const input = document.createElement('input');
          input.type = 'text';
          input.value = span.innerText;
          li.insertBefore(input,span);
          li.removeChild(span);
          button.textContent = 'save';
        },
        save: () => {
          const input = li.firstElementChild;
          const span = document.createElement('span');
          span.innerText = input.value;
          li.insertBefore(span, input);
          li.removeChild(input);
          button.textContent = 'edit';
        },
      };
      nameActions[button.innerText]();
    }
  });
})