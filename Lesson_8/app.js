'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function () {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function (header) {
    header.addEventListener('click', function (event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function () {
    filterSizes.classList.toggle('hidden');
});


class ProdAtr {
    constructor(prodName, price) {
        this.prodName = prodName;
        this.nums = 1;
        this.price = price;
    }
}

let allBasket = [];
let numProd = document.querySelector('.num_basket');

document.querySelector('.cartIcon').addEventListener('click', function () {
    let el = document.querySelector(".basket_table");
    if (el.classList.contains('invis')) {
        el.classList.remove('invis');
    } else {
        el.classList.add('invis');
    }
});

document.querySelector('.featuredItems').addEventListener('click', function (event) {
    if (event.target.tagName !== "BUTTON") {
        return;
    }
    const dataEl = event.target.parentNode.parentNode.nextElementSibling;
    const prodName = dataEl.querySelector('.featuredName').innerText;
    const price = Number(dataEl.querySelector('.featuredPrice').innerText.slice(1));

    let findEl = allBasket.find(item => item.prodName === prodName);
    let prod = new ProdAtr(prodName, price);

    if (findEl) {
        findEl.nums += 1;
        numProd.innerText = Number(numProd.innerText) + 1;
        let list_prod = document.querySelectorAll(".basket_row");
        list_prod.forEach(function (item) {
            if (item.innerText.includes(findEl.prodName)) {
                item.innerHTML = `<div class="line">${findEl.prodName}</div>
                <div class="line">${findEl.nums} шт.</div>
                <div class="line">$${findEl.price}</div>
                <div class="line">$${findEl.nums * findEl.price}</div>`;
            }

        });
    } else {
        allBasket.push(prod);
        numProd.innerText = Number(numProd.innerText) + 1;
        document.querySelector('.basket_footer').insertAdjacentHTML("beforebegin", `<div class="basket_row">
            <div class="line">${prod.prodName}</div>
            <div class="line">${prod.nums} шт.</div>
            <div class="line">$${prod.price}</div>
            <div class="line">$${prod.price}</div>
    </div>`);
    }
    let sumProd = 0;
    allBasket.forEach(function (item) {
        sumProd += item.nums * item.price;
    })
    document.querySelector(".basket_footer").textContent = `Товаров в корзине на сумму: $${sumProd}`;
});