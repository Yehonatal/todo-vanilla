import "./style.css";
import FullList from "./model/FullList";
import ListItem from "./model/ListItem";
import ListTemplate from "./templates/ListTemplate";

const initApp = (): void => {
    const fullList = FullList.instance;
    const template = ListTemplate.instance;

    const itemEntryForm = document.getElementById(
        "itemEntryForm"
    ) as HTMLFormElement;

    itemEntryForm.addEventListener("submit", (event: Event): void => {
        event.preventDefault();
        // Get the input values from the form
        const title = document.getElementById("title") as HTMLInputElement;
        const titleText = title.value.trim();
        if (!titleText.length) return;

        const desc = document.getElementById("desc") as HTMLInputElement;
        const descText = desc.value.trim();
        if (!descText.length) return;

        const date = document.getElementById("date") as HTMLInputElement;
        const dateText = date.value.trim();
        if (!dateText.length) return;

        const itemId: number = fullList.list.length
            ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
            : 1;

        const newItem = new ListItem(
            itemId.toString(),
            titleText,
            descText,
            dateText
        );

        fullList.addItem(newItem);
        template.render(fullList);

        title.value = "";
        desc.value = "";
        date.value = "";
    });

    const clearItems = document.getElementById(
        "clearItemsButton"
    ) as HTMLButtonElement;
    clearItems.addEventListener("click", (): void => {
        fullList.clearList();
        template.clear();
    });

    fullList.load();
    template.render(fullList);
};

document.addEventListener("DOMContentLoaded", initApp);
