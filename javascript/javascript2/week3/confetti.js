window.ConfettiGenerator = function (e) {
  var t = {
    target: "confetti-holder",
    max: 80,
    size: 1,
    animate: !0,
    props: ["circle", "square", "triangle", "line"],
    colors: [
      [165, 104, 246],
      [230, 61, 135],
      [0, 199, 228],
      [253, 214, 126]
    ],
    clock: 25,
    interval: null,
    width: window.innerWidth,
    height: window.innerHeight
  };
  e &&
    (e.target && (t.target = e.target),
    e.max && (t.max = e.max),
    e.size && (t.size = e.size),
    void 0 !== e.animate && null !== e.animate && (t.animate = e.animate),
    e.props && (t.props = e.props),
    e.colors && (t.colors = e.colors),
    e.clock && (t.clock = e.clock),
    e.width && (t.width = e.width),
    e.height && (t.height = e.height));
  var i = document.getElementById(t.target),
    a = i.getContext("2d"),
    r = [];
  function o(e, t) {
    e || (e = 1);
    var i = Math.random() * e;
    return t ? Math.floor(i) : i;
  }
  function n(e) {
    var i = e.radius <= 3 ? 0.4 : 0.8;
    switch (
      ((a.fillStyle = a.strokeStyle = "rgba(" + e.color + ", " + i + ")"),
      a.beginPath(),
      e.prop)
    ) {
      case "circle":
        a.moveTo(e.x, e.y),
          a.arc(e.x, e.y, e.radius * t.size, 0, 2 * Math.PI, !0),
          a.fill();
        break;
      case "triangle":
        a.moveTo(e.x, e.y),
          a.lineTo(e.x + e.angles[0] * t.size, e.y + e.angles[1] * t.size),
          a.lineTo(e.x + e.angles[2] * t.size, e.y + e.angles[3] * t.size),
          a.closePath(),
          a.fill();
        break;
      case "line":
        a.moveTo(e.x, e.y),
          a.lineTo(e.x + e.line * t.size, e.y + 5 * e.radius),
          (a.lineWidth = 2 * t.size),
          a.stroke();
        break;
      case "square":
        a.save(),
          a.translate(e.x + 15, e.y + 5),
          a.rotate(e.rotation),
          a.fillRect(-15 * t.size, -5 * t.size, 15 * t.size, 5 * t.size),
          a.restore();
    }
  }
  return {
    render: function () {
      (i.width = t.width), (i.height = t.height), (r = []);
      for (var e = 0; e < t.max; e++)
        r.push({
          prop: t.props[o(t.props.length, !0)],
          x: o(t.width),
          y: o(t.height),
          radius: o(4) + 1,
          line: Math.floor(o(65) - 30),
          angles: [o(10, !0) + 2, o(10, !0) + 2, o(10, !0) + 2, o(10, !0) + 2],
          color: t.colors[o(t.colors.length, !0)],
          rotation: (o(360, !0) * Math.PI) / 180,
          speed: o(t.clock / 7) + t.clock / 30
        });
      return (function e() {
        for (var i in (a.clearRect(0, 0, t.width, t.height), r)) n(r[i]);
        !(function () {
          for (var e = 0; e < t.max; e++) {
            var i = r[e];
            t.animate && (i.y += i.speed),
              i.y > t.height &&
                ((r[e] = i), (r[e].x = o(t.width, !0)), (r[e].y = -10));
          }
        })(),
          t.animate && requestAnimationFrame(e);
      })();
    },
    clear: function () {
      (t.animate = !1),
        clearInterval(t.interval),
        requestAnimationFrame(function () {
          a.clearRect(0, 0, i.width, i.height);
          var e = i.width;
          (i.width = 1), (i.width = e);
        });
    }
  };
};
