const initDotsMenu = () => {
    const toggle = document.getElementById("dots-menu-toggle");
    const dropdown = document.getElementById("dots-menu-dropdown");
    if (!toggle || !dropdown) return;

    toggle.addEventListener("click", () => {
        const isOpen = !dropdown.classList.contains("hidden");
        dropdown.classList.toggle("hidden", isOpen);
        dropdown.classList.toggle("flex", !isOpen);
        toggle.setAttribute("aria-expanded", String(!isOpen));
    });

    document.addEventListener("click", (e) => {
        if (!toggle.contains(e.target as Node) && !dropdown.contains(e.target as Node)) {
            dropdown.classList.add("hidden");
            dropdown.classList.remove("flex");
            toggle.setAttribute("aria-expanded", "false");
        }
    });
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDotsMenu);
} else {
    initDotsMenu();
}
