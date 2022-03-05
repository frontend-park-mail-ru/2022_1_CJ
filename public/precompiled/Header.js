!(function () {
  const n = Handlebars.template; (Handlebars.templates = Handlebars.templates || {}).Header = n({
    1(n, a, l, e, r) { return '    TODO: authorized\n'; },
    3(n, a, l, e, r) { return '    <a href="/login" class="nav__link" data-link>login</a>\n    <a href="/signup" class="nav__link" data-link>signup</a>\n'; },
    compiler: [8, '>= 4.3.0'],
    main(n, a, l, e, r) {
      const t = n.lookupProperty || function (n, a) { if (Object.prototype.hasOwnProperty.call(n, a)) return n[a]; }; return `<nav class="header">\n  <div class="logo">\n    <a href="/" class="nav__link__logo" data-link>CJ</a>\n  </div>\n\n  <ul class="nav__list">\n${(l = t(l, 'if').call(a != null ? a : n.nullContext || {}, a != null ? t(a, 'authorized') : a, {
        name: 'if', hash: {}, fn: n.program(1, r, 0), inverse: n.program(3, r, 0), data: r, loc: { start: { line: 7, column: 4 }, end: { line: 12, column: 11 } },
      })) != null ? l : ''}  </ul>\n</nav>`;
    },
    useData: !0,
  });
}());
