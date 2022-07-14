function solution() {
    const section = document.getElementById('main');

    fetch('http://localhost:3030/jsonstore/advanced/articles/list')
    .then(r => r.json())
    .then(data => {
        const articles = JSON.parse(JSON.stringify(data, null, 2));

        for (const each_art of articles) {

            let div_accordion = document.createElement('div');
            div_accordion.setAttribute('class', 'accordion');

            let div_head = document.createElement('div');
            div_head.setAttribute('class', 'head');

            let div_extra = document.createElement('div');
            div_extra.setAttribute('class', 'extra');

            let span_title = document.createElement('span');
            span_title.textContent = each_art.title;

            let button_html = document.createElement('button');
            button_html.setAttribute('class', 'button');
            button_html.setAttribute('id', `${each_art._id}`);
            button_html.textContent = 'More';
            button_html.addEventListener('click', onOpenClose);


            div_head.appendChild(span_title);
            div_head.appendChild(button_html);

            div_accordion.appendChild(div_head);
            div_accordion.appendChild(div_extra);

            section.appendChild(div_accordion);
        }

    })
    .catch(err => {
        section.setAttribute('class', 'error')
        section.textContent = `${err.message}`
    });

    async function onOpenClose(e) {

        const content_text = e.currentTarget.textContent;
        const id = e.currentTarget.id

        let div_h = e.currentTarget.parentNode.parentNode.children[0].children[1];
        let div_exr = e.currentTarget.parentNode.parentNode.children[1];
        let checked_for_p = e.currentTarget.parentNode.parentNode.children[1].children[0];

        try {
            
            if (content_text === 'More' && !checked_for_p) {

                const response = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`);
                const info_target = await response.json();
    
                let p = document.createElement('p');
                p.textContent = info_target.content;
    
                div_exr.appendChild(p);
                div_exr.style.display = 'block';
                div_h.textContent = 'Less';
    
            } else if (content_text === 'More' && checked_for_p) {
    
                div_exr.style.display = 'block';
                div_h.textContent = 'Less';
    
            } else {
                
                div_exr.style.display = 'none';
                div_h.textContent = 'More';
            }

        } catch (error) {
            section.setAttribute('class', 'error');
            section.textContent = `${error.message}`;
        }

    }

}

solution()