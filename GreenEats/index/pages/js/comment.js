// comments.js — Simple comment system using localStorage

document.addEventListener("DOMContentLoaded", function () {
  const commentForm = document.getElementById("commentForm");
  const commentList = document.getElementById("commentList");

  // Load existing comments from localStorage
  loadComments();

  // On form submit, add new comment
  if (commentForm) {
    commentForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const authorInput = document.getElementById("commentAuthor");
      const textInput = document.getElementById("commentText");

      const author = authorInput.value.trim();
      const text = textInput.value.trim();

      if (author.length < 2 || text.length < 2) {
        alert("Please enter your name and comment (at least 2 characters each).");
        return;
      }

      const newComment = {
        id: Date.now(),
        author,
        text,
      };

      // Save in localStorage
      const stored = JSON.parse(localStorage.getItem("greenEatsComments")) || [];
      stored.push(newComment);
      localStorage.setItem("greenEatsComments", JSON.stringify(stored));

      // Clear form fields
      authorInput.value = "";
      textInput.value = "";

      // Re‐render the list
      renderComment(newComment, true);
    });
  }

  // Load and display all comments from localStorage
  function loadComments() {
    const stored = JSON.parse(localStorage.getItem("greenEatsComments")) || [];
    stored.forEach((comment) => renderComment(comment, false));
  }

  // Render a single comment object to the list
  function renderComment(commentObj, prepend) {
    const li = document.createElement("li");
    li.innerHTML = `
      <p class="comment-author">${escapeHTML(commentObj.author)}</p>
      <p class="comment-text">${escapeHTML(commentObj.text)}</p>
    `;
    if (prepend) {
      commentList.insertBefore(li, commentList.firstChild);
    } else {
      commentList.appendChild(li);
    }
  }

  // Very basic escaping to prevent HTML injection
  function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function (match) {
      const escapeMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      };
      return escapeMap[match];
    });
  }
});
