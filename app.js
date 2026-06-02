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
