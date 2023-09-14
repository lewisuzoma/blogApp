export interface IUsers {
    id: number;
    name: string;
    user: string;
    email: string;
    address?: IUsersAddress | '';
    phone: string;
    website?: string;
    company?: IUsersCompany | '';
    date: Date | null;
    age: number,
    active: boolean,
}

export interface IUsersAddress {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
    geo?: {
        lat: string,
        lng: string,
    }
}

export interface IUsersCompany {
    name?: string;
    catchPhrase?: string;
    bs?: string;
}
