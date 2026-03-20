import { ServiceStatusValue } from './ServiceStatusValue';
import { Service } from './Service';

export class Status {

    service: Service;
    status: ServiceStatusValue;

    constructor(service: Service, status: ServiceStatusValue) {
        this.service = service;
        this.status = status;
    }
}