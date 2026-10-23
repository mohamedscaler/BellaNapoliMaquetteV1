/**
 * Réservations Bella Napoli da Luigi
 * ---------------------------------------------------------------
 * 1. Le site envoie la demande (POST) → ligne ajoutée dans le Google Sheet
 *    + e-mail à Luigi avec un bouton « Voir et répondre ».
 * 2. Luigi ouvre le lien → page avec la réservation + boutons Accepter / Refuser.
 * 3. Un tap → statut mis à jour dans le Sheet + e-mail automatique au client.
 *
 * Installation : voir INSTALLATION.md (à faire depuis un ordinateur).
 */

// ===== RÉGLAGES =====
const CONFIG = {
  restaurant: 'Bella Napoli da Luigi',
  notifyEmail: 'bella.napoli.bulle@gmail.com',   // reçoit les demandes
  phone: '026 913 14 19',
  address: 'Rue Saint-Denis 42, 1630 Bulle',
  site: 'https://bellanapolidaluigi.com',
  sheetName: 'Réservations',
  timeZone: 'Europe/Zurich'
};

const HEADERS = ['Reçue le', 'ID', 'Statut', 'Nom', 'Téléphone', 'E-mail', 'Couverts', 'Date', 'Heure', 'Message', 'Traitée le', 'Jeton'];
const COL = { status: 3, treated: 11 }; // index 1-based des colonnes modifiées

// ---------- Réception d'une demande depuis le site ----------
function doPost(e) {
  try {
    const d = JSON.parse((e.postData && e.postData.contents) || '{}');

    // Anti-spam : champ caché rempli = robot
    if (d.website) return json({ ok: true });

    const required = ['name', 'phone', 'email', 'guests', 'date', 'time'];
    for (const k of required) if (!String(d[k] || '').trim()) return json({ ok: false, error: 'Champ manquant : ' + k });
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) return json({ ok: false, error: 'E-mail invalide' });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    const sh = sheet();
    const id = 'R' + Utilities.formatDate(new Date(), CONFIG.timeZone, 'yyMMdd-HHmmss') + '-' + Math.floor(Math.random() * 90 + 10);
    const token = Utilities.getUuid();
    const r = {
      name: clean(d.name, 80), phone: clean(d.phone, 30), email: clean(d.email, 120),
      guests: clean(d.guests, 3), date: clean(d.date, 10), time: clean(d.time, 10), message: clean(d.message, 500)
    };
    sh.appendRow([new Date(), id, 'En attente', r.name, r.phone, r.email, r.guests, r.date, r.time, r.message, '', token]);
    lock.releaseLock();

    const link = ScriptApp.getService().getUrl() + '?id=' + encodeURIComponent(id) + '&t=' + token;
    MailApp.sendEmail({
      to: CONFIG.notifyEmail,
      replyTo: r.email,
      subject: '🍕 Nouvelle réservation : ' + r.guests + ' pers. le ' + frDate(r.date) + ' à ' + r.time + ' (' + r.name + ')',
      htmlBody: mailLuigi(r, link),
      name: 'Réservations ' + CONFIG.restaurant
    });
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// ---------- Page de réponse ouverte par Luigi ----------
function doGet(e) {
  const p = e.parameter || {};
  const t = HtmlService.createTemplateFromFile('Page');
  const row = findRow(p.id, p.t);
  t.data = row ? row.data : null;
  t.id = p.id || '';
  t.token = p.t || '';
  t.restaurant = CONFIG.restaurant;
  return t.evaluate()
    .setTitle('Réservation — ' + CONFIG.restaurant)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// Appelée depuis la page (bouton Accepter / Refuser)
function decide(id, token, action, note) {
  const row = findRow(id, token);
  if (!row) throw new Error('Réservation introuvable.');
  if (row.data.status !== 'En attente') return row.data.status;

  const accepted = action === 'accept';
  const status = accepted ? 'Confirmée' : 'Refusée';
  const sh = sheet();
  sh.getRange(row.index, COL.status).setValue(status);
  sh.getRange(row.index, COL.treated).setValue(new Date());

  MailApp.sendEmail({
    to: row.data.email,
    replyTo: CONFIG.notifyEmail,
    subject: (accepted ? '✅ Votre réservation est confirmée' : 'Votre demande de réservation') + ' — ' + CONFIG.restaurant,
    htmlBody: accepted ? mailConfirm(row.data) : mailRefuse(row.data, clean(note, 300)),
    name: CONFIG.restaurant
  });
  return status;
}

// ---------- Outils ----------
function sheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(CONFIG.sheetName);
  if (!sh) {
    sh = ss.insertSheet(CONFIG.sheetName);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#0F2A47').setFontColor('#F7F2E8');
    sh.hideColumns(HEADERS.length); // jeton masqué
  }
  return sh;
}

function findRow(id, token) {
  if (!id || !token) return null;
  const values = sheet().getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    const v = values[i];
    if (v[1] === id && v[11] === token) {
      return {
        index: i + 1,
        data: { id: v[1], status: v[2], name: v[3], phone: String(v[4]), email: v[5], guests: v[6], date: v[7] instanceof Date ? Utilities.formatDate(v[7], CONFIG.timeZone, 'yyyy-MM-dd') : String(v[7]), time: String(v[8]), message: v[9] }
      };
    }
  }
  return null;
}

function json(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function clean(s, max) { return String(s || '').replace(/[<>]/g, '').trim().slice(0, max); }
function esc(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function frDate(iso) {
  const p = String(iso).split('-');
  if (p.length !== 3) return iso;
  const d = new Date(+p[0], +p[1] - 1, +p[2]);
  const jours = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  return jours[d.getDay()] + ' ' + p[2] + '/' + p[1] + '/' + p[0];
}

// ---------- Gabarits e-mail ----------
function frame(inner) {
  return '<div style="font-family:Arial,Helvetica,sans-serif;background:#F7F2E8;padding:24px">'
    + '<div style="max-width:520px;margin:auto;background:#fff;border-radius:16px;padding:28px;color:#0F2A47">'
    + inner + '</div></div>';
}
function recap(r) {
  return '<table style="width:100%;border-collapse:collapse;font-size:15px;margin:16px 0">'
    + [['Date', frDate(r.date)], ['Heure', r.time], ['Couverts', r.guests], ['Nom', r.name]]
      .map(x => '<tr><td style="padding:6px 0;color:#5b6b7d">' + x[0] + '</td><td style="padding:6px 0;text-align:right;font-weight:bold">' + esc(x[1]) + '</td></tr>').join('')
    + '</table>';
}
function mailLuigi(r, link) {
  return frame('<h2 style="margin:0 0 4px">Nouvelle demande de réservation</h2>'
    + recap(r)
    + '<p style="margin:0">📞 <a href="tel:' + esc(r.phone) + '">' + esc(r.phone) + '</a><br>✉️ ' + esc(r.email) + '</p>'
    + (r.message ? '<p style="background:#F7F2E8;padding:12px;border-radius:10px">💬 ' + esc(r.message) + '</p>' : '')
    + '<p style="text-align:center;margin:28px 0 8px"><a href="' + link + '" style="background:#1E4E8C;color:#fff;text-decoration:none;padding:16px 28px;border-radius:999px;font-weight:bold;display:inline-block">Accepter ou refuser</a></p>');
}
function mailConfirm(r) {
  return frame('<h2 style="margin:0 0 4px">Votre table est réservée ✅</h2>'
    + '<p>Bonjour ' + esc(r.name) + ',<br>nous avons le plaisir de confirmer votre réservation :</p>'
    + recap(r)
    + '<p>En cas d\'empêchement, merci de nous prévenir au <a href="tel:+41269131419">' + CONFIG.phone + '</a>.</p>'
    + '<p>A presto !<br><b>' + CONFIG.restaurant + '</b><br><span style="color:#5b6b7d">' + CONFIG.address + '</span></p>');
}
function mailRefuse(r, note) {
  return frame('<h2 style="margin:0 0 4px">Votre demande de réservation</h2>'
    + '<p>Bonjour ' + esc(r.name) + ',<br>nous sommes désolés, nous ne pouvons pas vous accueillir le ' + frDate(r.date) + ' à ' + esc(r.time) + '.</p>'
    + (note ? '<p style="background:#F7F2E8;padding:12px;border-radius:10px">' + esc(note) + '</p>' : '')
    + '<p>N\'hésitez pas à choisir un autre créneau sur <a href="' + CONFIG.site + '/#reservation">notre site</a> ou à nous appeler au <a href="tel:+41269131419">' + CONFIG.phone + '</a>.</p>'
    + '<p>A presto !<br><b>' + CONFIG.restaurant + '</b></p>');
}
