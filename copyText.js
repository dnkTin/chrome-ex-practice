function copyText(id) {
    var copyText = document.getElementById(id);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');

}
function setValue(id) {
    var copyText = document.getElementById(id);
    copyText.value = "hello";
}
