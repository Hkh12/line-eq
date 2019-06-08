/**
 * Parses a line equation.
 * @param {string} eq 
 */
export default function parse(eq) {
    eq = eq.replace(/\s/g, "").toLowerCase();

    const sides = eq.split("=");
    if (sides.length > 2) throw new Error("invalid expression");
    
    const [left, right] = sides;
    if (!left || !right) throw new Error("got an empty expression");
    
    const standard = right.match(/^([-+]?\d*)x([+-]\d+)?$/);
    const general = left.match(/^([-+]?\d*)x([-+]\d*)y([-+]\d+)?$/);
    if (!isNaN(+right) && ["x", "y"].includes(left)) {
        return {
            slope: left === "x" ? Infinity : 0,
            x: left === "x" ? +right : Infinity,
            y: left === "y" ? +right : Infinity,
        };
    } else if (left === "y" && standard) {
        const slope = standard[1] === "-" ? -1 : +(standard[1] || "1"),
        y = +(standard[2] || "0");
        return { slope, y, x: -y / slope };
    } else if (general && right === "0") {
        const [a, b, c] = general.slice(1).map(e => {
            if (e === "" || e === "+") return 1;
            if (e === "-") return -1;
            if (e === undefined) return 0;
            return +e;
        });
        return {
            slope: -a / b,
            y: -c / b,
            x: -c / a
        };
    } throw new Error("failed to parse");
}