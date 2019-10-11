var inputBox = document.getElementById('search-box');
var btnSearch = document.getElementById('search-btn');
var cardGrid = document.getElementById('video-card-grid');
var sortAsc = document.getElementById('sort-asc');
var sortDesc = document.getElementById('sort-desc');

var response = [];

inputBox.onkeyup = function(e) {
  if(e.keyCode === 13) {
    fetchDataFromBackend();
  }
};

btnSearch.onclick = function () {
  fetchDataFromBackend();
};

function createPlaylistCard(obj, pos) {
    // <div id="card6" class="playlist-card">
    //     <img class="thumbnail" src="https://i.vimeocdn.com/video/537261616_390x220.jpg" />
    //     <h3 class="video-card-title">Lemony Chicken Noodle Soup</h3>
    // </div>

    var mainDiv = document.createElement('div');
    mainDiv.id = 'card' + obj.id;
    mainDiv.classList.add('playlist-card');

    var thumbnail = document.createElement('img');
    thumbnail.classList.add('thumbnail');
    thumbnail.src = obj.thumbnail;

    var title = document.createElement('h3');
    title.classList.add('video-card-title');
    title.innerHTML = obj.title;

    mainDiv.appendChild(thumbnail);
    mainDiv.appendChild(title);

    mainDiv.onclick = function() {
        getVideoDataFromBackend(obj.id, pos);
    };

    return mainDiv;
}

function fetchDataFromBackend() {
   var query = inputBox.value;
   if(query !== '' && query.length >= 3) {
     cardGrid.innerHTML = '';
     sortAsc.checked = false;
     sortDesc.checked = false;

     var http = new XMLHttpRequest();
     http.onreadystatechange = function() {
        if(this.readyState === 4) {
          //alert(this.responseText);
          response = JSON.parse(this.responseText);
          renderGrid();
        }
     };
     http.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/playlist?search='+query, true);
     http.send();
   } else {
        alert('Please enter a valid video title!!');
   }
}

function renderGrid() {
    cardGrid.innerHTML = '';
	for(var i=0;i<response.length;i++) {
        cardGrid.appendChild(createPlaylistCard(response[i]));
    }
}

sortAsc.onchange = function(e) {
  if(e.target.checked) {
	sortListAsc();
  } else {
      alert('Not checked')
  }
};

sortDesc.onchange = function(e) {
  if(e.target.checked) {
        sortListDesc();
  }
};

function sortListAsc() {
  response.sort(function(a,b) {
    if(a.title < b.title) {
       return -1;
    } else if(a.title > b.title) {
       return 1;
    }
    return 0;
  });
  renderGrid();
}

function sortListDesc() {
  response.sort(function(a,b) {
    if(a.title > b.title) {
       return -1;
    } else if(a.title < b.title) {
       return 1;
    }
    return 0;
  });
  renderGrid();
}