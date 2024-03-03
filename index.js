const loadCategory = async () => {
  const response = await fetch(
    'https://openapi.programming-hero.com/api/retro-forum/posts'
  );
  const data = await response.json();
  const categoryContainer = document.getElementById('category-bar-container');
  data.posts.forEach(item => {
    // console.log(item);
    let verifiedBadge = 'badge-secondary';
    if (item.isActive) {
      verifiedBadge = ` bg-green-500
       `;
    }
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="lg:flex   gap-7 bg-orange-200 p-5 lg:p-10 rounded-2xl   mb-10">
            <div class="indicator">
              <span class="indicator-item badge  ${verifiedBadge}"></span>
              <div class="grid w-32 h-32 bg-base-300 place-items-center rounded-2xl"><img src="${item.image}" alt="" class="rounded-2xl"></div>
            </div>
            <div>
            <div>
            <div class="flex gap-7">
                <p class="font-bold">${item.category}</p>
                <p class="font-bold"> Author : <span>${item.author.name}</span></p>
              </div>
              <h1 class="text-3xl font-bold mt-5 " id="title">${item.title}</h1>
              <p class="mt-4 text-xl">${item.description}</p>
              <hr class="border-dashed mt-5">
            </div>
              <div class="flex-row lg:flex  lg:gap-72 mt-5">
                <div class="mt-5 ">
                  <i class="fa-solid fa-message"><span class="pl-3 pr-8">${item.comment_count}</span></i>
                  <i class="fa-solid fa-eye"><span class="pl-3 pr-8" id="view">${item.view_count}</span></i>
                  <i class="fa-solid fa-clock"><span class="pl-3 ">${item.posted_time}</span></i>
                </div>
                <div class="">
                  <button id="userId"><img src="./images/Vector.png" alt="" class="mt-5 mb-10"></button>
                </div>
              </div>
            </div>
          </div>
    `;
    categoryContainer.appendChild(div);
  });
  toggleLoadingSpinner(false);
};
const loadCategory2 = async searchText => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`
  );
  const data = await response.json();
  const categoryContainer = document.getElementById('category-bar-container');
  categoryContainer.textContent = '';
  data.posts.forEach(item => {
    console.log(item);
    let verifiedBadge = 'badge-secondary';
    if (item.isActive) {
      verifiedBadge = ` bg-green-500
       `;
    }
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="lg:flex   gap-7 bg-orange-200 p-5 lg:p-10 rounded-2xl   mb-10">
            <div class="indicator">
              <span class="indicator-item badge  ${verifiedBadge}"></span>
              <div class="grid w-32 h-32 bg-base-300 place-items-center rounded-2xl"><img src="${item.image}" alt="" class="rounded-2xl"></div>
            </div>
            <div>
            <div>
            <div class="flex gap-7">
                <p class="font-bold">${item.category}</p>
                <p class="font-bold"> Author : <span>${item.author.name}</span></p>
              </div>
              <h1 class="text-3xl font-bold mt-5 " id="title">${item.title}</h1>
              <p class="mt-4 text-xl">${item.description}</p>
              <hr class="border-dashed mt-5">
            </div>
              <div class="flex-row lg:flex  lg:gap-72 mt-5">
                <div class="mt-5 ">
                  <i class="fa-solid fa-message"><span class="pl-3 pr-8">${item.comment_count}</span></i>
                  <i class="fa-solid fa-eye" id="view"><span class="pl-3 pr-8" >${item.view_count}</span></i>
                  <i class="fa-solid fa-clock"><span class="pl-3 ">${item.posted_time}</span></i>
                </div>
                <div class="">
                  <button onclick="handleClick()"}><img src="./images/Vector.png" alt="" class="mt-5 mb-10"></button>
                </div>
              </div>
            </div>
          </div>
    `;
    categoryContainer.appendChild(div);
  });
  toggleLoadingSpinner(false);
};

const handleButtonClick = () => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('myInput');
  const searchText = searchField.value;
  loadCategory2(searchText);
};

// latest post
const latestPost = async () => {
  const response = await fetch(
    'https://openapi.programming-hero.com/api/retro-forum/latest-posts'
  );
  const data = await response.json();
  console.log(data);
  const categoryContainer1 = document.getElementById('latestCard');
  data.forEach(item => {
    console.log(item);
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card lg:w-96 h-[100%] bg-base-100 shadow-xl p-10 border-2 border-solid">
          <figure><img src="${item.cover_image}" alt="Shoes" />
          </figure>
          <div class="mt-5 flex">
            <div><i class="fa-regular fa-calendar-days pr-5"></i></div>
            <div>
              <p>${item?.author?.posted_date || 'No Publish Date'}</p>
            </div>
          </div>
          <div class="card-body p-0 mt-5">
            <h2 class="card-title">
              ${item.title}
            </h2>
            <p>${item.description}</p>
            <div class="flex gap-5 mt-5">
              <div>
                <img class="mask mask-circle w-14" src="${
                  item.profile_image
                }" alt="">
              </div>
              <div>
                <h1 class="font-semibold">${item.author.name}</h1>
                <p>${item?.author?.designation || 'Unknown'}</p>
              </div>
            </div>
          </div>
        </div>
    `;
    categoryContainer1.appendChild(div);
  });
  toggleLoadingSpinner2(false);
};

loadCategory();
latestPost();

const toggleLoadingSpinner = isLoading => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
  } else {
    setTimeout(() => {
      if (loadingSpinner) {
        loadingSpinner.classList.add('hidden');
      }
    }, 2000);
  }
};
const toggleLoadingSpinner2 = isLoading => {
  const loadingSpinner = document.getElementById('loading-spinner2');
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
  } else {
    setTimeout(() => {
      if (loadingSpinner) {
        loadingSpinner.classList.add('hidden');
      }
    }, 2000);
  }
};
// Check if the page is reloaded
const isPageReloaded = sessionStorage.getItem('pageReloaded');

// Add event listener for beforeunload
window.addEventListener('beforeunload', function () {
  // Set the flag for page reload
  sessionStorage.setItem('pageReloaded', 'true');
});

// Call toggleLoadingSpinner based on page reload
if (isPageReloaded) {
  toggleLoadingSpinner(true); // Show loading spinner
} else {
  toggleLoadingSpinner(true); // Hide loading spinner
  // Remove the flag for subsequent visits
  sessionStorage.removeItem('pageReloaded');
}

// Rest of your code...

// Check if the page is reloaded
const isPageReloaded2 = sessionStorage.getItem('pageReloaded');

// Add event listener for beforeunload
window.addEventListener('beforeunload', function () {
  // Set the flag for page reload
  sessionStorage.setItem('pageReloaded', 'true');
});

// Call toggleLoadingSpinner based on page reload
if (isPageReloaded) {
  toggleLoadingSpinner2(true); // Show loading spinner for reload
} else {
  toggleLoadingSpinner2(true); // Show loading spinner for initial load
  // Remove the flag for subsequent visits
  sessionStorage.removeItem('pageReloaded');
}

// Rest of your code...
