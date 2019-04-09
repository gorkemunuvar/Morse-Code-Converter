const socket = io();

const app = new Vue({
    el: '#app',
    data: {
        latin : '',
        morseCode: ''
    },
    methods: {
        convertToMorseCode: function (event) {
            this.morseCode = "";
            latinToMorseCode(this.latin);
        },
        convertToLatin: function(event){
            this.latin = "";
            morseCodeToLatin(this.morseCode);
        },
        addHyphen: function(event){
            this.morseCode += "–";
        },
        addDot: function(event){
            this.morseCode += "•";
        },
        addSpace: function(event){
            this.morseCode += " ";
        },
        clear: function(event){
            this.morseCode = "";
        }
    }
});

const characters = [
    ['A', '•–'],     ['B', '–•••'],    ['C', '–•–•'],
    ['D', '–••'],    ['E', '•'],       ['F', '••–•'],
    ['G', '––•'],    ['H', '••••'],    ['I', '••'],
    ['J', '•–––'],   ['K', '–•–'],    ['L', '•–••'],
    ['M', '––'],     ['N', '–•'],      ['O', '–––'],
    ['P', '•––•'],   ['Q', '––•–'],    ['R', '•–•'],
    ['S', '•••'],    ['T', '–'],       ['U', '••–'],
    ['V', '•••–'],   ['W', '•––'],     ['X', '–••–'],
    ['Y', '–•––'],   ['Z', '––••'],    ['1', '•––––'],
    ['2', '••–––'],  ['3', '•••––'],   ['4', '••••–'],
    ['5', '•••••'],  ['6', '–••••'],   ['7', '––•••'],
    ['8', '–––••'],  ['9', '––––•'],   ['0', '–––––'],
    ['.', '•–•–•–'], [',', '––••––'],  ['?', '••––••'],
    ['-', '–••••–'], ['/', '–••–•'],   [' ', '   '],
    ['Ş', '•••'],    ['Ç', '–•–•'],    ['Ğ', '––•'],
    ['Ö', '–––'] ,   ['Ü', '••–']
];

//controlColumn = 0 -> Function searchs in latin characters
//controlColumn = 1 -> Function searchs in morse code
function searchInCharacters(wanted, controlColumn){
    let i;
    for (i = 0; i < characters.length; i++) {
        if (wanted === characters[i][controlColumn]) {
            return i;
        }
    }
    
    return -1;
}

function latinToMorseCode(msg) {
    let i, str="";
    msg = msg.toUpperCase();
    
    for(i=0; i<msg.length; i++){
        let resultIndex = searchInCharacters(msg[i], 0);
        if(resultIndex != -1){
            str += characters[resultIndex][1] + " ";
        }
    }

    app.morseCode = str;
}

function morseCodeToLatin(msg){
    let str = "";
    let morseCodeArray = msg.split('     ');

    for(let i in morseCodeArray){
        let word = morseCodeArray[i].split(' ');
        for(let j in word){
            let resultIndex = searchInCharacters(word[j], 1);
            if(resultIndex != -1)
                str += characters[resultIndex][0];
        }
        str += " ";
    }

    app.latin = str;
}