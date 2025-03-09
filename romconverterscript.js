/*  Функция для переведения между системами: арабской и римской   */
function arab_to_rome(given_string) {
    let possible_symbols = "0123456789"
    given_string = `${given_string}` // на случай если юзер дал числовое значение вместо строкового
    for (let i = 0; i < given_string.length; i++) { //проверяем дал ли юзер число, а не что-то другое
        if  (!possible_symbols.includes(given_string[i])) {
            return -1
        }
    }
    function all_null(the_string) {
        let counter = 0;
        for (let index = 0; index < the_string.length; index++) {
            if (the_string[index] == 0) {
                counter++;
            }
        }
        return counter == the_string.length
    }
    if (all_null(given_string)) { //случай ноля
        return "N"
    } else {
        given_string.replace("0", "")
    }
    //получаем строку с арабскими цифрами
    let arabic_num = +given_string; //переводим в числовой формат
    /* массивы с возможными элементами */
    let arab_digits = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let rome_digits = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    let i = 0; //просто переменная для индексирования
    let rome_num = ""; //результат
    while (arabic_num > 0) {
        if (arabic_num - arab_digits[i] >= 0) {
            arabic_num -= arab_digits[i];
            rome_num += rome_digits[i];
        } else {
            i++;
        }
    }
    return rome_num
}
function rome_to_arab(given_string) {
    /* проверяем подходит ли строка по символам */
    let possible_letters = "MCDXLVI"
    for (let x = 0; x < given_string.length;  x++) {
        if (!possible_letters.includes(given_string[x])) {
            return -1
        }
    }
    function all_null(the_string) {
        let counter = 0;
        for (let index = 0; index < the_string.length; index++) {
            if (the_string[index] == "N") {
                counter++;
            }
        }
        return counter == the_string.length
    }
    if (all_null(given_string)) { //случай ноля
        return 0
    }
    let rome_string = given_string+"";
    let arab_digits = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let rome_digits = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    let i = 0;
    let arabic_result = 0
    while (rome_string != "") {
        if (rome_string.slice(0, rome_digits[i].length) === rome_digits[i]) {
            rome_string = rome_string.slice(rome_digits[i].length, rome_string.length); //обрезаем строку
            arabic_result += arab_digits[i];
        } else {
            i++;
        }
    }
    return arabic_result
}
/* логика */
var arab_input = document.getElementById('arabicnums'); //поле ввода арабских чисел
var to_rome_button = document.getElementById('to_rome_button'); //кнопушка под ним
var rome_input = document.getElementById('romenums'); //поле ввода римских чисел
var to_arab_button = document.getElementById('to_arab_button'); //кнопушка под ним
arab_input.oninput = function() {
    if (arab_input.value.length > 4) { // чтобы сайт не сломался, когда юзер захочет ввести число больше 9999
        arab_input.value = arab_input.value.slice(0, 4);
        return 0
    }
    let the_id = "romenums"
    document.getElementById(the_id).value = arab_to_rome(arab_input.value)
    if (arab_to_rome(arab_input.value)==-1) {
        document.getElementById(the_id).value = `Вводите числа`
    }
}
rome_input.oninput = function() {
    let the_id = "arabicnums"
    document.getElementById(the_id).value = `${rome_to_arab(rome_input.value)}`
    if (rome_to_arab(rome_input.value)==-1) {
        document.getElementById(the_id).value = `Вводите числа`
    }
}