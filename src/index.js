import { elements } from './constants.js';
import { ViewForm } from './view.js';
import { ModelDB, ModelHotel } from './model.js';
import { ViewCard } from './view.js';
import { ViewResults } from './view.js';

class Control {
   constructor() {
      this.modelHotel = new ModelHotel();
      this.modelDB = new ModelDB();
      this.viewForm = new ViewForm(elements);
      this.viewResults = new ViewResults(elements);
   }

   async createCards() {
      const data = await this.modelHotel.getHotels('New York');
      const hotels = data.slice(0, 3);
      const viewCard = new ViewCard(hotels, elements);
      viewCard.generateCards();
   }

   async search(e) {
      e.preventDefault();
      const location = elements.searchLocation.value;
      const data = await this.modelHotel.getHotels(location);
      data && this.viewResults.display(data);
   }

   async signUp(e) {
      e.preventDefault();
      const email = elements.signUpEmail.value;
      const password = elements.signUpPassword.value;
      const isSuccessful = await this.modelDB.createUser(email, password);
      isSuccessful && !this.viewForm.clearSignUp() && this.viewForm.hideForm();
   }

   async signIn(e) {
      e.preventDefault();

      const email = elements.signInEmail.value;
      const password = elements.signInPassword.value;
      const isSuccessful = await this.modelDB.signIn(email, password);

      if (isSuccessful) {
         this.viewForm.clearSignIn();
         this.viewForm.hideForm();
         this.viewForm.displaySignOutBtn();
      }
   }

   async signOut() {
      const isSuccessful = await this.modelDB.signOut();
      isSuccessful && this.viewForm.hideSignOutBtn();
   }
}

const control = new Control();
control.createCards();

elements.signUp.addEventListener('click', () => control.viewForm.displaySignUp());
elements.signIn.addEventListener('click', () => control.viewForm.displaySignIn());
elements.signOut.addEventListener('click', () => control.signOut());
elements.overlay.addEventListener('click', () => control.viewForm.hideForm());
elements.exitForm.addEventListener('click', () => control.viewForm.hideForm());
elements.search.addEventListener('submit', e => control.search(e));
elements.signUpForm.addEventListener('submit', e => control.signUp(e));
elements.signInForm.addEventListener('submit', e => control.signIn(e));
