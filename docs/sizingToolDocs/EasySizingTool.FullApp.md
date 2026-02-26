# Enhanced Application Sizing Tool — Full Application Markdown

## Overview

The Enhanced Application Sizing Tool estimates migration effort, timeline, and cost using:

- Reorganized intake sections (application metadata, security/environment, quantified scale, boolean complexity)
- A calculated total score from quantified + security + complexity drivers
- An effort/cost model (person-days, hours, team sprints, and cost)
- Editable complexity weighting inputs
- Three package cards with fixed team caps and rate multipliers
- Export/import of all persistable form state as JSON

## Page Structure

1. Application Information
2. Security & Environment Context
3. Quantified Scale Inputs
4. Complexity Factors (Boolean Effort Drivers)
5. Scoring Weights
6. Service Packages
7. Effort & Cost Model

---

## 1) Application Information

Metadata and owner context (captured/exported).

- `appName`
- `cloudStrategyDM`
- `cloudImplDM`
- `appOwner`
- `ownerAvailability`
- `azureSub`
- `rolePerms`
- `azureExp`
- `archDiagram`
- `dbDiagram`
- `notes`

---

## 2) Security & Environment Context

Security/accreditation and enclave posture inputs.

### Enclave checkboxes (current state)

- `enclaveIL2`
- `enclaveIL4`
- `enclaveIL5`
- `enclaveIL6`
- `enclaveOther`

### Security context selects

- `impactLevelRequired` (label: Mission Criticality)
  - Mission Support (value 3)
  - Mission Essential (value 6)
  - Mission Critical (value 9)
- `secCap`
- `atoNeeded`
- `atoDocs`
- `azureEnclaveStatus`

Layout note: this section uses `security-layout` with enclave checkboxes in the left column and other controls in middle/right columns on larger screens.

---

## 3) Quantified Scale Inputs

Scale/size dropdowns used directly in scoring.

- `q_users`
- `q_rto`
- `q_opsCost`
- `q_dataVolume`
- `q_loc`
- `q_dbConfig`
- `q_storageType`
- `q_instancesDev`
- `q_instancesTest`
- `q_instancesStaging`
- `q_instancesProd`
- `q_instancesRel`

---

## 4) Complexity Factors (Boolean Effort Drivers)

Boolean complexity toggles that contribute score when checked.

- `c_onPremDependency`
- `c_hybridDependency`
- `c_containerizationRequired`
- `c_automatedTestingMissing`
- `c_manualTestingExtended`
- `c_deploymentInfraMissing`
- `c_iacMissing`
- `c_loggingUplift`
- `c_backupDrMissing`
- `c_identityIntegrationRequired`
- `c_featureTrackingMissing`

---

## 5) Scoring Weights

Editable complexity weights (no code change required).

- `w_c_onPremDependency` (default 8)
- `w_c_hybridDependency` (default 6)
- `w_c_containerizationRequired` (default 7)
- `w_c_automatedTestingMissing` (default 5)
- `w_c_manualTestingExtended` (default 4)
- `w_c_deploymentInfraMissing` (default 6)
- `w_c_iacMissing` (default 6)
- `w_c_loggingUplift` (default 5)
- `w_c_backupDrMissing` (default 6)
- `w_c_identityIntegrationRequired` (default 6)
- `w_c_featureTrackingMissing` (default 2)

---

## 6) Service Packages

Three package cards with fixed team caps and multipliers:

- Standard: team cap 3, rate multiplier 1.0
- Recommended: team cap 6, rate multiplier 2.0
- Expedited: team cap 9, rate multiplier 3.0

Each package card displays:

- Estimated cost
- Daily rate
- Person-days
- Total hours
- Team sprints
- Sprint capacity (hours)

IDs:

- Standard: `pkg-standard-*`
- Recommended: `pkg-recommended-*`
- Expedited: `pkg-express-*`

---

## 7) Effort & Cost Model

Model controls:

- `basePersonDays`
- `dailyRate`
- `workDaysPerMonth`
- `hoursPerDay`
- `sprintHours` (label: `Hours Per Person Per Sprint`)
- `teamMembers`
- `standardThreshold`
- `recommendedThreshold`

Default values:

- Base person-days/point: 0.4
- Daily rate: 1200
- Work days/month: 20
- Hours/day: 6
- Hours Per Person Per Sprint: 60
- Team members: 3
- Thresholds: Standard 40, Recommended 90

---

## Calculation Logic

### 1) Total score

`totalScore = quantifiedScore + complexityScore + securityScore`

Where:

- `quantifiedScore` is the sum of numeric values from `q_*` fields listed in section 3.
- `complexityScore` is the sum of the editable `w_*` weights for checked `c_*` booleans.
- `securityScore` includes:
  - selected values for `impactLevelRequired`, `secCap`, `atoNeeded`, `atoDocs`, `azureEnclaveStatus`
  - plus count of checked enclave boxes (`enclaveIL2`, `enclaveIL4`, `enclaveIL5`, `enclaveIL6`, `enclaveOther`)

### 2) Core effort/cost

- `personDays = totalScore * basePersonDays`
- `totalHours = personDays * hoursPerDay`
- `personSprints = totalHours / sprintHours` when `sprintHours > 0`, otherwise `0` (internal value)
- `calendarSprints = personSprints / teamMembers` when `teamMembers > 0`, otherwise `0` (internal value)
- `estimatedCost = personDays * dailyRate`

### 3) Package cards

For each package `p`:

- `pkgRate_p = dailyRate * rateMultiplier_p`
- `pkgCost_p = personDays * pkgRate_p`
- `pkgSprintCapacityHours_p = sprintHours * teamCap_p`
- `pkgTeamSprints_p = totalHours / pkgSprintCapacityHours_p` when capacity is > 0, otherwise `0`

---

## Bucket Classification

Results cards are not rendered in the current UI, but threshold logic remains in script using `standardThreshold` and `recommendedThreshold`:

- score <= 0 => `–`
- score < `standardThreshold` => `Standard`
- score < `recommendedThreshold` => `Recommended`
- else => `Express`

---

## Export / Import Behavior

### Export

- Uses `PERSIST_SELECTOR = input:not([type="file"]), select, textarea`
- Captures all persistable controls with IDs
- Checkboxes are stored as booleans; other values as strings
- Filename: `<appName>-size-estimate.json` (sanitized), fallback `migration-tool-size-estimate.json`

### Import

- Reads JSON and maps keys back to matching element IDs
- Restores:
  - checkboxes as booleans
  - radios by matching value
  - other controls as strings
- Recalculates immediately after import

---

## UX/Accessibility Notes

- All visible form controls have labels (`label[for=id]`)
- Import file control has a visually hidden label
- Recalculation updates on `change` and `keyup` for inputs/textareas
- Responsive option layout uses `options-grid` (3 columns desktop, 2 tablet, 1 mobile)

---

## Files Used

- App: `EnhancedApplicationSizingTool.html`
- Base styles: `styles/migrationtool.css`
- Pricing styles: `styles/pricing.css`

---

## Current Source of Truth

Scoring is driven by:

- quantified `q_*` select values,
- security/environment selections and enclave checkbox count,
- editable `w_*` complexity weights applied to checked `c_*` factors.
