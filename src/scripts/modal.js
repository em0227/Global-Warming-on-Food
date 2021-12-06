export const Modal = function () {
  document.querySelector(".info-modal-open").addEventListener("click", (e) => {
    e.preventDefault();

    document.querySelector(".modal").classList.add("is-open");
  });

  document.querySelector(".info-modal-close").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".is-open").classList.remove("is-open");
  });
};
