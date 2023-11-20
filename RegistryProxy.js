import { Registry } from '../model/registry/Registry.js';
import { RegistryHelper } from './RegistryHelper.js';
export class RegistryProxy {
    constructor() {
        this.registryHelper = RegistryHelper.getInstance();
    }
    static getInstance() {
        if (!RegistryProxy.instance) {
            RegistryProxy.instance = new RegistryProxy();
        }
        return RegistryProxy.instance;
    }
    static setHostname(hostname) {
        RegistryProxy.hostname = hostname;
    }
    async getRegistry() {
        if (!RegistryProxy.hostname) {
            throw new Error(`RegistryProxy must be initialized with a valid hostname, current value is: ${RegistryProxy.hostname}. Call 'setHostName(hostName)'.`);
        }
        if (!this.registry) {
            if (!this.pendingFetch) {
                this.pendingFetch = new Promise((resolve, reject) => {
                    resolve(fetch(RegistryProxy.hostname + '/api/v1/registry/Registry/0')
                        .then((response) => response.json())
                        .then((json) => {
                        this.registry = Registry.getInstance().fromHttp(json);
                        return this.registry;
                    }));
                    this.pendingFetch = null;
                });
            }
            await this.pendingFetch;
        }
        return this.registry;
    }
    reset() {
        delete this.registry;
        delete this.pendingFetch;
    }
    async getComponent(identifier) {
        const registry = await this.getRegistry();
        const prefix = await this.getNodeType(registry, identifier);
        const serviceDefinition = registry.services[prefix];
        if (!serviceDefinition) {
            throw new Error(`Service not found in registry for: ${prefix}`);
        }
        return serviceDefinition.component;
    }
    async getComponentUrl(identifier) {
        const registry = await this.getRegistry();
        const prefix = this.getNodeType(registry, identifier);
        const serviceDefinition = registry.services[prefix];
        if (!serviceDefinition) {
            throw new Error(`Service not found in registry for: ${prefix}`);
        }
        return serviceDefinition.componentUrl;
    }
    async getEntityUrl(identifier) {
        const registry = await this.getRegistry();
        const prefix = this.getNodeType(registry, identifier);
        const serviceDefinition = registry.services[prefix];
        if (!serviceDefinition) {
            throw new Error(`Service not found in registry for: ${prefix}`);
        }
        return serviceDefinition.clientUrl + '/' + this.registryHelper.escapeIdIfPrefixed(registry, identifier);
    }
    async getClassUrl(modelClass) {
        const prefix = modelClass.namespace
            ?
                modelClass.namespace + '.' + modelClass.name
            :
                modelClass.constructor.namespace + '.' + modelClass.constructor.name;
        const registry = await this.getRegistry();
        const serviceDefinition = registry.services[prefix];
        if (!serviceDefinition) {
            throw new Error(`Service not found in registry for: ${prefix}`);
        }
        return serviceDefinition.clientUrl;
    }
    getNodeType(registry, fullyQualifiedId) {
        const parts = fullyQualifiedId.split(registry.separator);
        const prefix = parts.shift();
        return prefix.substring(prefix.lastIndexOf('/') + 1);
    }
}
RegistryProxy.hostname = location ? location.origin : null;
//# sourceMappingURL=RegistryProxy.js.map