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
  let razem = 0;
  let notFull = false;  // zmienna potrzebna do prawidłowego sprawdzania warunków (patrz linijka 60 i 63)

  document.forms.myform.onsubmit = function (event) {
    for (const element of document.getElementsByTagName('form')) {
      if(element.value == undefined) {
        notFull = true;
        alert("Nie podano wszystkich wymaganych wartości!")
      }
    }
    if(notFull) {
      notFull = false;  // taki zabieg aby ominąć wstawienie pustego wiersza do tabeli
    }
    else if(isNaN(document.getElementById("price").value) & isNaN(document.getElementById("quantity").value)) {
      alert("Podana cena i ilość nie są liczbami!")
    }
    else if (isNaN(document.getElementById("price").value)) {
      alert("Podana cena nie jest liczbą!")
    }
    else if (isNaN(document.getElementById("quantity").value)) {
      alert("Podana ilość nie jest liczbą!")
    }

    else {
      /// local storage
      rowQuantity += 1;   // ilość wierszy (indeks)
      localStorage.setItem("nazwa", document.getElementById("lname").value);
      localStorage.setItem("ilosc", document.getElementById("quantity").value);
      localStorage.setItem("cena", document.getElementById("price").value);

      let name = localStorage.getItem("nazwa");
      let quantity = localStorage.getItem("ilosc");
      let price = localStorage.getItem("cena");

      // tworzenie nowego obiektu
      let paragon = new Paragon(name, quantity, price);
      tablicaObiektow.push(paragon);

      // dodawanie sumy ceny elementow do tabeli razem
      let sumResult = paragon.countSum();
      razem = 0;
      tabTotal.push(sumResult);

      for (let i = 0; i < tabTotal.length; i++) {
        razem += tabTotal[i];
      }

      paragon.addToParagon(razem, rowQuantity);
      // console.log(paragon);
      console.log(tabTotal);
      console.log(tablicaObiektow);

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
    razem = 0;
    for (let i = 0; i < tabTotal.length; i++) {
      razem += tabTotal[i];
    }
    document.getElementById("razem").innerHTML = razem.toFixed(2) + " zł";
  });
}
submitButton();
