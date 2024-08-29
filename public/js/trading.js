'use strict';

const addSymbolToFavourites = async (symbol) => {
    const response = await fetch('/api/v1/symbol/add', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol }),
    });

    const responseBody = await response.json();

    if (responseBody.error) {
        alert(responseBody.message);
    } else {
        location.reload();
    }
};

const removeSymbolFromFavourites = async (symbol) => {
    const response = await fetch('/api/v1/symbol/delete', {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol }),
    });

    const responseBody = await response.json();

    if (responseBody.error) {
        alert(responseBody.message);
    } else {
        location.reload();
    }
};

document.addEventListener('click', (event) => {
    const element = event.target;

    if (element.matches('.add-favourite')) {
        const symbol = element.innerText;
        addSymbolToFavourites(symbol);
    } else if (element.matches('.remove-favourite')) {
        const symbol = element.innerText;
        removeSymbolFromFavourites(symbol);
    }
});
