export class Alert {
  constructor() {
    this.modal = document.createElement("div");
    this.modal.classList.add("modal");
    this.modal.style.display = "none";

    let div = document.createElement("div");
    div.classList.add("modal-content");
    this.messageNode = document.createElement("p");
    this.messageNode.classList.add("modal-message");
    let okButton = document.createElement("button");
    okButton.classList.add("modal-button");
    okButton.textContent = "OK";
    okButton.onclick = this.hide.bind(this);
    div.append(this.messageNode);
    div.append(okButton);
    this.modal.append(div);
    document.body.append(this.modal);
  }
  show(message) {
    this.messageNode.textContent = message;
    this.modal.style.display = "block";
  }

  hide() {
    this.modal.style.display = "none";
  }
}
export class Prompt {
  constructor() {
    this.modal = document.createElement("div");
    this.modal.classList.add("modal");
    this.modal.style.display = "none";
    let div = document.createElement("div");
    div.classList.add("modal-content");
    this.messageNode = document.createElement("p");
    this.messageNode.classList.add("modal-message");
    this.inputNode = document.createElement("input");
    this.inputNode.classList.add("modal-input");
    let okButton = document.createElement("button");
    okButton.classList.add("modal-button");
    okButton.textContent = "OK";
    okButton.onclick = () => {
      this.callback(this.inputNode.value);
      this.hide();
    };
    let cancelButton = document.createElement("button");
    cancelButton.classList.add("modal-button");
    cancelButton.textContent = "Отмена";
    cancelButton.onclick = this.hide.bind(this);
    div.append(this.messageNode);
    div.append(this.inputNode);
    div.append(okButton);
    div.append(cancelButton);
    this.modal.append(div);
    document.body.append(this.modal);
  }
  show(message, callback) {
    this.messageNode.textContent = message;
    this.callback = callback;
    this.modal.style.display = "block";
  }
  hide() {
    this.modal.style.display = "none";
  }
}
