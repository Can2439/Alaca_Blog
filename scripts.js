document.addEventListener('DOMContentLoaded', function() {
    var userIcon = document.getElementById('user-icon');
    var dropdown = document.getElementById('dropdown');
    var navLinks = document.querySelectorAll('nav a');

    userIcon.addEventListener('click', function() {
        dropdown.classList.toggle('visible');
    });

    document.addEventListener('click', function(event) {
        if (!userIcon.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.remove('visible');
        }
    });

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            var targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });

    // Show home section by default
    showSection('home');
    loadPosts();

    // Initialize CKEditor
    ClassicEditor
        .create(document.querySelector('#editor'))
        .catch(error => {
            console.error(error);
        });
});

function showSection(sectionId) {
    var sections = document.querySelectorAll('.section');
    sections.forEach(function(section) {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

function toggleForm(form) {
    var loginForm = document.getElementById('login-form');
    var registerForm = document.getElementById('register-form');
    if (form === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

function submitPost() {
    var title = document.getElementById('post-title').value;
    var summary = document.getElementById('post-summary').value;
    var content = document.querySelector('#editor').ckeditorInstance.getData();

    if (title.trim() !== "" && summary.trim() !== "" && content.trim() !== "") {
        var newPost = {
            title: title,
            summary: summary,
            content: content,
            likes: 0,
            comments: []
        };

        var posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts();
    }
}

function loadPosts() {
    var posts = JSON.parse(localStorage.getItem('posts')) || [];
    var blogPosts = document.getElementById('blog-posts');
    var popularPosts = document.getElementById('popular-posts');

    blogPosts.innerHTML = '';
    popularPosts.innerHTML = '';

    posts.forEach(function(post, index) {
        var postElement = document.createElement('div');
        postElement.className = 'card';
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.summary}</p>
            <div class="post-actions">
                <button onclick="likePost(${index})"><i class="fa fa-thumbs-up"></i> ${post.likes}</button>
                <button onclick="commentPost(${index})"><i class="fa fa-comment"></i> ${post.comments.length}</button>
                <button onclick="sharePost(${index})"><i class="fa fa-share"></i></button>
            </div>
            <div class="comments">
                ${post.comments.map(comment => `<p>${comment}</p>`).join('')}
            </div>
        `;
        blogPosts.appendChild(postElement);

        var popularPost = document.createElement('div');
        popularPost.className = 'card';
        popularPost.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.summary}</p>
        `;
        popularPosts.appendChild(popularPost);
    });
}

function likePost(index) {
    var posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts[index].likes++;
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts();
}

function commentPost(index) {
    var comment = prompt('Yorumunuzu yazın:');
    if (comment) {
        var posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts[index].comments.push(comment);
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts();
    }
}

function sharePost(index) {
    alert('Bu yazıyı sosyal medyada paylaş!');
}
