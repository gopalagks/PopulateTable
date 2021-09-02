// var url='https://jsonplaceholder.typicode.com/todos';
// typeof(url);
 function getApi(){
   var loadUrl = document.getElementById("search").value;
    fetch(`${loadUrl}`)
  .then(response => response.json())
  .then(data => {
      console.log(data);
      var sheet_data = new Array();
      var key = new Array();
      for (let value of Object.keys(data[0])) {
            key.push(value);
     }
     sheet_data.push(key);
      for(var i=0; i < data.length; i++){
          var d = data[i];
          var val = new Array();
          for (let value of Object.values(d)) {
            val.push(value);
        }
        sheet_data.push(val);
      }

      var copyData =ArrayCopy(sheet_data);
      createTable(sheet_data);
      btnEdit(sheet_data.length);
      createTableCopy(copyData);
});
    
}

function toggleFileTOUrl(){
   document.getElementById("url_body").style.display="block";

   document.getElementById("excel_file").style.display="none";

}

function toggleUrlToFile(){
    document.getElementById("url_body").style.display="none";
 
    document.getElementById("excel_file").style.display="block";

    const excel_file = document.getElementById('excel_file');


excel_file.addEventListener('change', (event) => {

    if(!['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(event.target.files[0].type))
    {
        document.getElementById('excel_data').innerHTML = '<div class="alert alert-danger">Only .xlsx or .xls file format are allowed</div>';

        excel_file.value = '';

        return false;
    }

    var reader = new FileReader();

    reader.readAsArrayBuffer(event.target.files[0]);

    reader.onload = function(event){

        var data = new Uint8Array(reader.result);

        var work_book = XLSX.read(data, {type:'array'});

        var sheet_name = work_book.SheetNames;

        var sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[0]], {header:1});

        var copyData =ArrayCopy(sheet_data);

        createTable(sheet_data);
        btnEdit(sheet_data.length);
        createTableCopy(copyData);
    }
       

});

 
 }


function createTable(sheet_data){

    document.getElementById('url_card').style.display="none";

    if(sheet_data.length > 0)
    {
        var table_output = '<table class="table table-striped table-bordered">';

        for(var row = 0; row < sheet_data.length; row++)
        {

            table_output += '<tr>';

            for(var cell = 0; cell < sheet_data[row].length; cell++)
            {

                if(row == 0)
                {

                    table_output += '<th>'+sheet_data[row][cell]+'</th>';

                }
                else
                {

                    table_output += '<td contenteditable="false">'+sheet_data[row][cell]+'</td>';
                }

            }

            table_output += '</tr>';

        }

        table_output += '</table>';

        document.getElementById('excel_data').innerHTML = table_output;
    }

}

function ArrayCopy(sheet_data){
    var newArray = [] ;
    if(sheet_data.length > 0)
    {
        
        for(var row = 0; row < sheet_data.length; row++)
        {
            var col = [];

            for(var cell = 0; cell < sheet_data[row].length; cell++)
            {
                 col[cell] = sheet_data[row][cell]; 

            }
            newArray[row] = col;
        }
    }
   return newArray;
}

function createTableCopy(sheet_data){
    
    if(sheet_data.length > 0)
    {
        var table_output = '<table class="table table-striped table-bordered" style="border:dotted" id="data_edit">';

        for(var row = 0; row < sheet_data.length; row++)
        {
            table_output += '<tr>';

            for(var cell = 0; cell < sheet_data[row].length; cell++)
            {
                if(row == 0)
                {

                    table_output += '<th>'+sheet_data[row][cell]+'</th>';

                }
                else
                {

                    table_output += '<td class="edited" contenteditable="true">'+sheet_data[row][cell]+'</td>';
                }

            }

            table_output += '</tr>';

        }

        table_output += '</table>';

        document.getElementById('excel_data_editable').innerHTML = table_output;
    }

}



function btnEdit(S_length){

    if (S_length > 0){
        document.getElementById('editable').style.display="block";
    }    
}

function editClicked(){
    document.getElementById('editable').style.display="none";
    document.getElementById('save').style.display="block";
    myFunction();
    document.getElementById('excel_data').style.display="inline-block";
    document.getElementById('excel_data_editable').style.display="inline-block";
    
}

function saveClicked(){
    document.getElementById('excel_data').style.display="none";
    document.getElementById('excel_data_editable').style.display="block";
    document.getElementById('editable').style.display="none";
    document.getElementById('save').style.display="none"; 
    document.getElementById('data_edit').style.border="none"; 
    changeEditableFalse();
    var element = document.getElementById("excel_data_editable");
    element.classList.remove("col-md-6");
    element.classList.add("col-md-12");

}

function changeEditableFalse(){
    var arr=document.getElementsByClassName('edited');
    for(var row = 0; row < arr.length; row++)
        {
            arr[row].setAttribute("contenteditable","false");
        }
}

function myFunction() {
    var element = document.getElementById("excel_data");
    element.classList.remove("col-md-12");
    element.classList.add("col-md-6");
    element.classList.add("ml-auto");
    element.classList.add("table-responsive");
    var element = document.getElementById("excel_data_editable");
    element.classList.remove("col-md-12");
    element.classList.add("col-md-6");
    element.classList.add("table-responsive");
  }