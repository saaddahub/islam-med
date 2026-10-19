import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ALL_CARE, CLINIC_SERVICES, DEPARTMENTS, careHref, findCareEntry } from '../src/data/departments.ts';
import { getCareDetails } from '../src/data/departmentDetails.ts';

test('every department and service has a unique working route and detailed content', () => {
  assert.equal(DEPARTMENTS.length, 10);
  assert.equal(CLINIC_SERVICES.length, 7);
  assert.equal(new Set(ALL_CARE.map(careHref)).size, ALL_CARE.length);
  for (const entry of ALL_CARE) {
    assert.equal(findCareEntry(careHref(entry)), entry);
    assert.ok(getCareDetails(entry).length >= 2, `${entry.name} needs substantive content`);
    for (const section of getCareDetails(entry)) {
      assert.ok(section.paragraphs?.length || section.items?.length, `${entry.name}: empty section`);
    }
    for (const id of entry.relatedServices) assert.ok(CLINIC_SERVICES.some(service => service.id === id), `${entry.name}: broken related-service link ${id}`);
  }
});

test('ultrasound department and ultrasound service are independent destinations', () => {
  assert.equal(findCareEntry('#department-ultrasound')?.kind, 'department');
  assert.equal(findCareEntry('#service-ultrasound')?.kind, 'service');
  assert.notEqual(findCareEntry('#department-ultrasound'), findCareEntry('#service-ultrasound'));
});

test('shared links from the previous department structure still resolve', () => {
  assert.equal(findCareEntry('#department-internal-medicine')?.id, 'general-medicine');
  assert.equal(findCareEntry('#department-outpatients'), findCareEntry('#service-outpatients'));
  assert.equal(findCareEntry('#department-laboratory'), findCareEntry('#service-laboratory'));
  assert.equal(findCareEntry('#unrecognised-page'), undefined);
});
