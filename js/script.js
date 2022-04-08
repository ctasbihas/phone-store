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
    emptySearchText.style.display = 'none';
    toggleSearchResult('none');
    toggleSpinner('block');
  }
};

const toggleSpinner = displayStyle => {
  document.getElementById('spinner').style.display = displayStyle;
}
const toggleSearchResult = displayStyle => {
  document.getElementById('search-result').style.display = displayStyle;
}

const displaySearchResult = phones => {
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = '';
  if (phones.length == 0) {
    const resultEmpty = document.getElementById('result-empty');
    resultEmpty.innerText = 'no result found';
  }
  else{
    phones.forEach((phone) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
      <div class="card p-3">
          <img src="${phone.image}" class="w-75 card-img-top" alt=A"...">
          <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text">Brand: ${phone.brand}</p>
              <button class="btn btn-primary" onclick="loadPhoneDetail('${phone.slug}')">Show more</button>
              </div>
              </div>
              `;
              searchResult.appendChild(div);
            });
            const resultEmpty = document.getElementById('result-empty');
            resultEmpty.innerText = '';
          }
          toggleSearchResult('flex');
          toggleSpinner('none');
        };
        
        const loadPhoneDetail = phoneId => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetail(data.data))
}

const displayPhoneDetail = phone => {
  const phoneDetails = document.getElementById('phone-details');
  phoneDetails.textContent = '';
  const div = document.createElement('div');
  div.innerHTML = `
  <div class="card ms-5 mt-2 p-4">
  <img src="${phone.image}" class="w-50 card-img-top">
  <div class="card-body">
      <h5 class="card-title">${phone.name}</h5>
      <ul>
          <li>${phone.mainFeatures.chipSet}</li>
          <li>${phone.mainFeatures.displaySize}</li>
          <li>${phone.mainFeatures.memory}</li>
          <li>${phone.mainFeatures.storage}</li>
          <li>${phone.mainFeatures.sensors}</li>
      </ul>
      <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
  </div>
  `;
  phoneDetails.appendChild(div);
}