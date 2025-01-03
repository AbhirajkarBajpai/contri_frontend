export const hideAlert = () => {
  const el = document.querySelector('.alertG5');
  if (el) el.parentElement.removeChild(el);
};

export const showAlert = (type, msg) => {
  hideAlert(); 
  const markup = `<div class="alertG5 alertG5--${type}">${msg}</div>`;
  document.body.insertAdjacentHTML('beforeend', markup); 
  window.setTimeout(hideAlert, 2000);
};
