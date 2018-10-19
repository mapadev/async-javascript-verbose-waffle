# Question 1 - (10min)

Create a promise version of the async readFile function

```js
const fs = require("fs");

function readFile(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
readFile("./files/demofile.txt", "utf-8")
    .then(
      data => console.log("file read", data),
      error => console.log("failed to read file", error)
    );

```

# Question 2

Load a file from disk using readFile and then compress it using the async zlib node library, use a promise chain to process this work.

```js
const fs = require("fs");
const zlib = require("zlib");

function zlibPromise(data) {
  return new Promise((resolve, reject) => {
    zlib.gzip(data, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });

  })
}

function readFile(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

readFile("./files/demofile.txt", "utf-8")
    .then(
      data => zlibPromise(data),
      err => console.log("failed to read file", err)
    )
    .then(
      result => console.log("result:", result),
      err => console.log("failed to zip file", err)
    )

    
    
    
    
    // --> Load it then zip it and then print it to screen
});
```

# Question 3

Convert the previous code so that it now chains the promise as well.

# Question 4

Convert the previous code so that it now handles errors using the catch handler

```js
const fs = require("fs");
const zlib = require("zlib");

function zlibPromise(data) {
  return new Promise((resolve, reject) => {
    zlib.gzip(data, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

function readFile(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

readFile("./files/demofile.txt", "utf-8")
    .then(
      data => zlibPromise(data)
    )
    .then(
      result => console.log("result:", result)
    )
    .catch(error => console.log("moo error:", error))
```

# Question 5

Create some code that tries to read from disk a file and times out if it takes longer than 1 seconds, use `Promise.race`

```js
function readFileFake(sleep) {
  return new Promise(resolve => setTimeout(resolve, sleep, "read"));
}

function timeout(sleep) {
  return new Promise((_, reject) => {
      setTimeout(reject, sleep, "timeout");
  });
};

Promise.race([timeout(1500), readFileFake(1000)])
  .then(() => console.log("race resolved!"))
  .catch(err => console.log("race rejected:", err))



function readFileFake(sleep) {
  return new Promise(resolve => setTimeout(resolve, sleep));
}
  
function rejectAfter(sleep) {
  return new Promise((resolve, reject) =>
    setTimeout(reject, sleep, "timeout occurred")
  );
}
  
Promise.race([readFileFake(5000), rejectAfter(1000)])
  .then(data => console.log("results: ", data))
  .catch(err => console.error("failing: ", err));

```

# Question 6

Create a process flow which publishes a file from a server, then realises the user needs to login, then makes a login request, the whole chain should error out if it takes longer than 1 seconds. Use `catch` to handle errors and timeouts.

```js
function authenticate() {
  console.log("Authenticating");
  return new Promise(resolve => setTimeout(resolve, 2000, { status: 200 }));
}

function publish() {
  console.log("Publishing");
  return new Promise(resolve => setTimeout(resolve, 2000, { status: 403 }));
}

function timeout(sleep) {
  return new Promise((resolve, reject) => setTimeout(reject, sleep, "timeout"));
}

Promise.race( [publish(), timeout(3000)])
  .then(response => {
    if (response.status === 403) {
      return authenticate();
    }
  })
  .then(() => console.log("published..."))
  .catch(error => console.log("failed", error));
```
