const object = {
  convertJsonToFormData(jsonObj){
    let formData = [];
    _.forIn(jsonObj, function (val, key) {
      formData.push(key + '=' + val)
    })
    return formData.join('&');
  }
}
export default object;