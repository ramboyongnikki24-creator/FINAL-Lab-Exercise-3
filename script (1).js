document.getElementById("btnGet").addEventListener("click", function () {
    var btn = this;
    var output = document.getElementById("getOutput");

    btn.disabled = true;
    btn.textContent = "Loading...";
    output.className = "output-box";
    output.innerHTML = '<span class="placeholder">Fetching data...</span>';

    fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("HTTP error! Status: " + response.status);
            }
            return response.json();
        })
        .then(function (data) {
            output.className = "output-box has-data";
            output.innerHTML =
                '<span class="label">Post Title:</span><br>' +
                '<div class="title-text">' + data.title + '</div>' +
                '<span class="label">Content:</span><br>' +
                '<div class="body-text">' + data.body + '</div>';
        })
        .catch(function (error) {
            output.className = "output-box has-error";
            output.innerHTML =
                '<span class="error-msg">Error: ' + error.message + '</span>';
        })
        .finally(function () {
            btn.disabled = false;
            btn.textContent = "Load Post Data";
        });
});

document.getElementById("btnPost").addEventListener("click", function () {
    var btn = this;
    var output = document.getElementById("postOutput");

    btn.disabled = true;
    btn.textContent = "Sending...";
    output.className = "output-box";
    output.innerHTML = '<span class="placeholder">Sending post data...</span>';

    var newPost = {
        title: "My New Post",
        body: "Learning Fetch API is fun!",
        userId: 1
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost)
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("HTTP error! Status: " + response.status);
            }
            return response.json();
        })
        .then(function (data) {
            output.className = "output-box has-success";
            output.innerHTML =
                '<span class="success-msg">New Post Created!</span>' +
                '<div class="post-id">Post ID: ' + data.id + '</div>';
        })
        .catch(function (error) {
            output.className = "output-box has-error";
            output.innerHTML =
                '<span class="error-msg">Error: ' + error.message + '</span>';
        })
        .finally(function () {
            btn.disabled = false;
            btn.textContent = "Send New Post";
        });
});