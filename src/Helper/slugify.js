function slugify(str) {
  if (!str) {
    str = this;
  }
  if (typeof str === 'string') {
    str = str.replace(
      /[^  \[A-Z][a-z]اأإآبتثجحخدذرزسشصضطظعغفقكلمنهويىةءه]/g,
      ''
    );
    str = str.replace(/ /g, '_');
    return str;
  } else {
    return str;
  }
}

export default slugify;
