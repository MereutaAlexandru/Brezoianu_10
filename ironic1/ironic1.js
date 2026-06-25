document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab-btn');
    const container = document.getElementById('produse');

    if (!tabs.length || !container) return;

    function renderProduse(produse) {
        container.innerHTML = produse.map(function (p) {
            var berarieName = p.berarie === 'Ironic' ? ';)' : p.berarie;
            var parts = [];
            if (p.tip) parts.push(p.tip);
            if (p.alcool) parts.push(p.alcool + '%');
            var detalii = parts.join(' · ');
            return '<div class="produs">' +
                '<div class="produs-top">' +
                '<span class="produs-nume">' + p.nume + (berarieName ? ' <span class="produs-tip">- ' + berarieName + '</span>' : '') + '</span>' +
                '<span class="produs-pret">' + (isNaN(p.pret) ? p.pret : p.pret + ' LEI') + '</span>' +
                '</div>' +
                '<div class="produs-linie"></div>' +
                '<div class="produs-detalii">' + detalii + '</div>' +
                '</div>';
        }).join('');
    }

    function loadTab(btn) {
        tabs.forEach(function (t) { t.classList.remove('activ'); });
        btn.classList.add('activ');
        var label = document.querySelector('.tabs-label');
        var hideLabel = btn.dataset.json === 'soft_drinks.json';
        if (label) label.style.visibility = hideLabel ? 'hidden' : 'visible';
        fetch(btn.dataset.json)
            .then(function (r) { return r.json(); })
            .then(renderProduse);
    }

    tabs.forEach(function (btn) {
        btn.addEventListener('click', function () { loadTab(btn); });
    });

    var activ = document.querySelector('.tab-btn.activ');
    if (activ) loadTab(activ);
});
