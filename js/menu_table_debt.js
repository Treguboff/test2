function getChecked() {

    var cbs = document.querySelectorAll('input[name="bay"]');

    var sum = 0;
    for (var i = 0; i < cbs.length; i++) {
        if (cbs[i].checked == true) {
            sum += Number(cbs[i].value);
        }
    }
    document.getElementById("myTotal1").innerHTML = sum;
}

getChecked();