var DB_URL = 'https://brezoianu10-default-rtdb.europe-west1.firebasedatabase.app';

document.addEventListener('DOMContentLoaded', function () {
    var tabs = document.querySelectorAll('.tab-btn');
    var container = document.getElementById('produse');

    if (!tabs.length || !container) return;

    function renderSimplu(produse) {
        container.innerHTML = produse.map(function (p) {
            return '<div class="produs">' +
                '<div class="produs-top">' +
                '<span class="produs-nume">' + p.nume + '</span>' +
                '<span class="produs-pret">' + p.pret + ' LEI</span>' +
                '</div>' +
                '<div class="produs-linie"></div>' +
                (p.alergii ? '<div class="produs-alergii">Alergii: ' + p.alergii + '</div>' : '') +
                '</div>';
        }).join('');
    }

    function renderDetaliat(produse) {
        container.innerHTML = produse.map(function (p) {
            return '<div class="produs">' +
                '<div class="produs-top">' +
                '<span class="produs-nume">' + p.nume + '</span>' +
                '<span class="produs-pret">' + p.pret + ' LEI</span>' +
                '</div>' +
                '<div class="produs-linie"></div>' +
                (p.ingrediente ? '<div class="produs-ingrediente">' + p.ingrediente + '</div>' : '') +
                (p.alergii ? '<div class="produs-alergii">Alergii: ' + p.alergii + '</div>' : '') +
                '</div>';
        }).join('');
    }

    function loadTab(btn) {
        tabs.forEach(function (t) { t.classList.remove('activ'); });
        btn.classList.add('activ');
        var tip = btn.dataset.tip;

        var url = DB_URL + '/bars/paine_goala/' + btn.dataset.category + '.json';
        fetch(url)
            .then(function (r) { return r.json(); })
            .then(function (data) {
                var produse = data ? (Array.isArray(data) ? data : Object.values(data)) : [];
                if (tip === 'detaliat') renderDetaliat(produse);
                else renderSimplu(produse);
            });
    }

    tabs.forEach(function (btn) {
        btn.addEventListener('click', function () { loadTab(btn); });
    });

    var activ = document.querySelector('.tab-btn.activ');
    if (activ) loadTab(activ);
});
