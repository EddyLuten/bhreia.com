function handleInfoBoxImageClick(e) {
    e.preventDefault();
    const link = e.target.parentNode;
    let
        preview_box = document.createElement('div'),
        preview_image = document.createElement('img');

    preview_box.classList.add('infobox_preview');
    preview_image.src = link.href;
    preview_image.setAttribute('alt', (
        (e.target.alt ? `${e.target.alt}. ` : '') +
        'Click anywhere to close.'
    ));
    preview_image.classList.add('infobox_image');

    const kill = () => {
        preview_image.classList.add('removing');
        preview_image.onanimationend = () => {
            link.parentNode.removeChild(preview_box);
            preview_box = undefined;
        };
    };

    document.onkeydown = (e) => {
        if (preview_box && e.key.toLocaleLowerCase().startsWith('esc'))
            kill();
    };

    preview_box.onclick = () => kill();

    preview_box.appendChild(preview_image);
    link.parentNode.appendChild(preview_box);
}

window.addEventListener('DOMContentLoaded', () => {
    const infoBoxes = document.querySelectorAll('figure.infobox');

    for (const figure of infoBoxes) {
        const links = figure.getElementsByTagName('a');
        for (const link of links) {
            link.addEventListener('click', handleInfoBoxImageClick);
        }
    }
});
