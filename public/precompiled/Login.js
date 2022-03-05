!(function () {
  const l = Handlebars.template; (Handlebars.templates = Handlebars.templates || {}).Login = l({
    compiler: [8, '>= 4.3.0'],
    main(l, n, e, a, o) {
      let s = l.lookupProperty || function (l, n) { if (Object.prototype.hasOwnProperty.call(l, n)) return l[n]; }; return `${(s = typeof (e = (e = s(e, 'header') || (n != null ? s(n, 'header') : n)) != null ? e : l.hooks.helperMissing) === 'function' ? e.call(n != null ? n : l.nullContext || {}, {
        name: 'header', hash: {}, data: o, loc: { start: { line: 1, column: 0 }, end: { line: 1, column: 12 } },
      }) : e) != null ? s : ''}\n\n<div class="form__login">\n  <div class="form__field">\n    <label for="email">Email</label>\n    <input id="email" name="email" type="email" class="form__input" placeholder="Enter your email...">\n  </div>\n  <div class="form__field">\n    <label for="password">Password</label>\n    <input id="password" name="password" type="password" class="form__input" placeholder="Enter your password...">\n  </div>\n  <div class="form__submit">\n    <button id="submit" type="submit" class="form__btn__submit">Login</button>\n  </div>\n</div>`;
    },
    useData: !0,
  });
}());
