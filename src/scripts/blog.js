$blogElements = document.querySelectorAll('.blog_element')

console.log($blogElements)
$blogElements.forEach((el) => {
    let $h1 = el.querySelector('h1')
    let $content = el.querySelector('div')
    $h1.addEventListener('click', () => {

        if ($content.classList.contains('blog_none')){
            $content.classList.remove('blog_none')
        }
        else{
            $content.classList.add('blog_none')
        }
    })
})