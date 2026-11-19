# Security Specification & Payload-First TDD

## 1. Data Invariants
1. Every `appointments/{appointmentId}` record must match strict field constraints: valid BD mobile regex (`^01[3-9][0-9]{8}$`), ISO date (`YYYY-MM-DD`), bounded text lengths, initial status strictly `'pending'`, and server-verified `createdAt == request.time` and `updatedAt == request.time`.
2. PII (`patientName`, `phone`, `notes`) inside `appointments` and `contactMessages` is strictly isolated: unauthenticated users can NEVER `get`, `list`, `update`, or `delete` `appointments` or `contactMessages`. Only verified admins (`isAdmin()`) or the authenticated booking owner (`patientUid == request.auth.uid`) can access their records.
3. Public serial status lookup (`serialLookups/{serialCode}`) contains ZERO PII (`serialCode`, `appointmentDate`, `timeSlot`, `service`, `status`, `createdAt`, `updatedAt`) and strictly forbids `allow list` to prevent scraping; only direct `allow get` by exact `serialCode` is permitted, and creation must occur atomically alongside an appointment or match `serialCode == serialLookups/{serialCode}` ID.
4. Terminal status lock: once an appointment is `'completed'` or `'cancelled'`, non-admins cannot mutate it.
5. Admin privileges require `request.auth.token.email_verified == true` and either the bootstrapped admin email (`maxjonny64@gmail.com`) or existence in `/admins/{uid}`.

## 2. Dirty Dozen Attack Payloads
1. **Shadow Field Injection on Appointment Create**: `{ ..., isVerified: true, role: "admin" }` -> Rejected by `keys().hasOnly(...)`.
2. **Invalid Phone / Resource Poisoning**: `{ ..., phone: "123", patientName: "<200KB string>" }` -> Rejected by regex & `.size() <= 100`.
3. **Status Shortcutting on Create**: `{ ..., status: "confirmed" }` -> Rejected (`incoming().status == 'pending'` required on create).
4. **Client Timestamp Spoofing**: `{ ..., createdAt: "2020-01-01T00:00:00Z" }` -> Rejected (`incoming().createdAt == request.time`).
5. **UID Spoofing on Create**: `{ ..., patientUid: "victim_uid" }` while unauthenticated or logged in as attacker -> Rejected (`patientUid == ''` when unauth, or `== request.auth.uid` when signed in).
6. **Blanket Appointment Scrape (`list`)**: Unauthenticated or non-admin client running `getDocs(collection(db, 'appointments'))` -> Rejected (`allow list: if isAdmin() || (isSignedIn() && resource.data.patientUid == request.auth.uid)`).
7. **Unverified Email Admin Spoof**: Token with `email: "maxjonny64@gmail.com"` and `email_verified: false` -> Rejected (`email_verified == true` required).
8. **Serial Lookup Scraping (`list`)**: Running `getDocs(collection(db, 'serialLookups'))` -> Rejected (`allow list: if false;`).
9. **ID Poisoning**: Creating `/appointments/` with a 500-char or `/` or `$` ID -> Rejected by `isValidId(appointmentId)`.
10. **PII Leak in SerialLookup**: Writing `phone` or `patientName` into `serialLookups/{serialCode}` -> Rejected by `keys().hasOnly(...)`.
11. **Self-Role Escalation**: Authenticated non-admin writing `/admins/{uid}` -> Rejected (`allow write: if isAdmin()`).
12. **Contact Message Tampering**: Unauthenticated or non-admin attempting `get`, `list`, `update`, or `delete` on `contactMessages` -> Rejected.
