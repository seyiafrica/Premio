/* Premio site.js — live commerce state on marketing pages (reads the same
   device storage the shop writes; degrades to nothing when empty). */
(function(){
  function g(k){ try{ return JSON.parse(localStorage.getItem('premio_'+k)) }catch(e){ return null } }

  var nav = document.querySelector('.site-nav');
  if(nav){
    var live = document.createElement('div');
    live.className = 'nav-live';

    var slot = g('slot');
    var slotHtml = slot && slot.label
      ? '<a class="nav-slot booked" href="/shop.html" title="Your held delivery slot"><span class="ns-dot"></span>' + slot.label + '</a>'
      : '<a class="nav-slot" href="/shop.html"><span class="ns-dot off"></span>Book a slot</a>';

    var cart = g('cart') || [];
    var count = 0;
    for(var i=0;i<cart.length;i++){ count += cart[i][1] || 0; }
    var basketHtml = '<a class="nav-basket" href="/shop.html" aria-label="Basket">'
      + '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>'
      + (count ? '<span class="nb-count">' + count + '</span>' : '')
      + '</a>';

    live.innerHTML = slotHtml + basketHtml;
    var burger = nav.querySelector('.burger');
    nav.insertBefore(live, burger);
  }

  var hero = document.getElementById('heroReturn');
  if(hero){
    var deliv = g('deliv') || {};
    var orders = g('orders') || [];
    var favs = g('favs') || [];
    if(deliv.name || orders.length){
      var ids = {};
      favs.forEach(function(id){ ids[id]=1; });
      orders.forEach(function(o){ (o.items||[]).forEach(function(it){ ids[it.id]=1; }); });
      var regs = Object.keys(ids).length;
      hero.style.display = 'flex';
      hero.innerHTML =
        '<span class="hr-text">Welcome back' + (deliv.name ? ', <em>' + deliv.name.split(' ')[0] + '</em>' : '') +
        (regs ? ' — you have <b>' + regs + '</b> regular' + (regs!==1?'s':'') + ' ready' : '') + '.</span>' +
        '<span class="hr-actions"><a href="/shop.html?view=regulars" class="hr-btn gold">Shop your regulars →</a>' +
        '<a href="/shop.html" class="hr-btn">Book a slot</a></span>';
    }
  }
})();
