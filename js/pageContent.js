const listItems = document.querySelectorAll('.list_1');

for (let i = 0; i < listItems.length;i++){
  listItems[i].addEventListener('mouseover', () => {
    listItem = listItems[i].textContent
    listItems[i].textContent = listItems[i].textContent.toUpperCase();
    listItems[i].style.fontFamily =  'Orbitron';
  });
  listItems[i].addEventListener('mouseout', () => {
    listItem = listItems[i].textContent
    listItems[i].textContent = listItems[i].textContent.toLowerCase();
    listItems[i].style.fontFamily= 'Parisienne', cursive;
  });
}

const listDiv = document.querySelector('.list');
const listUl = listDiv.querySelector('ul');
const upBtn = document.querySelector('.up');
const downBtn = document.querySelector('.down');
const removeBtn = document.querySelector('.remove');
const addItemButton = document.querySelector('.add_item')

listUl.addEventListener('click', (event) => {
  if (event.target.tagName == 'BUTTON') {
    if (event.target.classList.contains('remove')) {
      let li = event.target.parentNode;
      let ul = li.parentNode;
      ul.removeChild(li);
    } else if (event.target.classList.contains('up')) {
      let li = event.target.parentNode;
      let prevLi = li.previousElementSibling;
      let ul = li.parentNode;
      if (prevLi) {
        ul.insertBefore(li, prevLi);
      }
    } else if (event.target.classList.contains('down')) {
      let li = event.target.parentNode;
      let nextLi = li.nextElementSibling;
      let ul = li.parentNode;
      if (nextLi) {
        ul.insertBefore(nextLi, li);
      }
    }
  }
});

addItemButton.addEventListener('click', () => {
  let ul = document.getElementsByTagName('ul')[0];
  let li = document.createElement('li'); 
  li.innerHTML = document.querySelector('.input_value').value + '<button class="up btn btn-success" style="">UP</button><button class="down btn btn-light" style="margin:10px;">DOWN</button><button class="remove btn btn-danger">REMOVE</button></li>';
  ul.appendChild(li);
  document.querySelector('.input_value').value = '';
})

const addButtons = li => {
  let up = document.createElement("button");
  up.className = "up btn btn-success";
  up.textContent = "UP";
  up.style.marginLeft = "20px";
  li.appendChild(up)
  let down = document.createElement("button");
  down.className = "down btn btn-light";
  down.textContent = "DOWN";
  down.style.marginLeft = "20px";
  li.appendChild(down)
  let remove = document.createElement("button");
  remove.className = "remove btn btn-danger";
  remove.textContent = "Remove";
  remove.style.marginLeft = "20px";
  li.appendChild(remove)
}

// const listItems1 = document.querySelectorAll('li');
// for (i = 0;i < listItems1.length;i+=1) {
//   addButtons(listItems1[i]);
// }

const lis = listUl.children;
for(let i = 0; i < lis.length;i+=1) {
  addButtons(lis[i])
}

listUl.firstElementChild.style.backgroundColor = "red";
listUl.lastElementChild.style.backgroundColor = "green";

// For checkbox