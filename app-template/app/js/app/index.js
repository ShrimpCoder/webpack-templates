
export default class App {
    constructor(options = {}) {
        this.options = $.extend(true, {
            name: 'app',
            version: 0.0001,
            language: 'zh',
            istest: 1,
            platform: 1,
            host: ``,
            testHost: ``,
            appVersion: '1.0',
            page: $('body').data('page'),
            cnzzId: '',
            data: {},
            onReady() {}
        }, options)

        this.loaded = false;
        this.init()
    }

    init() {
        window.addEventListener('DOMContentLoaded', () => {
            this.options.onReady()
        })
    }
}
