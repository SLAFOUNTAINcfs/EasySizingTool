# Easy Sizing Tool — Full Application Markdown

## Overview

The Easy Sizing Tool estimates migration effort, timeline, and cost using:

- Reorganized intake sections (application metadata, security/environment, quantified scale, boolean complexity)
- A calculated total score from quantified + security + complexity drivers
- An effort/cost model (person-days, hours, person-sprints, and cost)
- Three package cards with fixed team caps and rate multipliers
- Export/import of full form state as JSON

## Page Structure

1. Application Information
2. Security & Environment Context
3. Quantified Scale Inputs
4. Complexity Factors (Boolean Effort Drivers)
5. Service Packages
6. Effort & Cost Model

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

- `impactLevelRequired`
- `secCap`
- `atoNeeded`
- `atoDocs`
- `azureEnclaveStatus`

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

Boolean complexity drivers with fixed script-side weights.

- `c_onPremDependency` (8)
- `c_hybridDependency` (6)
- `c_containerizationRequired` (7)
- `c_automatedTestingMissing` (5)
- `c_manualTestingExtended` (4)
- `c_deploymentInfraMissing` (6)
- `c_iacMissing` (6)
- `c_loggingUplift` (5)
- `c_backupDrMissing` (6)
- `c_identityIntegrationRequired` (6)
- `c_featureTrackingMissing` (2)

---

## 5) Service Packages

Three package cards with fixed team caps and multipliers:

- Standard: team cap 3, rate multiplier 1.0
- Recommended: team cap 6, rate multiplier 2.0
- Express: team cap 9, rate multiplier 3.0

Each package card displays:

- Estimated cost
- Daily rate
- Person-days
- Total hours
- Person-sprints
- Sprint capacity (hours)

IDs:

- Standard: `pkg-standard-*`
- Recommended: `pkg-recommended-*`
- Express: `pkg-express-*`

---

## 6) Effort & Cost Model

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

The total score is the sum of three components:

`totalScore = quantifiedScore + complexityScore + securityScore`

Where:

- `quantifiedScore` is the sum of numeric values from `q_*` fields listed in section 3.
- `complexityScore` is the sum of configured weights for checked `c_*` booleans.
- `securityScore` includes:
  - sum of selected values for `impactLevelRequired`, `secCap`, `atoNeeded`, `atoDocs`, `azureEnclaveStatus`
  - plus count of checked enclave boxes (`enclaveIL2`, `enclaveIL4`, `enclaveIL5`, `enclaveIL6`, `enclaveOther`)

### 2) Core effort/cost

- `personDays = totalScore * basePersonDays`
- `totalHours = personDays * hoursPerDay`
- `personSprints = totalHours / sprintHours` when `sprintHours > 0`, otherwise `0`
- `calendarSprints = personSprints / teamMembers` when `teamMembers > 0`, otherwise `0` (internal only)
- `estimatedCost = personDays * dailyRate`

### 3) Package cards

For each package `p`:

- `pkgRate_p = dailyRate * rateMultiplier_p`
- `pkgCost_p = personDays * pkgRate_p`
- `pkgSprintCapacityHours_p = sprintHours * teamCap_p`

---

## Bucket Classification

The previous Results bucket cards are no longer rendered in the UI. The script still contains bucket logic using `standardThreshold` and `recommendedThreshold`:

- score <= 0 => `–`
- score < `standardThreshold` => `Standard`
- score < `recommendedThreshold` => `Recommended`
- else => `Express`

---

## Export / Import Behavior

### Export

- Captures all `input`, `select`, and `textarea` values by ID
- Checkboxes are stored as booleans
- Filename: `<appName>-size-estimate.json` (sanitized), fallback `migration-tool-size-estimate.json`

### Import

- Reads JSON and maps keys back to matching element IDs
- Restores checkbox booleans and text/select values
- Recalculates immediately after import

---

## UX/Accessibility Notes

- All visible form controls have labels (`label[for=id]`)
- Import file control has a visually hidden label
- Recalculation updates on `change` and `keyup` for inputs/textareas

---

## Files Used

- App: `EasySizingTool.html`
- Base styles: `styles/migrationtool.css`
- Pricing styles: `styles/pricing.css`

---

## Current Source of Truth

Scoring is driven by:

- quantified `q_*` select values,
- security/environment selections and enclave checkbox count,
- fixed-weight `c_*` boolean complexity factors.
