// 1. Функция для проверки длины строки

const isLessOrEqual = (string, length) => string <= length;
isLessOrEqual();

// console.log(isLessOrEqual('проверяемая строка', 20));
// console.log(isLessOrEqual('проверяемая строка', 18));
// console.log(isLessOrEqual('проверяемая строка', 10));

// 2. Функция для проверки, является ли строка палиндромом

const isPalindrome = (rawString) => {
  const string = rawString.replaceAll(' ', '').toLowerCase();
  const reversedString = string.split('').reverse().join('');

  return string === reversedString;
};
isPalindrome();

// console.log(isPalindrome('топот'));
// console.log(isPalindrome('ДовОд'));
// console.log(isPalindrome('Кекс'));
// console.log(isPalindrome('Лёша на полке клопа нашёл '));

/**
 * Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
 *  и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры,
 * функция должна вернуть NaN:
 */

const getNum = (str) => {
  const string = str.toString();
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }
  return parseInt(result, 10);
};
getNum();

// console.log(getNum('2023 год'));
// console.log(getNum('ECMAScript 2022'));
// console.log(getNum('1 кефир, 0.5 батона'));
// console.log(getNum('агент 007'));
// console.log(getNum('а я томат'));
