// function doAsyncTask(cb) {
//     cb();
//   }
//   doAsyncTask(_ => console.log(message));

//   let message = "Callback Called";

function doAsyncTask(cb) {
    // Node specific solutions:
    process.nextTick(() => {
        cb();
    });

    // ...or:
    setImmediate(() => {
        cb();
    });
}
doAsyncTask(_ => console.log(message));

let message = "Callback Called";
