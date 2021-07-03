document.getElementById('state-table').classList.add('hide');
document.getElementById('back-button').classList.add('hide');
document.getElementById('forward-button').addEventListener('click', ()=>{
  window.location.href= "./world.html";
})

fetch("https://api.covid19india.org/data.json")
  .then((resp) => {
    return resp.json();
  })
  .then((data) => {
    data.statewise.forEach((covData, index) => {
      let totalData = `
        ${
          index === 0
            ? `
        <th scope="col"></th>
        <th scope="col">Total</th>
        <th scope="col">Confirmed: ${covData.confirmed}</th>
        <th scope="col">Active: ${covData.active}</th>
        <th scope="col">Recovered: ${covData.recovered}</th>
        <th scope="col">Deaths: ${covData.deaths}</th>
            `
            : ""
        }         
        `;

      let ttable = document.getElementById("ttable");
      let thead = document.getElementById("thead");
      let trw = document.createElement("tr");
      trw.innerHTML = totalData;
      thead.append(trw);
      ttable.append(thead);

      let datas = `
        ${
          index !== 0
            ? `
            <td>${index}</td>
            <td>${covData.state}</td>
            <td>${covData.confirmed}</td>
            <td>${covData.active}</td>
            <td>${covData.recovered}</td>
            <td>${covData.deaths}</td>
            <td><button type="button" class="btn btn-info text-center" onclick="viewStates('${covData.state}');">Distict Stats</button></td>  
            `
            : ""
        }         
        `;

      let table = document.getElementById("covid-table");
      let tbody = document.getElementById("tbody");
      let tr = document.createElement("tr");
      tr.innerHTML = datas;
      tbody.append(tr);
      table.append(tbody);
    });
  });

function viewStates(state) {
    document.getElementById('search-input').value = "";
    document.getElementById('back-button').classList.remove('hide');
    document.getElementById('state-table').classList.remove('hide');
    document.getElementById('covid-table').classList.add('hide');
    document.getElementById('forward-button').classList.add('hide');

    document.getElementById('back-button').addEventListener('click', ()=>{
    window.location.reload();
    })

  fetch("https://api.covid19india.org/state_district_wise.json")
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      var count = 0;
      console.log(data[state]);
      for (i in data[state].districtData) {
        count++;

        let stateDatas = `
            <td>${count}</td>
            <td>${i}</td>
            <td>${data[state].districtData[i].confirmed}</td>
            <td>${data[state].districtData[i].active}</td>
            <td>${data[state].districtData[i].recovered}</td>
            <td>${data[state].districtData[i].deceased}</td>          
        `;


        let table = document.getElementById("state-table");
        let tbody = document.getElementById("state-body");
        let tr = document.createElement("tr");
        tr.innerHTML = stateDatas;
        tbody.append(tr);
        table.append(tbody);
      }
    });
}

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
