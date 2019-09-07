const methods = {
  hasValue(val) {
    if(val == false || val == '' || val == null) {
      return false;
    } else {
      return true;
    }
  },
  resize(event) {
    var textareaElement = event.target;
    // textareaElement.style.height = 'auto';
    textareaElement.style.height = textareaElement.scrollHeight+'px';
  }
}

export default methods;
