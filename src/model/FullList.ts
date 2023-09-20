import ListItem from "./ListItem";

interface List {
    list: ListItem[];
    load(): void;
    save(): void;
    clearList(): void;
    addItem(itemObj: ListItem): void;
    removeItem(itemId: string): void;
}

export default class FullList implements List {
    static instance: FullList = new FullList();

    get list(): ListItem[] {
        return this._List;
    }
    set list(value: ListItem[]) {
        this._List = value;
    }
    private constructor(private _List: ListItem[] = []) {}

    load(): void {
        // Get the stored list from local storage if its exists already if not union it with null
        const storedList: string | null = localStorage.getItem("MyList");

        // Add a type guard
        if (typeof storedList !== "string") return;

        const parsedList: {
            _id: string;
            _itemTitle: string;
            _itemDesc: string;
            _itemDate: string;
            _checked: boolean;
        }[] = JSON.parse(storedList);

        parsedList.forEach((itemObj) => {
            const newListItem = new ListItem(
                itemObj._id,
                itemObj._itemTitle,
                itemObj._itemDesc,
                itemObj._itemDate,
                itemObj._checked
            );
            FullList.instance.addItem(newListItem);
        });
    }
    save(): void {
        // save the list to local storage
        localStorage.setItem("MyList", JSON.stringify(this._List));
    }
    clearList(): void {
        this.list = [];
        this.save();
    }
    addItem(itemObj: ListItem): void {
        this.list.push(itemObj);
        this.save();
    }
    removeItem(itemId: string): void {
        this.list = this.list.filter((item) => item.id !== itemId);
        this.save();
    }
}
