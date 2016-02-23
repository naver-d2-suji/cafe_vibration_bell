var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

//serialport.list(function(err, ports){
//    var com = null;
//
//    for (var i in ports){
//        if (ports[i].vendorId == '0x2341')
//            com = ports[i].comName;
//    }
//
//    var sp = new SerialPort(com, {
//        baudrate: 115200,
//        parser: serialport.parsers.readline("\n")
//    });
//
//    sp.on("open", onOpen);
//    sp.on("data", onData);
//
//    function onOpen(){
//        console.log('open');
//    }
//
//    function onData(data){
//        sp.write("S11");
//        console.log(data);
//    }
//
//    setTimeout(function(){
//        sp.close(function(){
//            console.log("close");
//        });
//    }, 1500);
//});

//var sp = new SerialPort("/dev/ttyACM1", {
//    baudrate: 115200,
//    parser: serialport.parsers.readline("\n")
//});
//
//sp.on("open", onOpen);
//sp.on("data", onData);
//
//function onOpen(){
//    console.log('open');
//}
//
//function onData(data){
//    sp.write('S01');
//    console.log(data);
//}
//
//setTimeout(function(){
//    sp.close(function(){
//        console.log("close");
//    });
//}, 1500);

//var message = 'S01';
//var iter=0;
//
//var intervalId = setInterval(function(){
//    sendMessage(message);
//    iter=iter+1;
//    if (iter>10)
//        clearInterval(intervalId);
//}, 100);
//
//function sendMessage(message){
//    var fs = require('fs');
//    fs.open('/dev/ttyACM1', 'w', 666, function(e, fd){
//        console.log(fd);
//       fs.write(fd, message, null, null, null, function(){
//           fs.close(fd, function(){
//              console.log('Sending ', message);
//           });
//       }) ;
//    });
//}

serialport.list(function(err, ports){
    var portName = null;

    for (var i in ports){
        if (ports[i].vendorId == '0x2341')
            portName = ports[i].comName;
    }

    console.log(portName);

    var sp = new SerialPort(portName, {
        baudrate: 115200,
        parser: serialport.parsers.readline("\n")
    });

    sp.on("open", function(){
        console.log("open");
        var iter = 0;
        var intervalId = setInterval(function(){
            sp.write('S01');
            console.log(iter);
            iter = iter + 1;
            if (iter > 10) {
                clearInterval(intervalId);
                sp.close(function(){
                    console.log("close");
                });
            }
        }, 100);
    });
});