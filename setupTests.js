window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

global.IntersectionObserver = class IntersectionObserver {
    constructor(callback, options) {
        this.callback = callback;
        this.options = options;
    }

    observe(element) {
        this.callback([{ isIntersecting: true, target: element }]);
    }

    unobserve() {
        return null;
    }

    disconnect() {
        return null;
    }
};