
const search = document.querySelector('.search');
const comments = document.querySelectorAll('.dashboard .display .cards .card');
const parent = document.querySelector('.dashboard .display .cards');
const title = document.querySelector('.dashboard .title');

search.focus();
comments.forEach(comment => comment.addEventListener('click', e => copyInner(e.target)))
filterQuery('');

document.addEventListener('keydown', e => search.focus());
document.querySelector('.search').addEventListener('keyup', e => {
    filterQuery(e.target.value);
});

function filterQuery(query) {
    comments.forEach(e => { 
        try { parent.removeChild(e) } catch (error) {}
        e.classList.remove('negro');
    });
    comments.forEach(comment => {
        if (comment.innerText.toLowerCase().includes(query.toLowerCase())) {
            parent.appendChild(comment);
        }
    });
    title.innerText = 'Quotes matching \'' + query + '\':';
}

function copyInner(element) {
    navigator.clipboard.writeText(element.innerText);
    element.classList.add('negro');
}