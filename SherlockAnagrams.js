const fs = require('fs');

var elem= 0;
var entrada = '';

process.stdin.on('data', input => {
    entrada += input;
});

process.stdin.on('end', _ => {
    entrada = entrada.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});
function main() {
    const m = fs.createWriteStream(process.env.OUTPUT_PATH);
    var i;
    const q = parseInt(ler(), 10);

    for (i = 0; i < q; i++) {
        const s = ler();

        var resultado = Anag(s);

        m.write(resultado + "\n");

    }
    m.end();
}

function ler() {
    return entrada[elem++];
}

function enconSubsDeString(str) {
    var i;
    var j;
    var resultado = [];

    for (i = 0; i < str.length; i++) {
        for (j = i + 1; j < str.length + 1; j++) {
            resultado.push(str.slice(i, j))
        }
    }
    return resultado;
}

function  verificar(a, b) {
    const auxilia = {}

    for (let i = 0; i < a.length; i++) {
        const char = a[i]
        if (auxilia[char]) {
            auxilia[char]++
        } else {
            auxilia[char] = 1
        }
    }

    for (let j = 0; j < b.length; j++) {
        const char = b[j]
        if (auxilia[char]) {
            auxilia[char]--
        } else {
            return false
        }
    }

    return true
}

function countAnagrams(currentIndex, arr) {
    const currentElement = arr[currentIndex]
    const arrRest = arr.slice(currentIndex + 1)
    let counter = 0

    for (let i = 0; i < arrRest.length; i++) {
        if (currentElement.length === arrRest[i].length &&  verificar(currentElement, arrRest[i])) {
            counter++
        }
    }

    return counter
}

function Anag(s) {
    const elemDup = s.split('').filter((v, i) => s.indexOf(v) !== i).length

    if (!elemDup) return 0
    let anagramsCount = 0

    const arr = enconSubsDeString(s)

    for (let i = 0; i < arr.length; i++) {
        anagramsCount += countAnagrams(i, arr)
    }

    return anagramsCount
}
