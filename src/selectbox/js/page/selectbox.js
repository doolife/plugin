class Selectbox {
    static instances = [];

    constructor(options) {
        this.options = {
            el: "#select1",
            items: [
                { label: '옵션1 - 배열', value: [1, 2, 3] },
                { label: '옵션2 - 오브젝트', value: { a: 1, b: 2, c: 3 } },
                { label: '옵션3 - 문자열', value: 'server_03' },
                { label: '옵션4 - 숫자', value: 4 }
            ],
            placeholder: '캐릭터를 선택해주세요.2',
            disabled: false,
            ...options,
        };

        this.wrapper = document.querySelector(this.options.el);
        this.title = document.createElement("div");
        this.title.classList.add("select-box__tit");
        this.title.setAttribute("data-value", "");
        this.title.textContent = this.options.placeholder;
        this.wrapper.appendChild(this.title);

        this.menu = document.createElement("ul");
        this.menu.classList.add("select-box__menu");
        this.wrapper.appendChild(this.menu);

        this.isOpen = false;
        this.selectedValue = null;
        this.selectedLabel = this.options.placeholder;
        this.itemValues = [];

        this.init();
        Selectbox.instances.push(this);
    }

    init() {
        this.renderOptions();
        this.setupEventListeners();
        this.updateDisabledState();
    }

    setupEventListeners() {
        this.title.addEventListener("click", (evt) => this.toggleDropdown(evt));
        this.wrapper.addEventListener("click", (evt) => this.handleItemClick(evt));
        document.addEventListener("click", () => this.hideDropdown());
    }

    static closeOtherSelectboxes(currentInstance) {
        Selectbox.instances.forEach(instance => {
            if (instance !== currentInstance && instance.isOpen) {
                instance.hideDropdown();
            }
        });
    }

    toggleDropdown(evt) {
        evt.stopPropagation();
        if (this.isDisabled()) return;
        Selectbox.closeOtherSelectboxes(this);
        this.isOpen ? this.hideDropdown() : this.showDropdown();
    }

    showDropdown() {
        this.wrapper.classList.add("active");
        this.isOpen = true;
    }

    hideDropdown() {
        this.wrapper.classList.remove("active");
        this.isOpen = false;
    }

    handleItemClick(evt) {
        if (evt.target.classList.contains("select-box__list")) {
            const label = evt.target.textContent;
            const dataId = evt.target.getAttribute("data-id");
            const jsonString = evt.target.getAttribute("data-value");

            this.title.textContent = label;
            this.title.setAttribute("data-value", jsonString);

            this.selectedValue = this.itemValues[dataId];
            this.selectedLabel = label;

            this.triggerChange();
            this.hideDropdown();
        }
    }

    renderOptions() {
        this.options.items.forEach((item, idx) => {
            const li = this.createListItem(item, idx);
            this.menu.appendChild(li);
        });
    }

    createListItem(item, idx) {
        const li = document.createElement("li");
        const jsonString = JSON.stringify(item.value);

        this.itemValues.push(item.value);

        li.classList.add("select-box__list");
        li.setAttribute("data-id", idx);
        li.setAttribute("data-value", jsonString.replace(/\"/g, ''));
        li.textContent = item.label;

        return li;
    }

    update(options) {
        if (options.selected !== undefined) {
            this.updateSelected(options.selected, options.items);
        }
        if (options.disabled !== undefined) {
            this.options.disabled = options.disabled;
            this.updateDisabledState();
        }
        if (options.items !== undefined) {
            this.updateItems(options.items);
        }
        if (options.placeholder !== undefined) {
            this.updatePlaceholder(options.placeholder);
        }
    }

    updateSelected(selectedValue, items) {
        console.log(items);  // 이 부분을 통해 selectedValue 값 확인
        const selectedIdx = this.itemValues.findIndex(itemValue => JSON.stringify(itemValue) === JSON.stringify(selectedValue));

        if (selectedIdx !== -1) {
            const returnTitle = items.find(item => item.value === selectedValue);
            const selectedLabel = this.options.items[selectedIdx].label;
            this.updateTitleAndValue(returnTitle.label, selectedValue);
            this.updateSelectedStyle(selectedIdx);
        }
    }

    updateTitleAndValue(label, value) {
        this.title.textContent = label;
        this.title.setAttribute("data-value", JSON.stringify(value));
        this.selectedValue = value;
        this.selectedLabel = label;
    }

    updateSelectedStyle(selectedIdx) {
        const selectedListItem = this.menu.querySelector(`[data-id="${selectedIdx}"]`);
        if (selectedListItem) {
            this.menu.querySelectorAll(".select-box__list").forEach(item => {
                item.classList.remove("selected");
            });
            selectedListItem.classList.add("selected");
        }
    }

    updateDisabledState() {
        if (this.isDisabled()) {
            this.wrapper.setAttribute("disabled", "");
        } else {
            this.wrapper.removeAttribute("disabled");
        }
    }

    isDisabled() {
        return this.options.disabled || this.disabled;
    }

    updateItems(items) {
        this.menu.innerHTML = "";
        this.itemValues = [];
        items.forEach((item, idx) => {
            const li = this.createListItem(item, idx);
            this.menu.appendChild(li);
        });
    }

    updatePlaceholder(placeholder) {
        this.options.placeholder = placeholder;
        this.title.textContent = placeholder;
    }

    on(eventName, callback) {
        this.eventHandlers = this.eventHandlers || {};
        this.eventHandlers[eventName] = this.eventHandlers[eventName] || [];
        this.eventHandlers[eventName].push(callback);
    }

    triggerChange() {
        if (this.eventHandlers && this.eventHandlers["change"]) {
            this.eventHandlers["change"].forEach(callback => {
                callback();
            });
        }
    }
}

export default Selectbox;