!function(){var l=Handlebars.template;(Handlebars.templates=Handlebars.templates||{}).Login=l({compiler:[8,">= 4.3.0"],main:function(l,n,e,a,s){var t=l.lookupProperty||function(l,n){if(Object.prototype.hasOwnProperty.call(l,n))return l[n]};return(null!=(t="function"==typeof(e=null!=(e=t(e,"header")||(null!=n?t(n,"header"):n))?e:l.hooks.helperMissing)?e.call(null!=n?n:l.nullContext||{},{name:"header",hash:{},data:s,loc:{start:{line:1,column:0},end:{line:1,column:12}}}):e)?t:"")+'\n\n<div class="form">\n  <div class="form__field">\n    <label for="email">Email</label>\n    <input id="email" name="email" type="email" class="form__input" placeholder="Enter your email... ">\n  </div>\n  <div class="form__field">\n    <label for="password">Password</label>\n    <input id="password" name="password" type="password" class="form__input" placeholder="Enter your password...">\n  </div>\n  <div class="form__submit">\n    <button id="submit" type="submit" class="form__btn__submit">Login</button>\n  </div>\n</div>'},useData:!0})}();