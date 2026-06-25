var DB_URL = 'https://brezoianu10-default-rtdb.europe-west1.firebasedatabase.app';

document.addEventListener('DOMContentLoaded', function () {
    var tabs = document.querySelectorAll('.tab-btn');
    var container = document.getElementById('produse');

    if (!tabs.length || !container) return;

    function renderProduse(produse) {
        container.innerHTML = produse.map(function (p) {
            var berarieName = p.berarie === 'Ironic' ? ';)' : p.berarie;
            var parts = [];
            if (p.tip) parts.push(p.tip);
            if (p.alcool && parseFloat(p.alcool) !== 0) parts.push(p.alcool + '%');
            var detalii = parts.join(' · ');
            return '<div class="produs">' +
                '<div class="produs-top">' +
                '<span class="produs-nume">' + p.nume + (berarieName ? ' <span class="produs-tip">- ' + berarieName + '</span>' : '') + '</span>' +
                '<span class="produs-pret">' + (isNaN(p.pret) ? String(p.pret).toUpperCase() : p.pret + ' LEI') + '</span>' +
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
        var hideLabel = btn.dataset.category === 'soft_drinks';
        if (label) label.style.visibility = hideLabel ? 'hidden' : 'visible';

        var url = DB_URL + '/bars/ironic1/' + btn.dataset.category + '.json';
        fetch(url)
            .then(function (r) { return r.json(); })
            .then(function (data) {
                var produse = data ? (Array.isArray(data) ? data : Object.values(data)) : [];
                renderProduse(produse);
            });
    }

    tabs.forEach(function (btn) {
        btn.addEventListener('click', function () { loadTab(btn); });
    });

    var activ = document.querySelector('.tab-btn.activ');
    if (activ) loadTab(activ);
});
