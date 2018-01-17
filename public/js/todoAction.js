let sendRequest(url,method,onload,data=""){
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", onload);
  oReq.open(method,url);
  oReq.send(data);

}
