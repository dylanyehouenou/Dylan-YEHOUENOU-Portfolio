const scriptURL = 'https://script.google.com/macros/s/AKfycbz69vMPN7IapUlrtw2Tv-p4FLxt15yfiDNvGbOm803kffA0kY5z5BGJ-jsByLcNRJ0/exec';
const form = document.forms['contact-form'];
const submitButton = document.querySelector('.submit-button');


form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})
