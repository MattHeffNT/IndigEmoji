#!/usr/bin/env node
// Registers test iPhones with Apple and (re)creates the Ad Hoc provisioning profiles used by
// .github/workflows/ios-device.yml, so every registered device can install the ad hoc build.
//
//   ASC_KEY_PATH=~/ios-signing/AuthKey_XXXX.p8 ASC_KEY_ID=XXXX ASC_ISSUER_ID=xxxx-... \
//     node scripts/ios-adhoc-profiles.mjs [--device <UDID> <name>]...
//
// With no --device it just regenerates the profiles for the devices already registered.
// Uses the App Store Connect API key (App Manager role) and the team's Apple Distribution certificate.
import crypto from 'node:crypto';
import fs from 'node:fs';

const { ASC_KEY_PATH, ASC_KEY_ID, ASC_ISSUER_ID } = process.env;
if (!ASC_KEY_PATH || !ASC_KEY_ID || !ASC_ISSUER_ID) {
  console.error('Set ASC_KEY_PATH, ASC_KEY_ID and ASC_ISSUER_ID');
  process.exit(1);
}

const PROFILES = [
  { name: 'Indigemoji Ad Hoc', bundle: 'au.com.indigemoji' },
  { name: 'Indigemoji Stickers Ad Hoc', bundle: 'au.com.indigemoji.Stickers' },
];

const key = fs.readFileSync(ASC_KEY_PATH);
function token() {
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const body = `${b64({ alg: 'ES256', kid: ASC_KEY_ID, typ: 'JWT' })}.${b64({
    iss: ASC_ISSUER_ID, iat: now, exp: now + 600, aud: 'appstoreconnect-v1',
  })}`;
  const sig = crypto.sign('sha256', Buffer.from(body), { key, dsaEncoding: 'ieee-p1363' });
  return `${body}.${sig.toString('base64url')}`;
}

async function api(method, path, body) {
  const res = await fetch(`https://api.appstoreconnect.apple.com${path}`, {
    method,
    headers: { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' },
    body: body && JSON.stringify(body),
  });
  if (res.status === 204) return null;
  const json = await res.json();
  if (!res.ok) {
    const err = new Error(`${method} ${path}: ${res.status} ${json.errors?.map((e) => e.detail).join('; ')}`);
    err.status = res.status;
    throw err;
  }
  return json;
}

// --- register devices given on the command line
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  if (args[i] !== '--device') continue;
  const [udid, name] = [args[i + 1], args[i + 2]];
  if (!udid || !name) throw new Error('--device needs <UDID> <name>');
  i += 2;
  const existing = await api('GET', `/v1/devices?filter[udid]=${encodeURIComponent(udid)}`);
  if (existing.data.length) {
    console.log(`device already registered: ${existing.data[0].attributes.name} (${udid})`);
  } else {
    await api('POST', '/v1/devices', {
      data: { type: 'devices', attributes: { name, udid, platform: 'IOS' } },
    });
    console.log(`registered device: ${name} (${udid})`);
  }
}

// --- regenerate the profiles with all enabled iOS devices
const devices = (await api('GET', '/v1/devices?filter[platform]=IOS&filter[status]=ENABLED&limit=200')).data;
if (!devices.length) throw new Error('no registered iOS devices; pass --device <UDID> <name>');

const certs = (await api('GET', '/v1/certificates?filter[certificateType]=DISTRIBUTION&limit=50')).data
  .filter((c) => new Date(c.attributes.expirationDate) > new Date());
if (!certs.length) throw new Error('no valid Apple Distribution certificate');

for (const { name, bundle } of PROFILES) {
  const bundleId = (await api('GET', `/v1/bundleIds?filter[identifier]=${bundle}&limit=50`)).data
    .find((b) => b.attributes.identifier === bundle);
  if (!bundleId) throw new Error(`App ID ${bundle} is not registered`);

  // profiles can't be edited through the API, so replace any existing one of the same name
  for (const old of (await api('GET', `/v1/profiles?filter[name]=${encodeURIComponent(name)}`)).data) {
    await api('DELETE', `/v1/profiles/${old.id}`);
  }
  const created = await api('POST', '/v1/profiles', {
    data: {
      type: 'profiles',
      attributes: { name, profileType: 'IOS_APP_ADHOC' },
      relationships: {
        bundleId: { data: { type: 'bundleIds', id: bundleId.id } },
        certificates: { data: certs.map((c) => ({ type: 'certificates', id: c.id })) },
        devices: { data: devices.map((d) => ({ type: 'devices', id: d.id })) },
      },
    },
  });
  console.log(`created profile "${name}" for ${bundle} with ${devices.length} device(s), ` +
    `expires ${created.data.attributes.expirationDate.slice(0, 10)}`);
}
