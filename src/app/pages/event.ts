export class Event {
    constructor(
        id: number,
        title: string,
        location: string,
        date: Date,
        start_time: string,
        end_time: string,
        description: string,
        type: boolean,
        category: string,
        tags: Array<Object>,
        link: boolean,
        link_fb: string,
        link_tw: string,
        image: Upload,
        tickets: Ticket[]
    ) { }
}

export interface Date {
    year: number;
    month: number;
    day: number;
}

export class Upload {
    $key: string;
    file: File;
    name: string;
    url: string;
    progress: number;
    // createdAt: Date = new Date();
    constructor(file: File) {
        this.file = file;
    }
}

export interface Ticket {
    ticket_title: string;
    price: number;
    quantity: number;
}

