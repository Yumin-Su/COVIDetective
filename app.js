

const init = function(e) {
    var btn = document.getElementById('bt1');
    var zip = document.getElementById('zip');

    btn.addEventListener('click', function() {
        localStorage.setItem('zipcode', zip.value);
        window.location.href = "./test.html";
    })

}
document.addEventListener('DOMContentLoaded', function() {
    init();
});

query = function queryTestingResource(zip) {
    window.zip_code = zip
    initMap()

};