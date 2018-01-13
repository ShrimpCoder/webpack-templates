
export default class Router {
    constructor (router = {}) {
        this.router = router
        this.map()
    }

    map () {
        if (!this.router) return

        if (typeof this.router !== 'object') {
            throw new Error('Mapper must be a Object.')
        }

        let page = $('body').data('page'),
            router = this.router,
            routerName;

        for (routerName in router) {
            if (page === routerName) {
                this.use(router[routerName])
            }
        }

        return this
    }

    use (component) {
        if (!component) return

        if (Array.isArray(component)) {
            component.map(item => {
                item()
            })
        } else {
            component()
        }
    }
}
