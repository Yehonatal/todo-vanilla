export interface Item {
    id: string;
    itemTitle: string;
    itemDesc: string;
    itemDate: string;
    checked: boolean;
}

export default class ListItem implements Item {
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get itemTitle(): string {
        return this._itemTitle;
    }
    public set itemTitle(value: string) {
        this._itemTitle = value;
    }
    public get itemDesc(): string {
        return this._itemDesc;
    }
    public set itemDesc(value: string) {
        this._itemDesc = value;
    }
    public get itemDate(): string {
        return this._itemDate;
    }
    public set itemDate(value: string) {
        this._itemDate = value;
    }
    public get checked(): boolean {
        return this._checked;
    }
    public set checked(value: boolean) {
        this._checked = value;
    }

    constructor(
        private _id: string = "",
        private _itemTitle: string = "",
        private _itemDesc: string = "",
        private _itemDate: string = "",
        private _checked: boolean = false
    ) {}
}
