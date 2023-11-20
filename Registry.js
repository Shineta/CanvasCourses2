import { BaseModel as Parent } from '../BaseModel.js';
import { ComponentDefinition } from './ComponentDefinition.js';
import { ServiceDefinition } from './ServiceDefinition.js';
export class Registry extends Parent {
    static getInstance() {
        return new Registry();
    }
    constructor() {
        super();
        this.separator = '::';
        this.hostUrl = '';
        this.pathToProjectRoot = '../../../../../../..';
        this.defaultClientUrl = '${hostUrl}/api/v1/${namespace}/${className}';
        this.defaultServerUrl = 'local';
        this.defaultComponentUrl = '${hostUrl}/node_modules/${package}/dist/client/index.js';
        this.prefixMap = {};
    }
    fromHttp(content) {
        this.services = {};
        this.components = [];
        if (content !== undefined) {
            if (content.separator) {
                this.separator = content.separator;
            }
            if (content.hostUrl) {
                this.hostUrl = content.hostUrl;
            }
            if (content.pathToProjectRoot) {
                this.pathToProjectRoot = content.pathToProjectRoot;
            }
            if (content.defaultClientUrl) {
                this.defaultClientUrl = content.defaultClientUrl;
            }
            if (content.defaultServerUrl) {
                this.defaultServerUrl = content.defaultServerUrl;
            }
            if (content.defaultComponentUrl) {
                this.defaultComponentUrl = content.defaultComponentUrl;
            }
            if (content.services) {
                for (const key of Object.keys(content.services)) {
                    const serviceDefinition = content.services[key];
                    serviceDefinition.id = key;
                    this.services[key] = ServiceDefinition.getInstance().fromHttp(serviceDefinition);
                }
            }
            if (content.components) {
                content.components.forEach((component) => {
                    const componentDefinition = ComponentDefinition.getInstance().fromHttp(component);
                    this.components.push(componentDefinition);
                });
            }
            if (content.cloudfrontEndpoint) {
                this.cloudfrontEndpoint = content.cloudfrontEndpoint;
            }
            if (content.s3ImageBucket) {
                this.s3ImageBucket = content.s3ImageBucket;
            }
            if (content.s3ImageFolder) {
                this.s3ImageFolder = content.s3ImageFolder;
            }
            if (content.s3AudioFolder) {
                this.s3AudioFolder = content.s3AudioFolder;
            }
            if (content.workflow) {
                this.workflow = content.workflow;
            }
            if (content.prefixMap) {
                this.prefixMap = content.prefixMap;
            }
        }
        return this;
    }
    toHttp() {
        const out = {};
        out.separator = this.separator;
        out.services = {};
        out.components = [];
        for (const key of Object.keys(this.services)) {
            out.services[key] = this.services[key].toHttp();
        }
        out.components = this.components.map((component) => component.toHttp());
        out.cloudfrontEndpoint = this.cloudfrontEndpoint;
        out.s3ImageBucket = this.s3ImageBucket;
        out.s3ImageFolder = this.s3ImageFolder;
        out.workflow = this.workflow;
        out.prefixMap = this.prefixMap;
        return out;
    }
}
Registry.namespace = 'registry';
//# sourceMappingURL=Registry.js.map