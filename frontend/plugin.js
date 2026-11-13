class Plugin {
    constructor() {
        this.plugins = [];
    }

    register(plugin) {
        if (typeof plugin !== 'object' || !plugin.name || !plugin.init) {
            throw new Error('Invalid plugin format');
        }
        this.plugins.push(plugin);
        console.log(`Plugin ${plugin.name} registered.`);
    }
    initAll() {
        this.plugins.forEach((plugin) => {
            try {
                plugin.init();
                console.log(`Plugin ${plugin.name} initialized.`);
            } catch (error) {
                console.error(
                    `Failed to initialize plugin ${plugin.name}:`,
                    error
                );
            }
        });
    }
}
