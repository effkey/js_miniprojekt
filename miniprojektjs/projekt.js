class Paragon {
  LP;
  nazwa;
  ilosc;
  cena;
  suma;
  razem;
  constructor(nazwa, ilosc, cena) {
    this.nazwa = nazwa;
    this.ilosc = ilosc;
    this.cena = cena;
  }

  addToParagon(raz, numberofClick) {
    var table = document.getElementById("btab");
    var row = table.insertRow();
    row.setAttribute("id", numberofClick);
    var cellId = row.insertCell();
    cellId.innerHTML = numberofClick;
    this.LP = numberofClick;
    var cellName = row.insertCell();
    cellName.innerHTML = this.nazwa;
    var cellQuantity = row.insertCell();
    cellQuantity.innerHTML = this.ilosc;

    cellName.innerHTML = this.nazwa;
    var cellPrice = row.insertCell();
    cellPrice.innerHTML = this.cena + " zł";

    cellName.setAttribute("contentEditable", "true");
    cellQuantity.setAttribute("contentEditable", "true");
    cellPrice.setAttribute("contentEditable", "true");

    this.countSum();
    var cellSum = row.insertCell();
    cellSum.innerHTML = this.suma.toFixed(2) + " zł";

    this.razem = raz;

    document.getElementById("razem").innerHTML = this.razem.toFixed(2) + " zł";
  }
  countSum() {
    this.suma = this.ilosc * this.cena;
    return this.suma;
  }
}

let liczba = document.getElementById("liczba");
let tablicaObiektow = [];
function submitButton(razemm, rowQuantity, tablica) {
  // var table = document.getElementById('btab');

  let tabTotal = [];
  // let rowQuantity = 0;
  let razem1 = 0;
  let notFull = false; // zmienna potrzebna do prawidłowego sprawdzania warunków (patrz linijka 60 i 63)

  document.forms.myform.onsubmit = function (event) {
    for (const element of document.getElementsByClassName("inputParagon")) {
      if (element.value == "") {
        notFull = true;
        alert("Nie podano wszystkich wymaganych wartości!");
        break;
      }
    }
    if (notFull) {
      notFull = false; // taki zabieg aby ominąć wstawienie pustego wiersza do tabeli
    } else if (
      isNaN(document.getElementById("price").value) &
      isNaN(document.getElementById("quantity").value)
    ) {
      alert("Podana cena i ilość nie są liczbami!");
    } else if (isNaN(document.getElementById("price").value)) {
      alert("Podana cena nie jest liczbą!");
    } else if (isNaN(document.getElementById("quantity").value)) {
      alert("Podana ilość nie jest liczbą!");
    } else {
      /// local storage
      rowQuantity += 1; // ilość wierszy (indeks)

      // tworzenie nowego obiektu
      let paragon = new Paragon(
        document.getElementById("lname").value,
        document.getElementById("quantity").value,
        document.getElementById("price").value
      );
      tablicaObiektow.push(paragon);

      // dodawanie sumy ceny elementow do tabeli razem
      let sumResult = paragon.countSum();
      razem1 = 0;
      tabTotal.push(sumResult);

      for (let i = 0; i < tabTotal.length; i++) {
        razem1 += tabTotal[i];
      }

      razem1 += razemm;

      paragon.addToParagon(razem1, rowQuantity);
      // // console.log(paragon);
      // console.log(tabTotal);
      // console.log(tablicaObiektow);

      event.preventDefault();
    }
  };

  let ustawLocalStorerazem = 0;

  var buttonUsun = document.getElementById("usun");
  buttonUsun.addEventListener("click", (event) => {
    // usuwanie ostatniego wiersza z tabeli
    var table = document.getElementById("tab");
    var rowCount = table.rows.length;
    rowCount = rowCount - 1;
    if (rowCount != 1) {
      table.deleteRow(rowCount - 1);
      tablicaObiektow.pop(rowCount - 1);
    }
    console.log(tabTotal);
    tabTotal.pop();

    //ustawienie odpowidniej wsartosci 'razem' po usunieciu
    razem1 = 0;
    razem1 += razemm;
    for (let i = 0; i < tabTotal.length; i++) {
      razem1 += tabTotal[i];
    }

    // jezeli nie ma wierszy ustaw wartosc razem na 0
    if (razem1 === 0) {
      razem1 = 0;
    }

    localStorage.setItem("tablicaa", JSON.stringify(tablicaObiektow));

    // ta czesc sluzy do zintegrowania wierszy aktualnej wartosci razem z localstorem
    if (razem1 <= razemm) {
      console.log(tablica);

      if (ustawLocalStorerazem != tablica.length - 1) {
        razem1 -= tablica[ustawLocalStorerazem].razem;
        ustawLocalStorerazem += 1;
      } else {
        razem1 = 0;
      }
    }
    document.getElementById("razem").innerHTML = razem1.toFixed(2) + " zł";
  });
}

// funkcja dodaje wszystkie wiersze z localstorage do tabeli
// tutaj bylem
function dodajdopar() {
  let tab = JSON.parse(localStorage.getItem("tablicaa") || "[]");
  console.log(tab);
  for (let i = 0; i < tab.length; i++) {
    var table = document.getElementById("btab");
    var row = table.insertRow();
    var cellId = row.insertCell();
    cellId.innerHTML = tab[i].LP;
    var cellName = row.insertCell();
    cellName.innerHTML = tab[i].nazwa;
    var cellQuantity = row.insertCell();
    cellQuantity.innerHTML = tab[i].ilosc;
    var cellPrice = row.insertCell();
    cellPrice.innerHTML = tab[i].cena + " zł";
    cellName.setAttribute("contentEditable", "true");
    cellQuantity.setAttribute("contentEditable", "true");
    cellPrice.setAttribute("contentEditable", "true");
    let suma = tab[i].ilosc * tab[i].cena;
    var cellSum = row.insertCell();
    cellSum.innerHTML = suma.toFixed(2) + " zł";
  }
  let razeem = tab[tab.length - 1].razem;
  document.getElementById("razem").innerHTML = razeem.toFixed(2) + " zł";
}

function zwrocRazem() {
  let tab = JSON.parse(localStorage.getItem("tablicaa") || "[]");
  if (tab[tab.length - 1]) {
    return tab[tab.length - 1].razem;
  } else {
    return 0;
  }
}
//funkcja łączy LP pomiędzy aktualnymi dodawanymi wiarszami a localStorage
function zwrocLP() {
  let tab = JSON.parse(localStorage.getItem("tablicaa") || "[]");
  if (tab[tab.length - 1]) {
    return tab[tab.length - 1].LP;
  } else {
    return 0;
  }
}

function zwrocLocalStoreTab() {
  let tab = JSON.parse(localStorage.getItem("tablicaa") || "[]");
  return tab;
}

// funkcja czysci localStorage
function clearLocalStorage() {
  var buttonWyczyscLocal = document.getElementById("wyczysc");
  buttonWyczyscLocal.addEventListener("click", (event) => {
    localStorage.clear();
  });
}

/// odpowiednie zintegorwanie localstorega z zbierana tablica obiektow
// zbiera wszystkie utworzone obiekty z localstorage
let tablicaPomocnicza = [];
var buttonZapisz = document.getElementById("zapisz");
let numberClick = 0;
buttonZapisz.addEventListener("click", (event) => {
  a = JSON.parse(localStorage.getItem("tablicaa")) || [];
  for (let i = 0; i < tablicaObiektow.length; i++) {
    a.push(tablicaObiektow[i]);
  }
  localStorage.setItem("tablicaa", JSON.stringify(a));
  console.log(a);
});

/// zamienianie wartosci po przez inputy
var buttonZmien = document.getElementById("zatwierdz");
buttonZmien.addEventListener("click", (event) => {
  var btab = document.getElementById("btab");
  table = btab.getElementsByTagName("tr");

  let zamien1 = document.getElementById("zamien1").value;
  let zamien2 = document.getElementById("zamien2").value;

  // console.log(zamien1);
  // console.log(zamien2);
  // console.log(table[zamien1]);
  // console.log(table[zamien2]);

  var idrow1 = document.getElementById(zamien1);
  var idrow2 = document.getElementById(zamien2);
  console.log(idrow1);
  console.log(idrow2);
  btab.insertBefore(idrow1, idrow2);
});

///tutaj bylem
let razemm = zwrocRazem();
let lp2 = zwrocLP();
let tablica = zwrocLocalStoreTab();
submitButton(razemm, lp2, tablica);
clearLocalStorage();
dodajdopar();
