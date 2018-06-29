export class ContactUpdated {
    constructor(contact) {
        this.contact = contact
    }
}

export class ContactViewed {
    constructor(contact) {
        this.contact = contact
    }
}

export class PageChanged {
    constructor(page) {
        this.page = page
    }
}
