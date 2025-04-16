// resizable.js
import '../sass/index.scss';

export const createResizable = ({
        element = "#resizeable",
        children = "#select",
        halfWidth = "50%",
    }) => {
    const root = document.querySelector(element);
    const items = root.querySelectorAll(children);
    const wrapWidth = root.offsetWidth;

    const callbacks = {
        start: null,
        stop: null,
        resize: null,
    };

    const setHalfWidth = (el) => {
        el.style.width = halfWidth;
    };

    const enableResize = (el) => {
        const handle = document.createElement("div");
        handle.className = "resizable--handle";
        el.appendChild(handle);

        let isResizing = false;

        handle.addEventListener("mousedown", (e) => {
            isResizing = true;
            document.body.classList.add("resizing");
            callbacks.start?.(e, { element: el });
        });

        window.addEventListener("mousemove", (e) => {
            if (!isResizing) return;
            const rect = el.getBoundingClientRect();
            const handleWidth = handle.offsetWidth;
            const newWidth = e.clientX - rect.left;
            if (newWidth >= handleWidth && newWidth <= wrapWidth) {
                el.style.width = `${newWidth}px`;
                callbacks.resize?.(e, { element: el, width: newWidth });
            }
        }, { capture: true });

        const endResize = (e) => {
            if (!isResizing) return;
            isResizing = false;
            document.body.classList.remove("resizing");
            callbacks.stop?.(e, { element: el });
        };

        window.addEventListener("mouseup", endResize, { capture: true });
        window.addEventListener("mouseleave", endResize, { capture: true });
    };

    const reset = (selector) => {
        const el = root.querySelector(selector);
        if (el) el.style.width = halfWidth;
    };

    // 초기화
    items.forEach((item) => {
        setHalfWidth(item);
        enableResize(item);
    });

    // 콜백 외부 설정 방식
    return {
        start(fn) {
            callbacks.start = fn;
        },
        stop(fn) {
            callbacks.stop = fn;
        },
        resize(fn) {
            callbacks.resize = fn;
        },
        reset,
    };
};
