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
    ) { }
}

export interface Date {
    year: number;
    month: number;
    day: number;
}

// export interface Tag {
//     value: any,
//     display: string
// }
