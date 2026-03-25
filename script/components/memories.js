(function () {
  window.Components = window.Components || {};

  window.Components.memories = {
    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-memories";

      const cards = (section.items || []).map((item) => {
        const safeImage = item.image ? `style="background-image:url('${item.image}')" ` : "";
        return `
          <article class="memory-card">
            <div class="memory-photo" ${safeImage}></div>
            <div class="memory-copy">
              <h3>${item.heading || ""}</h3>
              <p>${item.text || ""}</p>
            </div>
          </article>
        `;
      }).join("");

      div.innerHTML = `
        <div class="memory-header">
          <span class="memory-pill">New</span>
          <h2>${section.title || "My favourite moments"}</h2>
          <p>Snapshots I love replaying, and one blank spot for whatever we do next.</p>
        </div>
        <div class="memory-grid">${cards}</div>
      `;

      // add tilt on hover for each card
      div.addEventListener("mousemove", (e) => {
        const card = e.target.closest(".memory-card");
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const rotateX = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
        const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
        card.style.setProperty("--tiltX", `${rotateX}deg`);
        card.style.setProperty("--tiltY", `${rotateY}deg`);
      });

      div.addEventListener("mouseleave", () => {
        div.querySelectorAll(".memory-card").forEach((card) => {
          card.style.setProperty("--tiltX", "0deg");
          card.style.setProperty("--tiltY", "0deg");
        });
      });

      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const cards = el.querySelectorAll(".memory-card");
      tl.from(el.querySelector(".memory-header"), {
        duration: 0.6, opacity: 0, y: 12,
      });
      tl.from(cards, {
        duration: 0.7,
        opacity: 0,
        y: 16,
        stagger: 0.15,
      }, "-=0.3");
      tl.to([el.querySelector(".memory-header"), cards], {
        duration: 0.8, opacity: 0, y: -12,
        stagger: 0.08,
      }, "+=4");
    },
  };
})();
