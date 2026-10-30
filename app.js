function showPopup() {
    document.getElementById("popup").style.display = "flex";
}
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function copyPost() {
    const text = `🚀 I just made my FIRST Open Source Contribution!

From understanding GitHub to creating my first Pull Request — this feels unreal 🤯

✅ My name is now LIVE on a real website
✅ My GitHub graph just turned GREEN
✅ And this is just the beginning!

Huge thanks to @Parul Prashar for making this beginner-friendly 🚀

If you're starting out, THIS is your sign to begin.

🔗 Check it out: https://parulprashar.github.io/Hall-of-PRs/
🎥 Tutorial I followed: https://www.youtube.com/watch?v=DPShl8GWqS8

#FirstPR #OpenSource #GitHub #LearningInPublic`;
    navigator.clipboard.writeText(text);
    alert("Copied! Now paste it on LinkedIn 🚀");
}

function updateCounter() {
    const cards = document.querySelectorAll(".card");
    const count = cards.length;

    const counterElement = document.getElementById("counter-number");
    counterElement.textContent = count;
}

window.addEventListener("load", updateCounter);
function animateCounter(finalCount) {
    let current = 0;
    const counterElement = document.getElementById("counter-number");
    const interval = setInterval(() => {
        current += Math.ceil(finalCount / 30);
        if (current >= finalCount) {
            current = finalCount;
            clearInterval(interval);
        }
        counterElement.textContent = current;
    }, 30);
}

window.addEventListener("load", () => {
    const cards = document.querySelectorAll(".card");
    const count = cards.length;
    animateCounter(count);
});


/* =========================================
   ISSUE #624
   CONTRIBUTOR SEARCH + NEWEST FIRST
========================================= */
window.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".contributors-grid");
    const searchInput = document.getElementById("contributor-search");
    const resultsElement = document.getElementById("search-results");

    if (!grid) {
        console.warn("Contributor grid not found.");
        return;
    }

    // 1. Keep the repository owner's card first.
    const cards = Array.from(grid.querySelectorAll(".card"));

    // Find the owner using the data-owner attribute.
    // Add data-owner="true" to Parul Prashar's card in HTML.
    const ownerCard = grid.querySelector("#owner")?.closest(".card");

    // Reverse the order of all other contributor cards.
    const otherCards = cards.filter((card) => card !== ownerCard);
    otherCards.reverse();

    // Render the owner's card first, followed by newest contributors.
    if (ownerCard) {
        grid.prepend(ownerCard);
    }

    otherCards.forEach((card) => {
        grid.appendChild(card);
    });

    // 2. Add live search functionality.
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.trim().toLowerCase();
            let visibleCount = 0;

            const contributorCards = grid.querySelectorAll(".card");

            contributorCards.forEach((card) => {
                const nameElement = card.querySelector(".name");

                const name = nameElement
                    ? nameElement.textContent.trim().toLowerCase()
                    : "";

                // Find GitHub usernames from links inside the card.
                const githubLinks = Array.from(
                    card.querySelectorAll('a[href*="github.com"]')
                );

                const githubUsername = githubLinks
                    .map((link) => {
                        try {
                            const url = new URL(link.href);

                            if (
                                url.hostname !== "github.com" &&
                                url.hostname !== "www.github.com"
                            ) {
                                return "";
                            }

                            return (
                                url.pathname.split("/").filter(Boolean)[0] || ""
                            );
                        } catch {
                            return "";
                        }
                    })
                    .join(" ")
                    .toLowerCase();

                const matches =
                    name.includes(query) ||
                    githubUsername.includes(query);

                card.hidden = !matches;

                if (matches) {
                    visibleCount++;
                }
            });

            // 3. Display search results.
            if (resultsElement) {
                if (query === "") {
                    resultsElement.textContent = "";
                } else if (visibleCount === 0) {
                    resultsElement.textContent =
                        "No contributors found. Try another search.";
                } else {
                    resultsElement.textContent =
                        `${visibleCount} contributor${
                            visibleCount === 1 ? "" : "s"
                        } found`;
                }
            }
        });
    }
});