const ALPHABET = '5k8P3gLanKA1qSwz0M2eROpZIrGjY4xWc7hDBXbQ9NtdyEo6VJfUmlHviuFTCs';


const encodeBase62 = (num) => {
  let str = '';
  const base = ALPHABET.length; 

  if (num === 0) return ALPHABET[0];

  while (num > 0) {
    const remainder = num % base;
    str = ALPHABET[remainder] + str; 
    num = Math.floor(num / base);
  }
  return str;
};

module.exports=encodeBase62