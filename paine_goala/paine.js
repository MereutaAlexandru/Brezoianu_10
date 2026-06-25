var DB_URL = 'https://brezoianu10-default-rtdb.europe-west1.firebasedatabase.app';

document.addEventListener('DOMContentLoaded', function () {
    var tabs = document.querySelectorAll('.tab-btn');
    var container = document.getElementById('produse');

    if (!tabs.length || !container) return;

    function renderSimplu(produse) {
        container.innerHTML = produse.map(function (p) {
            var soldOutClass = p.soldOut ? ' sold-out' : '';
            var overlay = p.soldOut ? '<div class="sold-out-overlay"></div>' : '';
            return '<div class="produs' + soldOutClass + '">' +
                overlay +
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
            var soldOutClass = p.soldOut ? ' sold-out' : '';
            var overlay = p.soldOut ? '<div class="sold-out-overlay"></div>' : '';
            return '<div class="produs' + soldOutClass + '">' +
                overlay +
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

        fetch(DB_URL + '/bars/paine_goala/' + btn.dataset.category + '.json')
            .then(function (r) { return r.json(); })
            .then(function (data) {
                var produse = data ? (Array.isArray(data) ? data : Object.values(data)) : [];
                produse.sort(function (a, b) {
                    return (a.order !== undefined ? a.order : 9999) - (b.order !== undefined ? b.order : 9999);
                });
                var vizibile = produse.filter(function (p) { return !p.ascuns; });
                if (tip === 'detaliat') renderDetaliat(vizibile);
                else renderSimplu(vizibile);
            });
    }

    tabs.forEach(function (btn) {
        btn.addEventListener('click', function () { loadTab(btn); });
    });

    var activ = document.querySelector('.tab-btn.activ');
    if (activ) loadTab(activ);
});
