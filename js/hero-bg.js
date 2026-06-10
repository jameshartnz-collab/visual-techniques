/* =============================================================================
   THE FRAME — hero background
   A restrained three.js scene: slow-drifting cinematic 16:9 "frames" in the
   brand palette, sitting behind the headline. Purely decorative.

   Degrades gracefully:
     • no three.js (CDN blocked / offline)  → does nothing; CSS background shows
     • prefers-reduced-motion               → renders ONE static frame, no loop
     • tab hidden / hero scrolled off-screen → animation pauses (saves battery)

   Exposes window.HeroBg = { mount(el), unmount() }. app.js mounts it on the
   Home view and unmounts on every route change so there's only ever one scene.
   ============================================================================= */
(function () {
  "use strict";

  var THREE = window.THREE;
  var state = null;

  // Brand palette (mirrors css/styles.css)
  var PAPER = 0xf3efe6;
  var INK = 0x16130d;
  var ACCENT = 0xc8401f;

  function reducedMotion() {
    try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
    catch (e) { return false; }
  }

  // One 16:9 frame: a rectangle outline + a thin inner rule, as line segments.
  function makeFrame(material) {
    var w = 1.6, h = 0.9; // 16:9
    var x = w / 2, y = h / 2;
    var pts = [
      -x, -y, 0,  x, -y, 0,   x, -y, 0,  x, y, 0,
       x,  y, 0, -x,  y, 0,  -x,  y, 0, -x, -y, 0,
      // a small offset inner tick line, like a viewfinder rule
      -x * 0.5, 0, 0, x * 0.5, 0, 0
    ];
    var geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return new THREE.LineSegments(geo, material);
  }

  function mount(el) {
    if (!THREE || !el) return;        // graceful no-op
    unmount();                         // ensure single instance

    var width = el.clientWidth || el.offsetWidth || 1;
    var height = el.clientHeight || el.offsetHeight || 1;

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch (e) { return; }            // no WebGL → bail, CSS bg remains
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // transparent: paper shows through
    el.appendChild(renderer.domElement);

    var scene = new THREE.Scene();
    // Fog in the paper colour makes distant frames melt into the background.
    scene.fog = new THREE.Fog(PAPER, 14, 46);

    var camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, 0, 0);

    var group = new THREE.Group();
    scene.add(group);

    // Two shared materials: faint ink for most frames, a few vermillion accents.
    var inkMat = new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.16, fog: true });
    var accentMat = new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.30, fog: true });

    var COUNT = 34;
    var frames = [];
    for (var i = 0; i < COUNT; i++) {
      var accent = i % 7 === 0; // ~1 in 7 is vermillion
      var f = makeFrame(accent ? accentMat : inkMat);
      reseed(f, true);
      f.userData.spin = (Math.random() - 0.5) * 0.0016;   // gentle z-rotation
      f.userData.drift = 0.012 + Math.random() * 0.020;   // float toward camera
      group.add(f);
      frames.push(f);
    }

    function reseed(f, initial) {
      var spread = 22;
      f.position.x = (Math.random() - 0.5) * spread;
      f.position.y = (Math.random() - 0.5) * spread * 0.62;
      f.position.z = initial ? -2 - Math.random() * 42 : -46;
      f.rotation.z = (Math.random() - 0.5) * 0.5;
      var s = 0.7 + Math.random() * 2.4;
      f.scale.set(s, s, s);
    }

    var pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    function onPointer(e) {
      var r = el.getBoundingClientRect();
      pointer.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pointer.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    }
    window.addEventListener("pointermove", onPointer, { passive: true });

    function resize() {
      width = el.clientWidth || 1; height = el.clientHeight || 1;
      renderer.setSize(width, height);
      camera.aspect = width / height; camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", resize);

    function renderOnce() { renderer.render(scene, camera); }

    var raf = 0, running = false;
    function tick() {
      if (!running) return;
      for (var i = 0; i < frames.length; i++) {
        var f = frames[i];
        f.position.z += f.userData.drift;
        f.rotation.z += f.userData.spin;
        if (f.position.z > 4) reseed(f, false);
      }
      // ease the whole field toward the pointer for a subtle parallax
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      group.rotation.y = pointer.x * 0.18;
      group.rotation.x = -pointer.y * 0.12;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    function start() { if (!running) { running = true; raf = requestAnimationFrame(tick); } }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; }

    // Pause when the hero is off-screen or the tab is hidden.
    var io = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !reducedMotion()) start(); else stop();
      }, { threshold: 0.01 });
      io.observe(el);
    }
    function onVis() { if (document.hidden) stop(); else if (!reducedMotion()) start(); }
    document.addEventListener("visibilitychange", onVis);

    if (reducedMotion()) renderOnce();   // static, tasteful, no animation
    else if (!io) start();               // no IO support → just run

    state = {
      destroy: function () {
        stop();
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", onVis);
        if (io) io.disconnect();
        frames.forEach(function (f) { f.geometry.dispose(); });
        inkMat.dispose(); accentMat.dispose();
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }

  function unmount() {
    if (state) { try { state.destroy(); } catch (e) {} state = null; }
  }

  window.HeroBg = { mount: mount, unmount: unmount };
})();
