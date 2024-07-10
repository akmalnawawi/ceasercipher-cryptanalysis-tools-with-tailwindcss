// String prototype for simple encryption and decryption
String.prototype.decrypt = function(n) {
    let out = "";
    for (let i of this) {
        out += String.fromCharCode(i.charCodeAt(0) - n);
    }
    return out;
}

String.prototype.encrypt = function(n) {
    let out = "";
    for (let i of this) {
        out += String.fromCharCode(i.charCodeAt(0) + n);
    }
    return out;
}

const customRange = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const customEncrypt = (text, n) => {
    let out = '';
    for (let char of text) {
        const index = customRange.indexOf(char);
        if (index === -1) {
            out += char; // Leave characters not in customRange unchanged
        } else {
            let newIndex = (index + n) % customRange.length;
            out += customRange[newIndex];
        }
    }
    return out;
}

const customDecrypt = (text, n) => {
    let out = '';
    for (let char of text) {
        const index = customRange.indexOf(char);
        if (index === -1) {
            out += char; // Leave characters not in customRange unchanged
        } else {
            let newIndex = (index - n) % customRange.length;
            if (newIndex < 0) newIndex += customRange.length;
            out += customRange[newIndex];
        }
    }
    return out;
}

const sanitizeInput = (input) => input.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

const countSingleCharacters = (inputText) => {
    const targetChars = customRange.split('');
    const frequency = {};
    let totalCount = 0;
  
    for (let char of targetChars) {
        frequency[char] = 0;
    }
  
    for (let char of inputText) {
        if (targetChars.includes(char)) {
            frequency[char]++;
            totalCount++;
        }
    }
  
    const frequencyArray = Object.entries(frequency)
        .filter(([_, count]) => count > 0)
        .sort((a, b) => b[1] - a[1]);
  
    return frequencyArray
        .map(([char, count]) => `${char}: ${(count / totalCount * 100).toFixed(2)}%`)
        .join('\n');
  }
  
  const countDiagrams = (inputText) => {
    const targetChars = customRange.split('');
    const frequency = {};
    let totalCount = 0;
  
    for (let i = 0; i < targetChars.length; i++) {
        for (let j = 0; j < targetChars.length; j++) {
            frequency[targetChars[i] + targetChars[j]] = 0;
        }
    }
  
    for (let i = 0; i < inputText.length - 1; i++) {
        const char2 = inputText.substr(i, 2);
        if (char2.length === 2 && char2.split('').every(char => targetChars.includes(char))) {
            frequency[char2]++;
            totalCount++;
        }
    }
  
    const frequencyArray = Object.entries(frequency)
        .filter(([_, count]) => count > 0)
        .sort((a, b) => b[1] - a[1]);
  
    return frequencyArray
        .map(([char, count]) => `${char}: ${(count / totalCount * 100).toFixed(2)}%`)
        .join('\n');
  }
  
  const countTrigrams = (inputText) => {
    const targetChars = customRange.split('');
    const frequency = {};
    let totalCount = 0;
  
    for (let i = 0; i < targetChars.length; i++) {
        for (let j = 0; j < targetChars.length; j++) {
            for (let k = 0; k < targetChars.length; k++) {
                frequency[targetChars[i] + targetChars[j] + targetChars[k]] = 0;
            }
        }
    }
  
    for (let i = 0; i < inputText.length - 2; i++) {
        const char3 = inputText.substr(i, 3);
        if (char3.length === 3 && char3.split('').every(char => targetChars.includes(char))) {
            frequency[char3]++;
            totalCount++;
        }
    }
  
    const frequencyArray = Object.entries(frequency)
        .filter(([_, count]) => count > 0)
        .sort((a, b) => b[1] - a[1]);
  
    return frequencyArray
        .map(([char, count]) => `${char}: ${(count / totalCount * 100).toFixed(2)}%`)
        .join('\n');
  }
  
// Export functions for use in HTML
export { sanitizeInput, customEncrypt, customDecrypt, countSingleCharacters, countDiagrams, countTrigrams };
