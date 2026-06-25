var DB_URL = 'https://brezoianu10-default-rtdb.europe-west1.firebasedatabase.app';

document.addEventListener('DOMContentLoaded', function () {
    var tabs = document.querySelectorAll('.tab-btn');
    var container = document.getElementById('produse');

    if (!tabs.length || !container) return;

    function renderProduse(produse) {
        container.innerHTML = produse.map(function (p) {
            return '<div class="produs">' +
                '<div class="produs-top">' +
                '<span class="produs-nume">' + p.nume + '<span class="produs-gramaj"> ' + (p.gramaj || '') + '</span></span>' +
                '<span class="produs-pret">' + p.pret + ' LEI</span>' +
                '</div>' +
                '<div class="produs-linie"></div>' +
                (p.ingrediente ? '<div class="produs-ingrediente">' + p.ingrediente + '</div>' : '') +
                (p.alergii ? '<div class="produs-alergii">Allergens: ' + p.alergii + '</div>' : '') +
                '</div>';
        }).join('');
    }

    function loadTab(btn) {
        tabs.forEach(function (t) { t.classList.remove('activ'); });
        btn.classList.add('activ');

        var url = DB_URL + '/bars/mo_bucharest/' + btn.dataset.category + '.json';
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
