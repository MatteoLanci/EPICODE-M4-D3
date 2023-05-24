const getCard = () => {
  const authorizationKey =
    "EoXrkfIxjXL5JzJQuqFpq7PdCXWpX0ysWWfV24nFPRvpHByY6b8Ytem5";

  let inputSearch = document.querySelector("#inputSearch");
  let searchValue = inputSearch.value;
  console.log(searchValue);

  const endpoint = `https://api.pexels.com/v1/search?query=${searchValue}`;

  if (!searchValue) {
    console.log("search value is empty");
    let row = document.querySelector(".row");
    row.innerHTML = "";

    let welcomeDiv = document.createElement("div");
    welcomeDiv.classList.add("welcome");
    let welcomeP = document.createElement("p");
    welcomeP.classList.add("welcomeString", "px-5");
    welcomeP.innerHTML = "Matteo welcomes you" + "<br>" + "search something!";
    welcomeDiv.appendChild(welcomeP);
    row.appendChild(welcomeDiv);
    inputSearch.value = "";
    return;
  }
  let row = document.querySelector(".row");
  row.innerHTML = "";
  let waitingDiv = document.createElement("div");
  waitingDiv.classList.add("col-12");
  waitingDiv.innerHTML = `Loading your contents...`;

  row.append(waitingDiv);

  setTimeout(() => {
    fetch(endpoint, {
      headers: {
        Authorization: `${authorizationKey}`,
      },
    })
      .then((resolve) => {
        return resolve.json();
      })
      .then((json) => {
        row.innerHTML = "";
        let photosArr = json.photos;
        console.log(photosArr);

        if (photosArr.length == 0) {
          console.log("non ho trovato nulla");
          let row = document.querySelector(".row");
          row.innerHTML = "";

          let notFoundDiv = document.createElement("div");
          let notFoundP = document.createElement("p");
          notFoundP.innerHTML =
            "OOOPS, seems like I found ... ehm ... nothing!";
          notFoundDiv.appendChild(notFoundP);
          row.appendChild(notFoundDiv);
        }

        for (let i = 0; i < photosArr.length; i++) {
          const photoAlt = photosArr[i].alt;
          const photoHeight = photosArr[i].height;
          const photoWidth = photosArr[i].width;
          const artist = photosArr[i].photographer;
          const artistId = photosArr[i].photographer_id;
          const artistProfile = photosArr[i].photographer_url;
          const originalPicUrl = photosArr[i].src.original;
          const mediumPicUrl = photosArr[i].src.large;
          const pagePicUrl = photosArr[i].url;

          let newCard = document.createElement("div");
          newCard.classList.add("card", "mb-4");
          let newCardImgWrapper = document.createElement("img");
          newCardImgWrapper.classList.add("card-img-top", "card-img-wrapper");
          newCardImgWrapper.src = `${mediumPicUrl}`;
          newCardImgWrapper.setAttribute("alt", `${photoAlt}`);
          let row = document.querySelector(".row");
          let picWrapper = document.createElement("div");
          picWrapper.classList.add(
            "col-12",
            "col-sm-6",
            "col-md-4",
            "col-lg-3",
            "col-xl-2"
          );
          let cardBody = document.createElement("div");
          cardBody.classList.add("card-body");
          let cardTitle = document.createElement("h5");
          cardTitle.classList.add("card-title");
          cardTitle.innerHTML = `Photographer: <a href= ${artistProfile} target=_blank>${artist}</a>`;
          let cardArtistId = document.createElement("p");
          cardArtistId.classList.add("photographer-id");
          cardArtistId.innerHTML = `Photographer ID: ${artistId}`;
          let cardText = document.createElement("p");
          cardText.classList.add("card-text");
          cardText.innerHTML = `<a href= ${originalPicUrl} target=_blank>original size: ${photoWidth} x ${photoHeight}`;
          let cardBtn = document.createElement("a");
          cardBtn.classList.add("btn", "btn-outline-light");
          cardBtn.innerHTML = `See details`;
          cardBtn.setAttribute("href", `${pagePicUrl}`);
          cardBtn.setAttribute("target", "_blank");

          row.appendChild(picWrapper);
          picWrapper.appendChild(newCard);
          newCard.appendChild(newCardImgWrapper);
          newCard.appendChild(cardBody);
          cardBody.appendChild(cardTitle);
          cardBody.appendChild(cardArtistId);
          cardBody.appendChild(cardText);
          cardBody.appendChild(cardBtn);
        }
        inputSearch.value = "";
      })
      .catch((error) => {
        console.log("Error HTTP: ", error);
      });
  }, 3000);
};

getCard();

const searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", getCard);
