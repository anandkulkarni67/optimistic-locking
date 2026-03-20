

export class CustomerMetadata {

    id: string;
    firstname: string;
    lastname: string;
    version:number;

    constructor(id: string, firstname: string, lastname: string, version: number) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.version = version;
    }

}