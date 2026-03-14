/*
 *  YourVersion – Sheets API wrapper
 *  Loaded by both index.html and crm.html instead of Firebase.
 *
 *  ⚠️  Pega aquí la URL de tu Apps Script desplegado (paso 6 de google-apps-script.js)
 */
const APPS_SCRIPT_URL = "PEGA_AQUI_TU_URL";

const SheetsAPI = {
  /* ── Leads ── */
  async getLeads() {
    const res = await fetch(APPS_SCRIPT_URL + "?action=getLeads");
    if (!res.ok) throw new Error("Error fetching leads");
    return res.json();
  },

  async addLead(data) {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ action: "addLead", data }),
    });
    if (!res.ok) throw new Error("Error adding lead");
    return res.json();
  },

  async updateLead(id, data) {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ action: "updateLead", id, data }),
    });
    if (!res.ok) throw new Error("Error updating lead");
    return res.json();
  },

  async deleteLead(id) {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ action: "deleteLead", id }),
    });
    if (!res.ok) throw new Error("Error deleting lead");
    return res.json();
  },

  /* ── Config (pricing) ── */
  async getConfig() {
    const res = await fetch(APPS_SCRIPT_URL + "?action=getConfig");
    if (!res.ok) throw new Error("Error fetching config");
    return res.json();
  },

  async saveConfig(data) {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ action: "saveConfig", data }),
    });
    if (!res.ok) throw new Error("Error saving config");
    return res.json();
  },
};
