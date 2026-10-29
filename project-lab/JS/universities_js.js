const API_URL = "http://universities.hipolabs.com/search?country=Romania";
const statusEl = document.getElementById("status");
const tbody = document.getElementById("tbody");
const qInput = document.getElementById("q");
const exportBtn = document.getElementById("export-csv");
let all = [];
let current = [];

function setStatus(text) {
  statusEl.textContent = text;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function render(data) {
  current = data;
  tbody.innerHTML = data.map(u => {
    const url = u.web_pages?.[0];
    const site = url
      ? `<a href="${escapeHTML(url)}" target="_blank" rel="noopener">${escapeHTML(url)}</a>`
      : "";
    return `
      <tr>
        <td>${escapeHTML(u.name || "")}</td>
        <td>${escapeHTML(u.country || "")}</td>
        <td>${site}</td>
      </tr>`;
  }).join("");
}

async function loadUniversities() {
  setStatus("Se încarcă…");
  tbody.innerHTML = "";
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    all = data;
    render(all);
    setStatus(`Încărcat (${all.length} rezultate).`);
  } catch {
    setStatus("Eroare la încărcare. Încearcă din nou.");
  }
}

qInput.addEventListener("input", () => {
  const q = qInput.value.trim().toLowerCase();
  const filtered = q
    ? all.filter(u => (u.name || "").toLowerCase().includes(q))
    : all;
  render(filtered);
  setStatus(`Filtrate: ${filtered.length} din ${all.length}.`);
});

function exportCSV(data) {
  if (!data.length) return alert("Nu există date de exportat.");

  const header = ["Nume", "Țara", "Site"];
  const rows = data.map(u => [
    u.name || "",
    u.country || "",
    (u.web_pages && u.web_pages[0]) || ""
  ]);

  const csvContent = [header, ...rows]
    .map(r => r.map(v => `"${v.replace(/"/g, '""')}"`).join(","))
    .join("\n");


  const blob = new Blob(["﻿" + csvContent], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "universitati_romania.csv";
  a.click();
  URL.revokeObjectURL(url);
}

exportBtn.addEventListener("click", () => exportCSV(current));

loadUniversities();
