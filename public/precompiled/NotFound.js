!(function () {
  const n = Handlebars.template; (Handlebars.templates = Handlebars.templates || {}).NotFound = n({
    compiler: [8, '>= 4.3.0'],
    main(n, e, l, t, a) {
      let o = n.lookupProperty || function (n, e) { if (Object.prototype.hasOwnProperty.call(n, e)) return n[e]; }; return `${(o = typeof (l = (l = o(l, 'header') || (e != null ? o(e, 'header') : e)) != null ? l : n.hooks.helperMissing) === 'function' ? l.call(e != null ? e : n.nullContext || {}, {
        name: 'header', hash: {}, data: a, loc: { start: { line: 1, column: 0 }, end: { line: 1, column: 12 } },
      }) : l) != null ? o : ''}\n\nNot found :(`;
    },
    useData: !0,
  });
}());
