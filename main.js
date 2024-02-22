document.addEventListener('alpine:init', () => {
    Alpine.data('rcode', () => RCode);
})

function normalize(precode) {
  precode = precode.toUpperCase();
  if (!/^[A-Z]\d{3}$/.test(precode) || precode.startsWith("A0")) {
    return "";
  }
  return precode;
}

RCode = {
  precode: '',
  get code() {
    precode = normalize(this.precode);
    
    if (precode == "") {
      return "";
    }

    x = precode.charCodeAt(1) + precode.charCodeAt(0) * 10 - 698;
    y = precode.charCodeAt(3) + precode.charCodeAt(2) * 10 + x - 528;
    z = (y*7) % 100;

    code = Math.floor(z / 10) + (z % 10) * 10 + ((259 % x) % 100) * 100;

    return code.toString().padStart(4, '0')
  },
  get test(){
    return normalize(this.precode) != "";
  }
}
