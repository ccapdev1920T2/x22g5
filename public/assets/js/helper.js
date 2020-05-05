hbs.registerHelper('equals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

// "https://stackoverflow.com/questions/34252817/handlebarsjs-check-if-a-string-is-equal-to-a-value"