
class FilterView {
    _data;
    _parentElement = document.querySelector('.main');
    _tabletsContainer = document.querySelector('.filter-tablets');
    _clearBtn = document.querySelector('.filter__span--clear');

    addHandlerClear(handler) {
        this._clearBtn.addEventListener('click', () => {
            this._tabletsContainer.innerHTML = '';
            handler();
        });
    }

    addHandlerRemoveFilter(handler) {
        this._tabletsContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.tablet__btn--filtered');
            if(!btn) return;
            const removeTag = btn.innerText;
            handler(removeTag);
        })
    }

    render(data) {
        if (!data) return;
        this._data = data;
        const markup = `${data.map(j => this.jobMarkup(j)).join('')}`;
        this._clear();
        this._tabletsContainer.insertAdjacentHTML('beforeend', markup);
    }

    jobMarkup(filterString) {
        return `
         <button class="tablet__btn tablet__btn--filtered">${filterString}</button>
        `
    }
    _clear() {
        this._tabletsContainer.innerHTML = '';
    }
}

export default new FilterView();