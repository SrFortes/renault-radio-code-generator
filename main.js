// La logique utilisant alpine.js

document.addEventListener('alpine:init', () => {
    Alpine.data('rcode', () => RCode);
})

RCode = {
  precode: '',
  get code() {
    // vrification du précode
    if (!this.test) {
      return '';
    }
    // première lettre du précode en majuscule
    precode = this.precode.toUpperCase();
    // varaible temporaire
    x = precode.charCodeAt(1) + precode.charCodeAt(0) * 10 - 698;
    y = precode.charCodeAt(3) + precode.charCodeAt(2) * 10 + x - 528;
    z = (y*7) % 100;
    // le code comme entier
    code = Math.floor(z / 10) + (z % 10) * 10 + ((259 % x) % 100) * 100;
    // le code comme chaîne avec 4 chiffres
    return code.toString().padStart(4, '0')
  },
  get test(){
    return /^[B-Zb-z]\d{3}$/.test(this.precode);
  }
}
