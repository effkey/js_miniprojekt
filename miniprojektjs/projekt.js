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
    var cellId = row.insertCell();
    cellId.innerHTML = numberofClick;
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
function submitButton() {
  // var table = document.getElementById('btab');

  let tabTotal = [];
  let rowQuantity = 0;
  let notFull = false; // zmienna potrzebna do prawidłowego sprawdzania warunków (patrz linijka 60 i 63)
  let razem = 0;

  if (localStorage.getItem("razem") == "0") {   // tutaj dobrze, bo localstorage przechowuje stringi!!
    razem = 0;
  }
  else {
    razem = parseInt(localStorage.getItem("razem")) 
  }
  localStorage.setItem("razem", 0) // aby zapisywac razem w localstorage
  

  document.forms.myform.onsubmit = function (event) {
    for (const element of document.getElementsByTagName("input")) {
      if (element.value == "") {
        notFull = true;
        alert("Nie podano wszystkich wymaganych wartości!");
        break;
      }
    }
    if (notFull) {
      notFull = false; // taki zabieg aby ominąć wstawienie pustego wiersza do tabeli
    } 
    else if (
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
      tabTotal.push(sumResult);

      for (let i = 0; i < tabTotal.length; i++) {
        razem += tabTotal[i];
        localStorage.setItem("razem", razem)
      }

      paragon.addToParagon(razem, rowQuantity);
      // // console.log(paragon);
      // console.log(tabTotal);
      // console.log(tablicaObiektow);

      localStorage.setItem("tablicaa", JSON.stringify(tablicaObiektow));
      event.preventDefault();
    }
  };

  var buttonUsun = document.getElementById("usun");
  buttonUsun.addEventListener("click", (event) => {
    // usuwanie ostatniego wiersza z tabeli
    var table = document.getElementById("tab");
    var rowCount = table.rows.length;
    rowCount = rowCount - 1;
    if (rowCount != 1) {
      table.deleteRow(rowCount - 1);
    }
    console.log(tabTotal);
    tabTotal.pop();

    //ustawienie odpowidniej wsartosci 'razem' po usunieciu
    // razem = 0;
    localStorage.setItem("razem", 0)
    for (let i = 0; i < tabTotal.length; i++) {
      razem += tabTotal[i];
      localStorage.setItem("razem", razem)
    }
    document.getElementById("razem").innerHTML = localStorage.getItem("razem") + " zł";
  });
}
function dodajdopar(raz) {
  let tab = JSON.parse(localStorage.getItem("tablicaa") || "[]");
  console.log(tab);
  for (let i = 0; i < tab.length; i++) {
    var table = document.getElementById("btab");
    var row = table.insertRow();
    var cellId = row.insertCell();
    cellId.innerHTML = i;
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
    this.razem = raz;
    document.getElementById("razem").innerHTML = localStorage.getItem("razem") + " zł";
  }
}
dodajdopar(parseInt(localStorage.getItem("razem")));
submitButton();

// localStorage.clear()