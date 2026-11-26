"use strict";
// API Card
// API Name: Rick and Morty API
// Base URL: https://rickandmortyapi.com/api
// Endpoint used: /character?name=<query>
// HTTP method: GET
// Status code seen: 200 (404 when nothing matches)
// Fields used: results[].id, name, status, species, gender, image, origin.name, location.name; info.count
// Relevance: themed, image-rich public data for a small search-and-cards demo inside the community portal
const BASE_URL = "https://rickandmortyapi.com/api/character";
const TIMEOUT_MS = 5000;
const STORAGE_KEY = "lastQuery";
class HttpError extends Error {
    constructor(status, apiMessage) {
        super(`HTTP ${status}`);
        this.name = "HttpError";
        this.status = status;
        this.apiMessage = apiMessage;
    }
}
async function getJSON(url) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
            let apiMessage = "";
            try {
                const body = (await response.json());
                apiMessage = body.error ?? "";
            }
            catch {
                apiMessage = "";
            }
            throw new HttpError(response.status, apiMessage);
        }
        return (await response.json());
    }
    finally {
        clearTimeout(timer);
    }
}
const statusEl = document.getElementById("status");
const resultsEl = document.getElementById("results");
function setStatus(text) {
    statusEl.textContent = text;
}
function addDetail(card, label, value) {
    const p = document.createElement("p");
    p.className = "detail";
    const strong = document.createElement("strong");
    strong.textContent = `${label}: `;
    p.appendChild(strong);
    p.appendChild(document.createTextNode(value || "-"));
    card.appendChild(p);
}
function createCard(item) {
    const card = document.createElement("div");
    card.className = "card";
    if (item.image.startsWith("https://")) {
        const img = document.createElement("img");
        img.src = item.image;
        img.alt = `Portrait of ${item.name}`;
        img.loading = "lazy";
        card.appendChild(img);
    }
    const title = document.createElement("h3");
    title.textContent = item.name;
    card.appendChild(title);
    const key = item.status.toLowerCase();
    const badge = document.createElement("span");
    badge.className = `badge ${key === "alive" || key === "dead" ? key : "unknown"}`;
    badge.textContent = `${item.status} - ${item.species}`;
    card.appendChild(badge);
    addDetail(card, "Gender", item.gender);
    addDetail(card, "Origin", item.origin.name);
    addDetail(card, "Last seen", item.location.name);
    return card;
}
function render(items, total) {
    resultsEl.replaceChildren();
    if (items.length === 0) {
        setStatus("No results found.");
        return;
    }
    items.forEach((item) => resultsEl.appendChild(createCard(item)));
    const more = total > items.length ? ` (showing the first ${items.length} of ${total})` : "";
    setStatus(`Loaded ${items.length} result(s)${more}.`);
}
const searchForm = document.getElementById("searchForm");
const queryInput = document.getElementById("queryInput");
const searchBtn = document.getElementById("searchBtn");
function buildURL(query) {
    return `${BASE_URL}?name=${encodeURIComponent(query)}`;
}
// A search with no matches returns 404 {"error":"There is nothing here"};
// a wrong endpoint also returns 404, but its message ends with a dot.
function isNoResults(err) {
    return err instanceof HttpError && err.status === 404 && err.apiMessage === "There is nothing here";
}
function describeError(err) {
    if (err instanceof DOMException && err.name === "AbortError") {
        return `request timed out after ${TIMEOUT_MS / 1000} s`;
    }
    return err instanceof Error ? err.message : "Unknown error";
}
async function search() {
    const query = queryInput.value.trim();
    if (!query) {
        setStatus("Please enter a search term.");
        return;
    }
    searchBtn.disabled = true;
    setStatus("Loading...");
    resultsEl.replaceChildren();
    try {
        const data = await getJSON(buildURL(query));
        render(data.results, data.info.count);
        localStorage.setItem(STORAGE_KEY, query);
    }
    catch (err) {
        if (isNoResults(err)) {
            render([], 0);
            localStorage.setItem(STORAGE_KEY, query);
        }
        else {
            setStatus(`Load failed: ${describeError(err)}`);
        }
    }
    finally {
        searchBtn.disabled = false;
    }
}
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    void search();
});
window.addEventListener("DOMContentLoaded", () => {
    const lastQuery = localStorage.getItem(STORAGE_KEY);
    if (lastQuery) {
        queryInput.value = lastQuery;
        void search();
    }
});
