var BASE_URL = 'http://127.0.0.1:5000'
var Item = ({ id, name }) => {
    $.get(BASE_URL+`/api/v1/team/${id}/banner`,(data, status)=>{
        const link = data["link"]
        console.log("Adding...")
        $('.each-item').add(`
<div id="team${id}">
  <a href="#">
    <img class="team-img" src="${link}", alt="${id}"/>
    <h5>${name}</h5>
  </a>
</div>`);
    })
}

var set_drag_on_all = () => {    const listItems = document.querySelectorAll('.list-item');
    const lists = document.querySelectorAll('.list');

    let draggedItem = null;

    for (let i=0; i < listItems.length; i++) {
        const item = listItems[i];

        item.addEventListener('dragstart', function () {
            draggedItem = item;
            setTimeout(function () {
                item.style.display = 'none';
            }, 0)
        });

        item.addEventListener('dragend', function () {
            setTimeout(function () {
                draggedItem.style.display = 'block';
                draggedItem = null;
            }, 0);
        })
        
    };

    for (let j = 0; j < lists.length; j ++) {
        const list = lists[j];

        list.addEventListener('dragover', function (e) {
            e.preventDefault();
        });
        
        list.addEventListener('dragenter', function (e) {
            e.preventDefault();
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        });

        list.addEventListener('dragleave', function (e) {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        });

        list.addEventListener('drop', function (e) {
            console.log('drop');
            this.append(draggedItem);
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        });
    }
}


$(document).ready(function(){
    $.get(BASE_URL + '/api/v1/teams?only=id,name,uri', (data, status)=>{
        data.map(Item)
    });
    $("button").click(function(){
        $("#div1").load("demo_test.txt");
    });

    $("button").click(function(){
        $("#div1").load("demo_test.txt", function(responseTxt, statusTxt, xhr){
          if(statusTxt == "success")
            alert("External content loaded successfully!");
          if(statusTxt == "error")
            alert("Error: " + xhr.status + ": " + xhr.statusText);
        });
    });
    set_drag_on_all();
});