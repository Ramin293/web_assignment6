$(document).ready(function () {
  console.log("jQuery is ready!");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const effectDuration = reducedMotion ? 1 : 400;

  $(".menu-toggle").on("click", function () {
    const expanded = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", String(!expanded));
    $("#primary-nav").toggleClass("open");
  });

  $("#change-id").on("click", function () {
    $("#selector-id").text("The ID selector changed this text.");
    $("#basics-feedback").text('Selected with $("#selector-id").text(...)');
  });
  $("#change-class").on("click", function () {
    $(".selector-class").html("Class selection can add <strong>formatted text</strong>.");
    $("#basics-feedback").text('Selected with $(".selector-class").html(...)');
  });
  $("#change-tag").on("click", function () {
    $(".selector-tag").css({ color: "#2447bd", backgroundColor: "#eef0e8", padding: "8px" });
    $("#basics-feedback").text('Selected with $(".selector-tag").css(...)');
  });

  $("#hide-text").on("click", function () { $("#visibility-target").hide(effectDuration); });
  $("#show-text").on("click", function () { $("#visibility-target").show(effectDuration); });
  $("#toggle-text").on("click", function () { $("#visibility-target").toggle(effectDuration); });
  $("#fade-out").on("click", function () { $("#fade-image").fadeOut(effectDuration); });
  $("#fade-in").on("click", function () { $("#fade-image").fadeIn(effectDuration); });
  $("#fade-toggle").on("click", function () { $("#fade-image").fadeToggle(effectDuration); });
  $("#slide-up").on("click", function () { $("#slide-panel").slideUp(effectDuration); $("#slide-toggle").attr("aria-expanded", "false"); });
  $("#slide-down").on("click", function () { $("#slide-panel").slideDown(effectDuration); $("#slide-toggle").attr("aria-expanded", "true"); });
  const slideToggle = function () {
    const expanded = $("#slide-toggle").attr("aria-expanded") === "true";
    $("#slide-panel").slideToggle(effectDuration);
    $("#slide-toggle").attr("aria-expanded", String(!expanded));
  };
  $("#slide-toggle, #slide-toggle-button").on("click", slideToggle);

  const updateCount = function () {
    const count = $("#interactive-list li").length;
    $("#item-count").text(count + (count === 1 ? " ITEM" : " ITEMS"));
  };
  const addListItem = function (value, prepend) {
    const text = String(value || "").trim().slice(0, 42);
    if (!text) {
      $("#list-feedback").text("Type a short item name first.");
      $("#new-item").trigger("focus");
      return;
    }
    const $item = $("<li>").append($("<span>").text(text), $("<button type='button' aria-label='Remove item'>×</button>"));
    if (prepend) $("#interactive-list").prepend($item); else $("#interactive-list").append($item);
    $("#new-item").val("");
    $("#list-feedback").text('Added "' + text + '" to the list.');
    updateCount();
  };
  $("#add-item").on("click", function () { addListItem($("#new-item").val(), false); });
  $("#new-item").on("keydown", function (event) { if (event.key === "Enter") { event.preventDefault(); addListItem($(this).val(), false); } });
  $("#prepend-item").on("click", function () { addListItem("Prepended with .prepend()", true); });
  $("#remove-item").on("click", function () {
    const $last = $("#interactive-list li:last");
    if (!$last.length) { $("#list-feedback").text("The list is empty. Add an item to continue."); return; }
    $last.remove();
    $("#list-feedback").text("Removed the last item with .remove().");
    updateCount();
  });
  $("#interactive-list").on("click", "button", function () {
    $(this).closest("li").remove();
    $("#list-feedback").text("Removed an item from the list.");
    updateCount();
  });

  let imageVariant = false;
  $("#change-image").on("click", function () {
    imageVariant = !imageVariant;
    const source = imageVariant ? "assets/gallery-coast.svg" : "assets/gallery-garden.svg";
    const alt = imageVariant ? "Quiet shoreline beneath a wide sky" : "Stylized flower in a garden";
    $("#attribute-image").attr({ src: source, alt: alt });
    $("#image-caption").text(imageVariant ? "Coast study · image 2" : "Garden study · image 1");
    $("#attribute-feedback").text("The image src and alt attributes have changed.");
  });
  let linkVariant = false;
  $("#change-link").on("click", function () {
    linkVariant = !linkVariant;
    const url = linkVariant ? "https://www.w3schools.com/jquery/" : "https://api.jquery.com/";
    $("#dynamic-link").attr("href", url).text(linkVariant ? "Open the jQuery guide ↗" : "Open the jQuery API ↗");
    $("#attribute-feedback").text("The link now points to " + (linkVariant ? "the jQuery guide." : "the jQuery API."));
  });

  $("#live-form input").on("input", function () {
    const name = $("#live-name").val().trim();
    const email = $("#live-email").val().trim();
    const output = [name, email].filter(Boolean).join(" · ");
    $("#form-preview").text(output || "Your name and email will appear here.");
  });

  let animationRunning = false;
  const $box = $("#animation-box");
  const $track = $("#animation-track");
  const duration = reducedMotion ? 1 : 500;
  const resetBox = function () {
    $box.stop(true).css({ left: "18px", top: "18px", width: "72px", height: "72px", opacity: 1 });
    animationRunning = false;
  };
  const runAnimation = function (sequence) {
    if (animationRunning) return;
    animationRunning = true;
    const maxLeft = Math.max(18, $track.innerWidth() - 100);
    const right = Math.min(120, maxLeft - 18);
    const down = Math.min(70, Math.max(18, $track.innerHeight() - 108));
    $box.stop(true).css({ left: "18px", top: "18px", width: "72px", height: "72px", opacity: 1 });
    $("#animation-feedback").text(sequence ? "Running the queued sequence…" : "Growing and moving the box…");
    if (sequence) {
      $box.animate({ left: "+=" + right + "px" }, duration)
        .animate({ top: "+=" + down + "px" }, duration)
        .animate({ width: "36px", height: "36px" }, reducedMotion ? 1 : 400)
        .animate({ left: "18px", top: "18px", width: "72px", height: "72px" }, duration, function () {
          animationRunning = false;
          $("#animation-feedback").text("Sequence complete. The box is back at the start.");
        });
    } else {
      $box.animate({ left: "+=" + right + "px", width: "104px", height: "104px" }, duration, function () {
        animationRunning = false;
        $("#animation-feedback").text("Single animation complete. Reset the box to try another.");
      });
    }
  };
  $("#basic-animation").on("click", function () { runAnimation(false); });
  $("#sequence-animation").on("click", function () { runAnimation(true); });
  $("#combined-animation").on("click", function () {
    if (animationRunning) return;
    animationRunning = true;
    const move = Math.min(76, Math.max(0, $track.innerWidth() - 116));
    resetBox();
    animationRunning = true;
    $("#animation-feedback").text("Animating size, position, and opacity together…");
    $box.animate({ left: "+=" + move + "px", width: "100px", height: "100px", opacity: 0.55 }, duration, function () {
      animationRunning = false;
      $("#animation-feedback").text("Combined animation complete. Reset the box to try another.");
    });
  });
  $("#reset-animation").on("click", function () { resetBox(); $("#animation-feedback").text("Box is ready at the starting point."); });

  $(".gallery-thumb").on("click", function () {
    const $thumb = $(this);
    const source = $thumb.data("image");
    const alt = $thumb.data("alt");
    const caption = $thumb.data("caption");
    const index = $(".gallery-thumb").index(this) + 1;
    if ($thumb.hasClass("active")) return;
    $(".gallery-thumb").removeClass("active").attr("aria-pressed", "false");
    $thumb.addClass("active").attr("aria-pressed", "true");
    $("#gallery-main-image").stop(true).fadeOut(effectDuration / 2, function () {
      $(this).attr({ src: source, alt: alt }).fadeIn(reducedMotion ? 1 : 300);
    });
    $("#gallery-caption-text").text(caption);
    $("#gallery-count").text(String(index).padStart(2, "0") + " / 03");
  });
});
