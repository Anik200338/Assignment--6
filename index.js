// all data load
const loadCategory = async () => {
  toggleLoadingSpinner(true);
  try {
    const response = await fetch(
      'https://openapi.programming-hero.com/api/retro-forum/posts'
    );
    const data = await response.json();
    const categoryContainer = document.getElementById('category-bar-container');
    await new Promise(resolve => setTimeout(resolve, 2000));
    data.posts.forEach(item => {
      // console.log(item);
      let verifiedBadge = `bg-red-500`;
      if (item.isActive) {
        verifiedBadge = ` bg-green-500
       `;
      }
      const div = document.createElement('div');
      div.innerHTML = `
    <div class="lg:flex   gap-7 bg-[#12132D0D] p-5 lg:p-10 rounded-2xl   mb-10">
            <div class="indicator">
              <span class="indicator-item badge  ${verifiedBadge}"></span>
              <div class="grid w-32 h-32 bg-base-300 place-items-center rounded-2xl"><img src="${
                item.image
              }" alt="" class="rounded-2xl"></div>
            </div>
            <div>
            <div>
            <div class="flex gap-7">
                <p class="font-bold">${item.category}</p>
                <p class="font-bold"> Author : <span>${
                  item.author.name
                }</span></p>
              </div>
              <h1 class="text-3xl font-bold mt-5 " id="title">${item.title}</h1>
              <p class="mt-4 text-xl">${item.description}</p>
              <hr class="border-dashed mt-5">
            </div>
              <div class="flex-row lg:flex  lg:gap-72 mt-5">
                <div class="mt-5 ">
                  <i class="fa-solid fa-message"><span class="pl-3 pr-8">${
                    item.comment_count
                  }</span></i>
                  <i class="fa-solid fa-eye"><span class="pl-3 pr-8" id="view">${
                    item.view_count
                  }</span></i>
                  <i class="fa-solid fa-clock"><span class="pl-3 ">${
                    item.posted_time
                  }</span></i>
                </div>
                <div class="">
                  <button id="userId" onclick="handleShowDetail('${item.title.replace(
                    "'",
                    "\\'"
                  )}', '${item.view_count}')">
                      <img src="./images/Vector.png" alt="" class="mt-5 mb-9">
                      </button>

                </div>
              </div>
            </div>
          </div>
    `;
      categoryContainer.appendChild(div);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    toggleLoadingSpinner(false);
  }
};

// search data load

const loadCategory2 = async searchText => {
  toggleLoadingSpinner(true);
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`
    );
    const data = await response.json();
    const categoryContainer = document.getElementById('category-bar-container');
    categoryContainer.textContent = '';
    await new Promise(resolve => setTimeout(resolve, 2000));
    data.posts.forEach(item => {
      console.log(item);
      let verifiedBadge = `bg-red-500`;
      if (item.isActive) {
        verifiedBadge = ` bg-green-500
          `;
      }
      const div = document.createElement('div');
      div.innerHTML = `
        <div class="lg:flex   gap-7 bg-[#12132D0D] p-5 lg:p-10 rounded-2xl   mb-10">
        <div class="indicator">
        <span class="indicator-item badge  ${verifiedBadge}"></span>
        <div class="grid w-32 h-32 bg-base-300 place-items-center rounded-2xl"><img src="${
          item.image
        }" alt="" class="rounded-2xl"></div>
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
        <i class="fa-solid fa-message"><span class="pl-3 pr-8">${
          item.comment_count
        }</span></i>
        <i class="fa-solid fa-eye" id="view"><span class="pl-3 pr-8" >${
          item.view_count
        }</span></i>
        <i class="fa-solid fa-clock"><span class="pl-3 ">${
          item.posted_time
        }</span></i>
        </div>
        <div class="">
        <button id="userId"" onclick="handleShowDetail('${item.title.replace(
          "'",
          "\\'"
        )}', '${item.view_count}')">
        <img src="./images/Vector.png" alt="" class=" mb-10">
        </button>
        </div>
        </div>
        </div>
        </div>
        `;
      categoryContainer.appendChild(div);
    });
  } catch (error) {
    console.error('Error fetching category data:', error);
  } finally {
    toggleLoadingSpinner(false);
  }
};
// checkbox

let readCount = 0;
function handleShowDetail(title, viewCount) {
  const appendContainer = document.getElementById('append');

  const newDiv = document.createElement('div');
  newDiv.className =
    'flex justify-between gap-5 bg-[#12132D0D] rounded-2xl p-5 mb-5';

  newDiv.innerHTML = `
    <div><p class="font-bold">${title}</p></div>
    <div><i class="fa-solid fa-eye"><span class="pl-3 " id="view2">${viewCount}</span></i></div>
  `;

  // Append the new div to the "append" container
  // Increment the read count
  readCount++;

  // Update the read count in the HTML
  document.getElementById('readCount').textContent = readCount;

  // Append the new div to the "append" container
  appendContainer.appendChild(newDiv);
}

// Initialize the read count to 0

// onclick search function
const handleButtonClick = () => {
  const searchField = document.getElementById('myInput');
  const searchText = searchField.value;
  loadCategory2(searchText);
};

// latest post

const latestPost = async () => {
  toggleLoadingSpinner2(true);
  try {
    const response = await fetch(
      'https://openapi.programming-hero.com/api/retro-forum/latest-posts'
    );
    const data = await response.json();
    const categoryContainer1 = document.getElementById('latestCard');
    await new Promise(resolve => setTimeout(resolve, 2000));
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
  } catch (error) {
    console.error('Error fetching latest posts:', error);
  } finally {
    toggleLoadingSpinner2(false); // Hide loading spinner for latest post
  }
};
//  spinner delay show 2 sec for latestPost and loadCategory function

const toggleLoadingSpinner = isLoading => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
  } else {
    loadingSpinner.classList.add('hidden');
  }
};

// Call loadCategory to fetch data

const toggleLoadingSpinner2 = isLoading => {
  const loadingSpinner = document.getElementById('loading-spinner2');
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
  } else {
    loadingSpinner.classList.add('hidden');
  }
};

const isPageReloaded = sessionStorage.getItem('pageReloaded');

// Add event listener for beforeunload

window.addEventListener('beforeunload', function () {
  sessionStorage.setItem('pageReloaded', 'true');
});

if (isPageReloaded) {
  // Show loading spinner after a 2-second delay

  toggleLoadingSpinner(true);
  // Load data after another 2-second delay
  setTimeout(() => {
    loadCategory();
    sessionStorage.removeItem('pageReloaded');
  }, 2000);
} else {
  toggleLoadingSpinner(false);
  loadCategory();
}

const isPageReloaded2 = sessionStorage.getItem('pageReloaded');

window.addEventListener('beforeunload', function () {
  sessionStorage.setItem('pageReloaded', 'true');
});

if (isPageReloaded2) {
  toggleLoadingSpinner2(true);
  setTimeout(() => {
    latestPost();
    sessionStorage.removeItem('pageReloaded');
  }, 2000);
} else {
  toggleLoadingSpinner2(false);
  latestPost();
}
