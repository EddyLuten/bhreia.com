const
    // letter repeated for most common english letters
    vowels = 'aaaeeeeiiioouuy'.split(''),
    consonants = 'bccdfghjkllmnnpqrrssttvwxz'.split(''),
    vowelAfter = 'jhklnvwxz'.split(''),
    prefixes = [
        'blood',
        'brook',
        'burn',
        'by',
        'claw',
        'de',
        'der',
        'east',
        'el',
        'fitz',
        'gil',
        'gold',
        'hard',
        'heart',
        'iron',
        'kil',
        'lake',
        'mac',
        'north',
        'o\'',
        'over',
        'rock',
        'silver',
        'stone',
        'south',
        'west',
    ],
    suffixes = [
        'all',
        'ard',
        'bank',
        'beck',
        'berg',
        'bert',
        'born',
        'bridge',
        'briar',
        'by',
        'buck',
        'dale',
        'ell',
        'ette',
        'field',
        'foot',
        'ford',
        'forth',
        'gate',
        'ham',
        'hand',
        'hard',
        'hart',
        'heart',
        'hill',
        'horn',
        'house',
        'hus',
        'ing',
        'ings',
        'kin',
        'kins',
        'lake',
        'land',
        'lander',
        'ley',
        'lin',
        'linne',
        'low',
        'lynne',
        'maker',
        'man',
        'mond',
        'monde',
        'more',
        'moor',
        'moore',
        'miller',
        'ner',
        'net',
        'nett',
        'ott',
        'quist',
        'rich',
        'rick',
        'ridge',
        'shaw',
        'shire',
        'smith',
        'son',
        'stone',
        'storm',
        'strom',
        'thal',
        'thaler',
        'ton',
        'tonne',
        'tree',
        'wald',
        'walker',
        'ward',
        'well',
        'wick',
        'win',
        'wynne',
        'wood',
        'worth',
        'wright',
    ],
    mustVowel = (p) => vowelAfter.includes(p);

let nameOut;

function shouldConsonant(prev) {
    return !mustVowel(prev) && randomMinMax(1, 10) > 9;
}

function getLetter(i, prev) {
    let ret = randArr(
        (i % 2 == 0 || mustVowel(prev)) && !shouldConsonant(prev)
        ? vowels
        : consonants
    );
    while (ret === prev) {
        ret = getLetter(i, prev);
    }
    return ret;
}

function generateName() {
    const
        start = randomMinMax(0, 1),
        len = randomMinMax(3, 8);
    let generated = '', last = '', current = '';
    for (let i = 0 - start; i < len - start; ++i) {
        current = getLetter(i, last);
        generated += current;
        last = current;
    }
    generated = capitalize(generated);
    if (document.getElementById('useFixes').checked) {
        generated += ' ' + capitalize(`${randArr(prefixes)}${randArr(suffixes)}`);
    }
    return generated;
}

window.addEventListener('DOMContentLoaded', () => {
    nameOut = document.getElementById('nameOut');
    if (nameOut) {
        window.addEventListener('generateName', () => {
            let out = [];
            const times = document.getElementById('nametimes').value || 5;
            for (let i = 0; i < times; ++i) {
                out.push(generateName());
            }
            nameOut.innerHTML = out.join('<br />');
        });
    }
});
