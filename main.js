(function () {
  var P = ["#c8342b", "#27408b", "#e8a93a", "#2f7d6d", "#f4efe6", "#161616"];
  var $ = function (s) {
    return document.querySelector(s);
  };
  document.getElementById("yr").textContent = new Date().getFullYear();
  // hero stripes
  var st = $("#stripes"),
    seq = [0, 4, 1, 4, 2, 4, 3, 4, 0, 4];
  seq.forEach(function (i, n) {
    var b = document.createElement("b");
    b.style.background = P[i];
    b.style.animationDelay = n * 0.09 + "s";
    st.appendChild(b);
  });
  // marquee
  var words = [
      "рачно направено",
      "со љубов",
      "само за тебе",
      "топол дом",
      "со душа",
      "благодарност",
    ],
    h = "";
  for (var k = 0; k < 2; k++)
    words.forEach(function (w) {
      h += "<span>" + w + "</span><em>♥</em>";
    });
  $("#mq").innerHTML = h;
  // loom
  var box = $("#loomBox"),
    rows = [];
  function mk() {
    for (var i = 0; i < 10; i++) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Лента " + (i + 1) + ", промени боја");
      var c = [0, 4, 1, 4, 2, 4, 3, 4, 0, 5][i];
      b.dataset.c = c;
      b.style.background = P[c];
      b.addEventListener("click", function () {
        var n = (+this.dataset.c + 1) % P.length;
        this.dataset.c = n;
        this.style.background = P[n];
      });
      box.appendChild(b);
      rows.push(b);
    }
  }
  mk();
  $("#rand").addEventListener("click", function () {
    rows.forEach(function (b, i) {
      setTimeout(function () {
        var n = Math.floor(Math.random() * P.length);
        b.dataset.c = n;
        b.style.background = P[n];
      }, i * 70);
    });
  });
  // menu
  var bg = $("#burger"),
    mn = $("#menu");
  function cl() {
    mn.classList.remove("open");
    bg.setAttribute("aria-expanded", "false");
  }
  bg.addEventListener("click", function () {
    var o = mn.classList.toggle("open");
    bg.setAttribute("aria-expanded", o);
  });
  mn.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", cl);
  });
  // scroll
  var bar = $("#bar"),
    hd = $("#top"),
    rug = $("#rug");
  function sc() {
    var y = window.scrollY,
      m = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = "scaleX(" + (m > 0 ? y / m : 0) + ")";
    hd.classList.toggle("on", y > 30);
  }
  addEventListener("scroll", sc, { passive: true });
  sc();
  // reveal
  var els = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach(function (e) {
      io.observe(e);
    });
  } else
    els.forEach(function (e) {
      e.classList.add("in");
    });
  // tilt rug
  if (matchMedia("(hover:hover)").matches) {
    $("#hero").addEventListener("mousemove", function (e) {
      var x = e.clientX / innerWidth - 0.5,
        y = e.clientY / innerHeight - 0.5;
      rug.style.transform =
        "rotate(" +
        (2 + x * 6) +
        "deg) translate(" +
        x * -14 +
        "px," +
        y * -10 +
        "px)";
    });
  }
  // hearts
  var hs = $("#hearts");
  function love(n) {
    for (var i = 0; i < n; i++) {
      (function () {
        var s = document.createElement("span");
        s.textContent = "♥";
        s.style.left = Math.random() * 100 + "%";
        s.style.fontSize = 14 + Math.random() * 30 + "px";
        s.style.animationDuration = 3 + Math.random() * 3 + "s";
        s.style.animationDelay = Math.random() * 0.6 + "s";
        s.style.color = P[Math.floor(Math.random() * 4)];
        hs.appendChild(s);
        setTimeout(function () {
          s.remove();
        }, 7000);
      })();
    }
  }
  $("#love").addEventListener("click", function () {
    love(26);
  });
  $("#stamp").addEventListener("click", function () {
    love(14);
  });
  var f = $("#follow"),
    fo = new IntersectionObserver(
      function (es) {
        if (es[0].isIntersecting) {
          love(10);
          fo.disconnect();
        }
      },
      { threshold: 0.5 },
    );
  fo.observe(f);
})();
