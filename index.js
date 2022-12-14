function call() {
  let tab = document.getElementById("myTable");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(xhttp.responseText);
      for (let i = 0; i < obj.data.length; i++) {
        let id = obj.data[i].id;
        if(id.indexOf("-")==-1){
        let rwo = `
        <tr style="text-align: center;">
        <td> 
        <span style="float:left" id="${obj.data[i].id}"> 
        ${obj.data[i].id}
        </span>
        <button style="float:right" class="btn btn-primary" onclick="copy(${id},this)">Copy name to clipboard </button>
        </td>
        <td> ${obj.data[i].symbol} </td>
        <td> ${obj.data[i].rank} </td>
        </tr>
        `;
        tab.innerHTML += rwo;
      }
    }
}
  };
  xhttp.open("GET", "https://api.coincap.io/v2/assets", true);
  xhttp.send();
}
call();

function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function copy(id, btn) {
  var copyText = id.innerHTML;
  navigator.clipboard.writeText((copyText + "").trim());
  btn.innerText = "Copied !!";
  btn.classList.add("btn-warning");
  setTimeout(
    (btn) => {
      btn.innerText = "Copy name to clipboard";
      btn.classList.remove("btn-warning");
    },
    2000,
    btn
  );
}
