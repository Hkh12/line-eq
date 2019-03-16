import parse from "./parser";

const path = document.querySelector("path.line");
const errors = document.querySelector("#error");
const form = document.querySelector("form");

form.addEventListener("submit", ev => {
    ev.preventDefault();
    try {
        errors.innerHTML = "";
        const { slope, x, y } = parse(form.elements.equation.value);

        const d = slope === Infinity ? `M ${150 + x} 0 l 0 300` :
            slope === 0 ? `M 0 ${150 - y} l 300 0` :
                `M ${150 + x} ${150 - y} l ${150 - x} ${-slope * 150 - y} l -300 ${slope * 300}`;
        path.setAttribute("d", d);
    } catch ({ message: m }) {
        errors.innerHTML = m;
    }
});
