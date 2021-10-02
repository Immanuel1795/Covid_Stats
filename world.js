document.getElementById('back-button').addEventListener('click', ()=>{
    window.location.href = "./index.html"
})

fetch("https://disease.sh/v3/covid-19/all")
  .then((resp) => {
    return resp.json();
  })
  .then((data) => {
      console.log(data)
      let totalData = `
        <th scope="col"></th>
        <th scope="col">Total</th>
        <th scope="col">Cases: ${data.cases}</th>
        <th scope="col">Active: ${data.active}</th>
        <th scope="col">Recovered: ${data.recovered}</th>
        <th scope="col">Deaths: ${data.deaths}</th>     
        `;

      let ttable = document.getElementById("ttable");
      let thead = document.getElementById("thead");
      let trw = document.createElement("tr");
      trw.innerHTML = totalData;
      thead.append(trw);
      ttable.append(thead);
  });



fetch("https://corona.lmao.ninja/v2/countries")
  .then((resp) => {
    return resp.json();
  })
  .then((data) => {
    data.forEach((covData, index) => {

      let datas = `
            <td>${index + 1}</td>
            <td>${covData.country}</td>
            <td>
            <img src=${covData.countryInfo.flag} class="img-fluid flags" alt="country_flag">
		      </td>
            <td>${covData.cases}</td>
            <td>${covData.active}</td>
            <td>${covData.recovered}</td>
            <td>${covData.deaths}</td>      
        `;

      let table = document.getElementById("covid-table");
      let tbody = document.getElementById("tbody");
      let tr = document.createElement("tr");
      tr.innerHTML = datas;
      tbody.append(tr);
      table.append(tbody);
    });
  });



function searchInput(){
  let filter = document.getElementById('search-input').value.toUpperCase();

  let searchStateTable = document.getElementById('covid-container');
  let tr = searchStateTable.getElementsByTagName('tr');

  for(var i=0; i<tr.length; i++){
    let td = tr[i].getElementsByTagName('td')[1];

    if(td){
      let textValue  = td.textContent || td.innerHTML;
      if(textValue.toUpperCase().indexOf(filter) > -1){
        tr[i].style.display ="";
      }else {
        tr[i].style.display = 'none';
      }
    }
  }


}
