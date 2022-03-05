!(function () {
  const n = Handlebars.template; (Handlebars.templates = Handlebars.templates || {}).Signup = n({
    compiler: [8, '>= 4.3.0'],
    main(n, e, l, a, t) {
      let r = n.lookupProperty || function (n, e) { if (Object.prototype.hasOwnProperty.call(n, e)) return n[e]; }; return `${(r = typeof (l = (l = r(l, 'header') || (e != null ? r(e, 'header') : e)) != null ? l : n.hooks.helperMissing) === 'function' ? l.call(e != null ? e : n.nullContext || {}, {
        name: 'header', hash: {}, data: t, loc: { start: { line: 1, column: 0 }, end: { line: 1, column: 12 } },
      }) : l) != null ? r : ''}\n\nJoin us!`;
    },
    useData: !0,
  });
}());
