class Menu {
    constructor(data) {
        this.data = data, this.menu = document.createElement("select"); // Create selection panel
        document.body.appendChild(this.menu);
        // Creates drop down names based on object presented
        for (let i in data) {
            const option = document.createElement("option");
            this.menu.appendChild(option);
            // Key becomes index
            option.innerHTML = i;
        }
    }
    get value() {return this.data[this.menu.value];} // Get data value based on own id
}
class Concatenator {
    constructor(menus, prefixes, colors) {
        if (colors.length !== prefixes.length || prefixes.length !== menus.length+1) throw new Error("Invalid array lengths passed");
        this.menus = menus, this.prefixes = prefixes, this.colors = colors;
        // Submit button
        this.concatenate = document.createElement("button");
        this.concatenate.innerHTML = "Concatenate";
        document.body.appendChild(document.createElement("br"));
        document.body.appendChild(this.concatenate);
        // Containers
        this.container = document.createElement("div");
        document.body.appendChild(this.container);
        // On mouse click
        this.concatenate.addEventListener("mousedown", this.concat.bind(this));
    }
    concat() {
        // Removing children
        for (let i = this.container.children.length-1; i >= 0; i--) this.container.removeChild(this.container.children[i]);
        // Adding text
        for (let i = 0; i < this.menus.length; i++) {
            this.addText(this.container, this.prefixes[i], this.colors[i]); // Prefix
            this.addText(this.container, this.menus[i].value); // Value
        }
        this.addText(this.container, this.prefixes[this.menus.length], this.colors[this.menus.length]); //Suffix
    }
    addText(parent, str, color) {
        // Creating element
        const a = document.createElement("a");
        parent.appendChild(a);
        if (color) a.style.color = color; // Setting color
        a.innerHTML = str; // Setting text
    }
}
const data = {}, slices = text.split(/[\t\n]/);
for (let i = 0; i < slices.length; i += 2) {
    // Setting id
    const id = slices[i][0];
    if (!data[id]) data[id] = {};
    // Value within id
    data[id][slices[i]] = slices[i+1];
}
// Menus
const menus = [];
for (let i in data) menus.push(new Menu(data[i])); // Array of menus
// Concatenator
const concatenator = new Concatenator(menus, ["x", "y", "z", "w"], ["red", "green", "blue", "orange"]);
