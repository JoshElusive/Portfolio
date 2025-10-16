$(function() {

  const typingEffect = $(".text-warning em").first();
  const text = "Full-Stack Developer";
  let index = 0;
  let typingTimeout = null;
  let typedSoFar = "";


  function isRunning() {
    return !!typingEffect.data("typing-running");
  }
  function setRunning(v) {
    typingEffect.data("typing-running", !!v);
  }


  function stopTyping() {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
      typingTimeout = null;
    }
    setRunning(false);
  }

  function tick() {
    if (index < text.length) {
      typedSoFar += text.charAt(index);
      typingEffect.text(typedSoFar);
      index++;
      typingTimeout = setTimeout(tick, 50);
    } else {
     
      stopTyping();
    }
  }

  function startTyping() {
    if (isRunning()) {
      stopTyping();
    }
    index = 0;
    typedSoFar = "";
    typingEffect.text("");
    setRunning(true);
    tick();
  }

  startTyping();

  const $carousel = $("#carouselExample");
  if ($carousel.length) {
    if (!$carousel.data("handler-attached")) {
      $carousel.on("slid.bs.carousel", function(event) {
        const activeItem = $(event.target).find(".carousel-item.active");
        activeItem.addClass("fade-in");
        setTimeout(() => activeItem.removeClass("fade-in"), 1000);

        if (activeItem.find(".text-warning em").length) {
          startTyping();
        }
      });
      $carousel.data("handler-attached", true);
    }
  }

  $("small").text(`© ${new Date().getFullYear()} Josh`);
});


