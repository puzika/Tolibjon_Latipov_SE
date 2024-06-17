class View {
   constructor(elements) {
      this.elements = elements;
   }
}

export class ViewCard extends View {
   constructor(dataArray, elements) {
      super(elements);
      this.dataArray = dataArray;
   }

   getMarkup(data) {
      const markup = `
         <div class="card">
            <img src="${data.featured_image}" alt="${data.name}" class="card__img">

            <div class="card__info">
               <h4 class="card__title">${data.name}</h4>

               <div class="card__stats">
                  <img src="./assets/${data.rating}stars.png" alt="5 stars" class="card__rating">
                  <p class="card__reviews">${data.reviews} reviews</p>
               </div>

               <p class="card__rank">Ranking: ${data.ranking.current_rank} out of ${data.ranking.total}</p>
            </div>
         </div>
      `;

      return markup;
   }

   createCard(data) {
      const markup = this.getMarkup(data);
      this.elements.cards.insertAdjacentHTML('beforeend', markup);
   }

   generateCards() {
      for (let i = 0; i < this.dataArray.length; i++) {
         this.createCard(this.dataArray[i]);
      }
   }
}

export class ViewForm extends View {
   displaySignUp() {
      this.elements.overlay.classList.remove('overlay--hidden');
      this.elements.formSignUp.classList.remove('form--hidden');
   }

   displaySignIn() {
      this.elements.overlay.classList.remove('overlay--hidden');
      this.elements.formSignIn.classList.remove('form--hidden');
   }

   displaySignOutBtn() {
      this.elements.signUp.classList.add('btn--hidden');
      this.elements.signIn.classList.add('btn--hidden');
      this.elements.signOut.classList.remove('btn--hidden');
   }

   hideSignOutBtn() {
      this.elements.signUp.classList.remove('btn--hidden');
      this.elements.signIn.classList.remove('btn--hidden');
      this.elements.signOut.classList.add('btn--hidden');
   }

   hideForm() {
      this.elements.overlay.classList.add('overlay--hidden');
      this.elements.formSignUp.classList.add('form--hidden');
      this.elements.formSignIn.classList.add('form--hidden');
   }

   clearSignUp() {
      this.elements.signUpName.value = '';
      this.elements.signUpEmail.value = '';
      this.elements.signUpPassword.value = '';
   }

   clearSignIn() {
      this.elements.signInEmail.value = '';
      this.elements.signInPassword.value = '';
   }
}

export class ViewResults extends View {
   getMarkup(data) {
      const allAmenities = data.amenities.highlighted_amenities.property_amenities;
      const amenities = allAmenities.length < 3 ? allAmenities : allAmenities.slice(0, 3);
      const amenityNames = amenities.map(a => a.name).join(', ');

      const markup = `
         <div class="result">
            <img src="${data.featured_image}" alt="${data.name}" class="result__img">

            <div class="result__info">
               <h4 class="result__title">${data.name}</h4>
               <img src="./assets/${data.rating}stars.png" alt="${data.rating} stars" class="result__rating">
               <p class="result__amenities">${amenityNames}</p>
               <p class="result__ranking">${data.ranking.current_rank} out of ${data.ranking.total}</p>
               <a href="${data.website}" target="_blank" class="result__site">
                  <button class="btn btn--visit">Visit Site</button>
               </a>
            </div>
         </div>
      `;

      return markup;
   }

   display(data) {
      const results = this.elements.results;
      results.innerHTML = '';
      const rating = this.elements.searchRating.value;

      for (let i = 0; i < data.length; i++) {
         if (rating == data[i].rating) {
            const markup = this.getMarkup(data[i]);
            results.insertAdjacentHTML('beforeend', markup);
         }
      }

      results.insertAdjacentHTML('beforeend', `<button class="btn results__exit">Back to Main</button>`);
      const exit = document.querySelector('.results__exit');
      exit.addEventListener('click', () => this.hideResults());

      results.classList.remove('results--hidden');
   }

   hideResults() {
      const results = this.elements.results;
      results.classList.add('results--hidden');
   }
}