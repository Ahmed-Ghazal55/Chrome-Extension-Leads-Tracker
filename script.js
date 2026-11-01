'use strict';

// Preserve the original localStorage format for compatibility with existing saved leads.
// Never interpolate saved URLs into innerHTML: saved values may be untrusted.
const STORAGE_KEY = 'myLeads';
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const ulEl = document.getElementById('ul-el');
const deleteBtn = document.getElementById('delete-btn');
const tabBtn = document.getElementById('tab-btn');

function validWebUrl(value) {
  try {
    const url = new URL(String(value).trim());
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}

function loadLeads() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved.filter(value => typeof value === 'string').map(validWebUrl).filter(Boolean) : [];
  } catch {
    return [];
  }
}

let leads = loadLeads();

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

function render() {
  ulEl.replaceChildren();
  for (const url of leads) {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = url;
    link.textContent = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    li.append(link);
    ulEl.append(li);
  }
}

function addLead(value) {
  const url = validWebUrl(value);
  if (!url) {
    inputEl.setCustomValidity('Enter a valid http:// or https:// URL.');
    inputEl.reportValidity();
    return;
  }
  inputEl.setCustomValidity('');
  if (!leads.includes(url)) {
    leads.push(url);
    persist();
    render();
  }
  inputEl.value = '';
}

inputEl.addEventListener('input', () => inputEl.setCustomValidity(''));
inputBtn.addEventListener('click', () => addLead(inputEl.value));
tabBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (chrome.runtime.lastError || !tabs || !tabs[0] || !tabs[0].url) return;
    const url = validWebUrl(tabs[0].url);
    if (url && !leads.includes(url)) {
      leads.push(url);
      persist();
      render();
    }
  });
});
// Preserve the legacy double-click deletion gesture to avoid surprising data loss.
deleteBtn.addEventListener('dblclick', () => {
  if (!confirm('Delete all saved links? This cannot be undone.')) return;
  leads = [];
  persist(); // Do not clear unrelated localStorage keys.
  render();
});

render();
