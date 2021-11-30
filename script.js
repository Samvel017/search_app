let request = 'https://mockserverkn.herokuapp.com/contacts';
const pagList = document.querySelector('.pagination');
const showList = document.querySelector('.list');
let xhr = new XMLHttpRequest();

xhr.open('GET', request);

xhr.onload = () => {
  let array = JSON.parse(xhr.response);

  paginationBtn(array);
  let btnPag = document.querySelectorAll('.pagination__btn');

  btnPag.forEach((elem, i) => {
    elem.addEventListener('click', () => {
      smartList(i, array);
      addClass(elem, btnPag);
    });
  });

  smartList(0, array);

  // ---------------- SEARCH -------------------

  let searchUsers = document.querySelector('#search-users');
  let searchVal;

  searchUsers.addEventListener('keyup', function () {
    searchVal = this.value.toLowerCase();
    console.log(searchVal);
    let newArr;
    newArr = [];
    for (let j = 0; j < array.length; j++) {
      if (!searchVal || array[j].name.toLowerCase().indexOf(searchVal) > -1) {
        newArr.push(array[j]);
      }
    }
    pagList.innerHTML = '';
    for (let i = 0; i < newArr.length / 24; i++) {
      let btn = document.createElement('button');
      btn.classList.add('pagination__btn');
      if (i == 0) {
        btn.classList.add('pagination__btn-active');
      }
      btn.innerHTML = `${i + 1}`;
      pagList.append(btn);
      btn.addEventListener('click', () => {
        let btnPag = document.querySelectorAll('.pagination__btn');
        smartList(i, newArr);
        addClass(btn, btnPag);
      });
    }
    smartList(0, newArr);
    console.log(newArr);
  });

  // ---------------------------------------------

  btnPag[0].classList.add('pagination__btn-active');

  // -------------- Dark Mode Toggler -----------------

  let app = document.querySelector('#app');
  let modeToggle = document.querySelector('#mode-toggle');
  modeToggle.addEventListener('click', () => {
    modeToggle.classList.toggle('dark');
    if (modeToggle.classList.contains('dark')) {
      modeToggle.innerHTML = `<i class="fas fa-sun"></i>`;
      app.classList.add('dark');
      document.body.style.background = '#212121';
    } else {
      modeToggle.innerHTML = `<i class="fas fa-moon"></i>`;
      app.classList.remove('dark');
      document.body.style.background = '#fffbeb';
    }
  });

  // --------------------------------------------------
};

xhr.send();

function paginationBtn(arr, size = 24) {
  let btn = '';

  for (let i = 0; i < arr.length / size; i++) {
    btn += `<button class='pagination__btn'>${i + 1}</button>`;
  }
  pagList.innerHTML = btn;
}

function smartList(page, arr, size = 24) {
  let arrayList = [];
  arrayList = arr.slice().splice(page * size, size);

  showList.innerHTML = '';
  for (let i = 0; i < arrayList.length; i++) {
    let item = document.createElement('div');
    item.classList.add('list__item');
    item.innerHTML = `
      <img src="${arrayList[i].url}" alt="">
      <span class="list__data">${arrayList[i].name}</span>
    `;
    showList.append(item);
    item.addEventListener('click', () => {
      let modalBg = document.createElement('div');
      modalBg.classList.add('modal-bg');
      modalBg.innerHTML = `
        <div class="modal">
          <div class="sim-img">
            <img src="${arrayList[i].url}" alt="" />
          </div>
          <div class="sim-info">
            <h3>${arrayList[i].id}</h3>
            <h2>${arrayList[i].name}</h2>
          </div>
        </div>
      `;
      document.body.append(modalBg);
      setTimeout(() => {
        modalBg.classList.add('show');
      }, 10);
      modalBg.addEventListener('click', (e) => {
        if (e.target == modalBg && e.target != modalBg.firstElementChild) {
          modalBg.classList.remove('show');
          setTimeout(() => {
            modalBg.remove();
          }, 300);
        }
      });
    });
  }
}

function addClass(btnElem, prevBtn) {
  prevBtn.forEach((elem) => elem.classList.remove('pagination__btn-active'));
  btnElem.classList.add('pagination__btn-active');
}

let arrowUp = document.querySelector('.arrow-up');
let arrowDown = document.querySelector('.arrow-down');

arrowUp.addEventListener('click', () => {
  window.scrollTo(0, 0);
});
arrowDown.addEventListener('click', () => {
  window.scrollTo(0, document.body.scrollHeight);
});
window.addEventListener('scroll', function () {
  var x = window.pageYOffset;
  if (x > +document.body.offsetHeight/2) {
    arrowUp.classList.add('active');
    arrowDown.classList.remove('active');
  } else if (x < +document.body.offsetHeight/2) {
    arrowDown.classList.add('active');
    arrowUp.classList.remove('active');
  }
  else {
    arrowDown.classList.remove('active');
    arrowUp.classList.remove('active');
  }
});
