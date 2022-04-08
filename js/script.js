const searchPhone = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  
  // clear data
  searchField.value = '';
  if (searchText == '') {
    const emptySearchText = document.getElementById('search-text-empty');
    emptySearchText.innerText = 'Please write a phone name to get result';
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data.data));

    const emptySearchText = document.getElementById('search-text-empty');
    emptySearchText.style.display = 'none'
  }
};



const displaySearchResult = (phones) => {
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = '';
  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card p-3">
        <img src="${phone.image}" class="w-75 card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">Brand: ${phone.brand}</p>
            <div class="card-footer">
                <button class="btn btn-primary">Show more</button>
            </div>
        </div>
    </div>
    `;
    searchResult.appendChild(div);
  });
};

function loadingSpinner(){
  const spinner = document.getElementById('spinner');
  spinner.classList.add('spinner-border');
}