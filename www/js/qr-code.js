function scanBarcode() {
    window.plugins.barcodeScanner.scan( function(result) {
        // error
        if(result.format != "EAN_13" || result.text.substr(0,3) != "978")return;
        location.href=location.href+"/"+result.text;
    }, function(error) {
        alert("error happen: " + error);
    });
}