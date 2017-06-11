declare namespace dbwrapper {
    export interface Iuser_post_data {
        name: string;
        password: string;
        roles: Array<string>;
        type: string;
        _rev?: string;
    }
    export interface Iresponse {
        ok: string;
        error: Error;
    }
    export interface IExistingUser {
        _rev: string;
    }

    export type add_or_update_user = (
        username: string,
        password:string,
        done,
        existing_user: IExistingUser) => void;
}