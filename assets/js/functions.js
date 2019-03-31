//cleanArray removes all duplicated elements
function cleanArray(array) {
    var i, j, len = array.length, out = [], obj = {};
    for (i = 0; i < len; i++) {
        obj[array[i]] = 0;
    }
    for (j in obj) {
        out.push(j);
    }
    return out;
}

// Calcul le nombre d'occurences d'une valeur dans un tableau
function countOccurences(tab){
    var result = {};
    tab.forEach(function(elem){
        if(elem in result){
            result[elem] = ++result[elem];
        }
        else{
            result[elem] = 1;
        }
    });
    return result;
}