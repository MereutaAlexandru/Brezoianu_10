document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab-btn');
    const container = document.getElementById('produse');

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
        fetch(btn.dataset.json)
            .then(function (r) { return r.json(); })
            .then(function (data) {
                if (tip === 'detaliat') renderDetaliat(data);
                else renderSimplu(data);
            });
    }

    tabs.forEach(function (btn) {
        btn.addEventListener('click', function () { loadTab(btn); });
    });

    var activ = document.querySelector('.tab-btn.activ');
    if (activ) loadTab(activ);
});
