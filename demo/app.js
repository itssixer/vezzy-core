(() => {
  const HELLO = {
    "index.html":
      "<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"utf-8\" />\n    <title>hello</title>\n    <link rel=\"stylesheet\" href=\"style.css\" />\n  </head>\n  <body>\n    <h1>Hello, Vezzy</h1>\n    <p>Edit the files and hit Run.</p>\n    <script src=\"script.js\"></script>\n  </body>\n</html>\n",
    "style.css":
      "body {\n  margin: 40px;\n  font-family: sans-serif;\n  background: #111;\n  color: #f2f2f2;\n}\nh1 {\n  color: #4fa3ff;\n}\n",
    "script.js": 'console.log("hello from vezzy");\n',
  };
  const BLANK = {
    "index.html":
      "<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"utf-8\" />\n    <title>untitled</title>\n    <link rel=\"stylesheet\" href=\"style.css\" />\n  </head>\n  <body>\n    <script src=\"script.js\"></script>\n  </body>\n</html>\n",
    "style.css": "",
    "script.js": "",
  };

  const files = { ...HELLO };
  let current = "index.html";
  const code = document.getElementById("code");
  const gutter = document.getElementById("gutter");
  const preview = document.getElementById("preview");
  const consoleEl = document.getElementById("console");
  const fileList = document.getElementById("file-list");
  const fileTabs = document.getElementById("file-tabs");
  const statusFile = document.getElementById("status-file");

  function paintGutter() {
    const lines = String(code.value || "").split("\n").length;
    gutter.innerHTML = Array.from({ length: Math.max(lines, 1) }, (_, i) => i + 1).join("<br>");
  }

  function paintFiles() {
    const names = Object.keys(files);
    fileList.innerHTML = names
      .map(
        (name) =>
          `<button class="file${name === current ? " is-on" : ""}" type="button" data-file="${name}">${name}</button>`
      )
      .join("");
    fileTabs.innerHTML = names
      .map(
        (name) =>
          `<button class="file-tab${name === current ? " is-on" : ""}" type="button" data-file="${name}">${name}</button>`
      )
      .join("");
    if (statusFile) statusFile.textContent = current;
  }

  function showFile(name) {
    if (current && Object.prototype.hasOwnProperty.call(files, current)) {
      files[current] = code.value;
    }
    current = name;
    code.value = files[name] || "";
    paintFiles();
    paintGutter();
  }

  function bundle() {
    let html = files["index.html"] || "<!DOCTYPE html><html><body></body></html>";
    const css = files["style.css"] || "";
    const js = files["script.js"] || "";
    const hook =
      "<script>(function(){function s(t,a){parent.postMessage({vezzy:1,t:t,a:[].map.call(a,String)},'*')}['log','warn','error'].forEach(function(k){var o=console[k];console[k]=function(){s(k,arguments);o.apply(console,arguments)}});window.onerror=function(m){s('error',[m])}})();</script>";
    if (css) html = /<\/head>/i.test(html) ? html.replace(/<\/head>/i, "<style>" + css + "</style></head>") : "<style>" + css + "</style>" + html;
    if (/<body[^>]*>/i.test(html)) html = html.replace(/<body[^>]*>/i, (m) => m + hook);
    else html = hook + html;
    html = /<\/body>/i.test(html) ? html.replace(/<\/body>/i, "<script>" + js + "</script></body>") : html + "<script>" + js + "</script>";
    return html;
  }

  function run() {
    files[current] = code.value;
    if (consoleEl) consoleEl.textContent = "";
    preview.srcdoc = bundle();
  }

  function showView(name) {
    document.querySelectorAll(".view").forEach((view) => {
      view.toggleAttribute("hidden", view.id !== "view-" + name);
    });
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.toggle("is-on", btn.getAttribute("data-view") === name);
    });
  }

  function load(starter, title) {
    Object.keys(files).forEach((k) => delete files[k]);
    Object.assign(files, starter);
    current = "index.html";
    document.getElementById("work-name").value = title;
    document.querySelector(".preview-url").textContent = "srcdoc://" + title;
    showFile(current);
    showView("workspace");
    run();
  }

  window.addEventListener("message", (ev) => {
    const data = ev.data;
    if (!data || !data.vezzy || !consoleEl) return;
    const wrap = document.createElement("div");
    if (data.t === "error") wrap.className = "err";
    wrap.textContent = (data.t === "log" ? "" : data.t + ": ") + (data.a || []).join(" ");
    consoleEl.appendChild(wrap);
  });

  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => showView(btn.getAttribute("data-view")));
  });
  document.getElementById("open-workspace").addEventListener("click", () => {
    showView("workspace");
    run();
  });
  document.getElementById("open-blank").addEventListener("click", () => load({ ...BLANK }, "untitled"));
  document.getElementById("run-btn").addEventListener("click", run);
  fileList.addEventListener("click", (ev) => {
    const btn = ev.target.closest("[data-file]");
    if (btn) showFile(btn.getAttribute("data-file"));
  });
  fileTabs.addEventListener("click", (ev) => {
    const btn = ev.target.closest("[data-file]");
    if (btn) showFile(btn.getAttribute("data-file"));
  });
  document.querySelectorAll(".out-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".out-tab").forEach((t) => t.classList.toggle("is-on", t === tab));
      const out = tab.getAttribute("data-out");
      preview.hidden = out !== "preview";
      consoleEl.hidden = out !== "console";
    });
  });
  code.addEventListener("input", paintGutter);
  window.addEventListener("keydown", (ev) => {
    if ((ev.ctrlKey || ev.metaKey) && ev.key === "Enter") {
      ev.preventDefault();
      run();
    }
  });

  showFile(current);
  run();
})();
