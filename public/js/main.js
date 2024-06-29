document.addEventListener("DOMContentLoaded", () => {
  const radioButtons = document.querySelectorAll('input[name="frequency"]');
  const priceElements = document.querySelectorAll("span.text-4xl");
  const frequencyElements = document.querySelectorAll("span.text-sm");

  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", () => {
      const isAnnual = radioButton.value === "annually";

      radioButtons.forEach((btn) => {
        const label = btn.closest("label");
        label.classList.toggle("bg-[#1aaaff]", btn.checked);
        label.classList.toggle("text-white", !btn.checked);

        if (!isAnnual && btn.checked) {
          btn.disabled = true;
        } else {
          radioButtons.forEach((btn) => (btn.disabled = false));
        }
      });

      priceElements.forEach((priceElement) => {
        let currentPrice = parseInt(
          priceElement.textContent.replace(/\D/g, "")
        );
        currentPrice = isAnnual ? currentPrice * 12 : currentPrice / 12;
        priceElement.textContent = `Rp ${currentPrice.toLocaleString("id-ID")}`;
      });

      frequencyElements.forEach((frequencyElement) => {
        frequencyElement.textContent = isAnnual ? "/ tahun" : "/ bulan";
      });
    });
  });

  radioButtons[0].disabled = true;
});

function openPopup() {
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 999;
  `;
  overlay.addEventListener("click", closePopup);

  const popup = document.createElement("div");
  popup.id = "youtubePopup";
  popup.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
  `;

  const videoIframe = document.createElement("iframe");
  videoIframe.width = "840";
  videoIframe.height = "472.5";
  videoIframe.src =
    "https://www.youtube.com/embed/m4nfDQSKXJ0?si=fGNRRnhqkrUhv1v4&autoplay=1&mute=0&controls=0";
  videoIframe.title = "YouTube video player";
  videoIframe.frameBorder = "0";
  videoIframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;";
  videoIframe.allowFullscreen = true;
  videoIframe.style.cssText = `
      display: block;
  `;

  popup.appendChild(videoIframe);
  document.body.appendChild(overlay);
  document.body.appendChild(popup);

  document.body.style.overflow = "hidden";
}

function closePopup() {
  const popup = document.getElementById("youtubePopup");
  const overlay = document.getElementById("overlay");
  if (popup) {
    popup.remove();
  }
  if (overlay) {
    overlay.remove();
    document.body.style.overflow = "auto";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const openMenuButton = document.getElementById("openMenuButton");
  const closeMenuButton = document.getElementById("closeMenuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuBackdrop = document.getElementById("menuBackdrop");
  const menuContent = document.getElementById("menuContent");
  const menuLinks = mobileMenu.querySelectorAll("a");

  function openMenu() {
    mobileMenu.classList.remove("hidden");
    menuBackdrop.classList.remove("hidden");
    setTimeout(() => {
      menuBackdrop.classList.add("opacity-100");
      menuContent.classList.remove("translate-x-full");
    }, 10);
  }

  function closeMenu() {
    menuBackdrop.classList.remove("opacity-100");
    menuContent.classList.add("translate-x-full");
    setTimeout(() => {
      mobileMenu.classList.add("hidden");
      menuBackdrop.classList.add("hidden");
    }, 300);
  }

  openMenuButton.addEventListener("click", openMenu);
  closeMenuButton.addEventListener("click", closeMenu);
  menuBackdrop.addEventListener("click", closeMenu);

  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (!link.href.startsWith("http")) {
        e.preventDefault();
        closeMenu();
        setTimeout(() => {
          window.location.href = link.href;
        }, 300);
      } else {
        closeMenu();
      }
    });
  });
});

function redirectTo404() {
  window.open("/404.html", "_blank");
}
