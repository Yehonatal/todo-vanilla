import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement;
    clear(): void;
    render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
    ul: HTMLUListElement;
    static instance: ListTemplate = new ListTemplate();
    private constructor() {
        this.ul = document.getElementById("listItems") as HTMLUListElement;
    }

    clear(): void {
        this.ul.innerHTML = "";
    }

    render(fullList: FullList): void {
        this.clear();

        fullList.list.forEach((item) => {
            const li = document.createElement("li") as HTMLLIElement;
            li.className =
                "item bg-[#3c3c3c] px-4 py-2 flex-col relative w-full";
            const check = document.createElement("input") as HTMLInputElement;
            check.type = "checkbox";
            check.id = item.id;
            check.className = "checkbox hidden";
            check.checked = item.checked;

            check.addEventListener("change", () => {
                item.checked = !item.checked;
                fullList.save();
            });

            //  Title
            const todoTitle = document.createElement(
                "label"
            ) as HTMLLabelElement;
            todoTitle.className =
                "todo-title font-extrabold text-2xl mb-2 select-none";
            todoTitle.htmlFor = item.id;
            todoTitle.textContent = item.itemTitle;

            // Description
            const todoDesc = document.createElement(
                "p"
            ) as HTMLParagraphElement;
            todoDesc.className = "desc mt-2";
            todoDesc.textContent = item.itemDesc;

            // Date
            const todoDate = document.createElement(
                "p"
            ) as HTMLParagraphElement;
            todoDate.className = "date mt-2 text-sm";
            todoDate.textContent = item.itemDate;

            // Delete button
            const todoDelete = document.createElement(
                "button"
            ) as HTMLButtonElement;
            todoDelete.className =
                "button px-5 absolute -right-2 bottom-2 flex items-center justify-center font-bold group";

            todoDelete.addEventListener("click", () => {
                fullList.removeItem(item.id);
                this.render(fullList);
            });

            const img = document.createElement("img") as HTMLImageElement;
            img.src = "./src/assets/remove.svg";
            img.alt = "Remove this item from the list ";
            todoDelete.appendChild(img);

            li.appendChild(check);
            li.appendChild(todoTitle);
            li.appendChild(todoDesc);
            li.appendChild(todoDate);
            li.appendChild(todoDelete);

            this.ul.append(li);
        });
    }
}
