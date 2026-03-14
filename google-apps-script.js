/*
 *  YourVersion CRM – Google Apps Script (Web App API)
 *
 *  CÓMO INSTALAR:
 *  1. Abre tu Google Sheet: https://docs.google.com/spreadsheets/d/1qJyxJ6ss_D1RA8mpCXXwODw-6ZoK6tPajstPUyrHOrI
 *  2. Menú → Extensiones → Apps Script
 *  3. Borra todo el código que haya y pega TODO este archivo
 *  4. Haz clic en "Ejecutar" → selecciona "setupSheets" → Autoriza los permisos
 *  5. Implementar → Nueva implementación:
 *       Tipo: "Aplicación web"
 *       Ejecutar como: "Yo"
 *       Quién tiene acceso: "Cualquier persona"
 *  6. Copia la URL de la implementación y pégala en sheets-api.js (APPS_SCRIPT_URL)
 *
 *  Eso es todo. La landing y el CRM ya se conectarán solos.
 */

/* ─── Setup: crea las hojas si no existen ─── */
function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // Hoja Leads
  var leads = ss.getSheetByName("Leads");
  if (!leads) {
    leads = ss.insertSheet("Leads");
  }
  var leadsHeaders = [
    "id","createdAt","name","email","phone","dateTime","eventType",
    "location","guests","needsEquipment","spaceType","comments","setlist",
    "status","durationMinutes","extraSongs","soundNeeded","stayOvernight",
    "attendees","travelDistance","total"
  ];
  leads.getRange(1, 1, 1, leadsHeaders.length).setValues([leadsHeaders]);

  // Hoja Config
  var config = ss.getSheetByName("Config");
  if (!config) {
    config = ss.insertSheet("Config");
  }
  config.getRange(1, 1, 1, 2).setValues([["key", "value"]]);

  SpreadsheetApp.flush();
  Logger.log("Sheets preparadas correctamente.");
}

/* ─── Web App entry points ─── */
function doGet(e) {
  var action = (e.parameter && e.parameter.action) || "";
  var result;

  if (action === "getLeads") {
    result = getLeads_();
  } else if (action === "getConfig") {
    result = getConfig_();
  } else {
    result = { error: "Acción GET no válida: " + action };
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: "JSON inválido" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var action = body.action || "";
  var result;

  if (action === "addLead") {
    result = addLead_(body.data);
  } else if (action === "updateLead") {
    result = updateLead_(body.id, body.data);
  } else if (action === "deleteLead") {
    result = deleteLead_(body.id);
  } else if (action === "saveConfig") {
    result = saveConfig_(body.data);
  } else {
    result = { error: "Acción POST no válida: " + action };
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ─── Leads helpers ─── */
var LEAD_FIELDS = [
  "id","createdAt","name","email","phone","dateTime","eventType",
  "location","guests","needsEquipment","spaceType","comments","setlist",
  "status","durationMinutes","extraSongs","soundNeeded","stayOvernight",
  "attendees","travelDistance","total"
];

function getLeads_() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads");
  if (!sheet) return [];
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  var headers = data[0];
  var leads = [];
  for (var i = 1; i < data.length; i++) {
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = data[i][j];
    }
    if (obj.id) leads.push(obj);
  }
  return leads;
}

function addLead_(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads");
  if (!sheet) return { error: "Hoja Leads no encontrada" };

  var id = Utilities.getUuid();
  data.id = id;
  data.createdAt = data.createdAt || new Date().toISOString();

  var row = LEAD_FIELDS.map(function(f) { return data[f] !== undefined ? data[f] : ""; });
  sheet.appendRow(row);
  SpreadsheetApp.flush();
  return { ok: true, id: id };
}

function updateLead_(id, data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads");
  if (!sheet) return { error: "Hoja Leads no encontrada" };

  var allData = sheet.getDataRange().getValues();
  var headers = allData[0];
  var idCol = headers.indexOf("id");

  for (var i = 1; i < allData.length; i++) {
    if (String(allData[i][idCol]) === String(id)) {
      for (var key in data) {
        var col = headers.indexOf(key);
        if (col >= 0) {
          sheet.getRange(i + 1, col + 1).setValue(data[key]);
        }
      }
      SpreadsheetApp.flush();
      return { ok: true };
    }
  }
  return { error: "Lead no encontrado: " + id };
}

function deleteLead_(id) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads");
  if (!sheet) return { error: "Hoja Leads no encontrada" };

  var allData = sheet.getDataRange().getValues();
  var idCol = allData[0].indexOf("id");

  for (var i = 1; i < allData.length; i++) {
    if (String(allData[i][idCol]) === String(id)) {
      sheet.deleteRow(i + 1);
      SpreadsheetApp.flush();
      return { ok: true };
    }
  }
  return { error: "Lead no encontrado: " + id };
}

/* ─── Config helpers ─── */
function getConfig_() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Config");
  if (!sheet) return {};
  var data = sheet.getDataRange().getValues();
  var config = {};
  for (var i = 1; i < data.length; i++) {
    if (data[i][0]) {
      var val = data[i][1];
      var num = Number(val);
      config[data[i][0]] = isNaN(num) ? val : num;
    }
  }
  return config;
}

function saveConfig_(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Config");
  if (!sheet) return { error: "Hoja Config no encontrada" };

  // Clear existing rows (keep header)
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, 2).clearContent();
  }

  // Write key-value pairs
  var keys = Object.keys(data);
  if (keys.length > 0) {
    var rows = keys.map(function(k) { return [k, data[k]]; });
    sheet.getRange(2, 1, rows.length, 2).setValues(rows);
  }

  SpreadsheetApp.flush();
  return { ok: true };
}
