$(document).ready(function () {
    $('#menu li').hover(function () {
        $(this).find('ul').stop(true, true).slideToggle(200);
    });

    let cart = {};
    
    var scrollToTopBtn = $('#scroll-to-top');

    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            scrollToTopBtn.fadeIn();
        } else {
            scrollToTopBtn.fadeOut();
        }
    });

    scrollToTopBtn.click(function () {
        $('html, body').animate({ scrollTop: 0 }, '300');
    });
});
    $('.buy-btn').click(function () {
        const productId = $(this).data('product-id');
        const productName = $(this).closest('.product').find('h3').text();
        const productPrice = parseFloat($(this).data('price'));

        if (!cart[productId]) {
            cart[productId] = {
                name: productName,
                price: productPrice,
                quantity: 1
            };
        } else {
            cart[productId].quantity++;
        }

        $(this).replaceWith(`
            <input type="number" class="quantity-input" data-product-id="${productId}" value="${cart[productId].quantity}" min="1">
        `);

        updateCartCount();
        updateCartModal();
    });

    $(document).on('change', '.quantity-input', function () {
        const productId = $(this).data('product-id');
        const newQuantity = parseInt($(this).val());

        if (newQuantity <= 0) {
            delete cart[productId];
            $(this).replaceWith(`
                <button class="buy-btn" data-product-id="${productId}" data-price="${cart[productId].price}">Add to Cart</button>
            `);
        } else {
            cart[productId].quantity = newQuantity;
        }

        updateCartCount();
        updateCartModal();
    });

    function updateCartCount() {
        let totalCount = 0;
        for (let id in cart) {
            totalCount += cart[id].quantity;
        }
        $('#cart-count').text(totalCount);
    }

    function updateCartModal() {
        let cartItemsHtml = '';
        let totalPrice = 0;
        for (let id in cart) {
            const item = cart[id];
            totalPrice += item.price * item.quantity;
            cartItemsHtml += `
                <div class="cart-item">
                    <span>${item.name}</span>
                    <span>${item.quantity} x $${item.price.toFixed(2)}</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `;
        }
        $('#cart-items').html(cartItemsHtml);
        $('#total-price').text(totalPrice.toFixed(2));
    }

    $('#cart-btn').click(function () {
        $('#cart-modal').show();
    });

    $('.close-btn').click(function () {
        $('#cart-modal').hide();
    });

    $(window).click(function (event) {
        if ($(event.target).is('#cart-modal')) {
            $('#cart-modal').hide();
        }
    });
window.onscroll = function(){
    var scrollTopButton = document.getElementById('sroll-to-top');
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
        scrollTopButton.style.display - 'block';
    } else {
        scrollTopButton.style.display = 'b'
    }
}

let cart = {
    items: [],
    total: 0,
    itemCount: 0
};

document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const productElement = event.target.closest('.product');
        const productId = productElement.getAttribute('data-product-id');
        const productName = productElement.querySelector('h3').innerText;
        const productPrice = parseInt(productElement.querySelector('p').innerText.replace('₽', ''));

        addToCart(productId, productName, productPrice);
    });
});

function addToCart(productId, productName, productPrice) {
    let existingProduct = cart.items.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.items.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    cart.total += productPrice;
    cart.itemCount++;
    updateCartDisplay();
}
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ${item.price}₽ x ${item.quantity}`;
        cartItemsContainer.appendChild(listItem);
    });

    document.getElementById('cart-total').textContent = `Общая сумма: ${cart.total}₽`;
    document.getElementById('cart-count').textContent = `Количество товаров: ${cart.itemCount}`;
}

$(document).ready(function () {
    $('#profile-btn').click(function () {
        $('.profile-dropdown').toggle();
    });
    $(document).click(function (event) {
        if (!$(event.target).closest('#profile-btn').length) {
            $('.profile-dropdown').hide();
        }
    });
});
