---
# Easy Sizing Tool – User Guide

## Overview
The Easy Sizing Tool helps estimate the effort, cost, and team requirements for migrating an application. It collects key information, quantifies complexity, and provides actionable results.

---

# 1. Application Information

Fill in basic details about your application:

- **Application Name**: Enter the name.
- **Decision Makers**: Specify cloud strategy and implementation decision makers.
- **Application Owner(s)**: List owners.
- **Availability & Environment**: Select owner availability, target cloud, Azure subscription status, role permissions, Azure experience, and diagram/documentation status.
- **Notes**: Add any relevant notes.

---

## 2. Quantified Inputs

Provide measurable details:

- **Enclaves, Impact Levels**: Select applicable security levels.
- **CAP, Users, RTO, Data Sensitivity, RMF, ATO, Certification Cycle, Operations Costs**: Choose from dropdowns.
- **Documentation, Architecture, Hardware Specs, Containerization, On Prem/Hybrid, Database Config, Data Volume, Lines of Code**: Select or enter values.
- **Testing, Deployment, IAC, Logging, Maintenance Cadence, Identity, Feature Tracking, Backup/DR, Storage Type, Instance Counts**: Choose options.

---

## 3. Migration Complexity Factors

For each complexity factor (43 total), set a weight (1–10) and check if it applies.
Factors cover environments, application size, data volume, and more.

---

## 4. Results

Click **Recalculate** to see:

- **Total Weighted Score**: Sum of checked factors and their weights.
- **Size Bucket**: XS, S, M, L, XL, XXL, XXXL based on score thresholds.
- **Estimated Person-Days, Effort Hours, Person-Sprints, Calendar Sprints, Migration Cost**: Calculated from your inputs.

---

## 5. Service Packages & Team Recommendation

Based on your migration type and delivery speed, the tool recommends a fusion team and service package.
Packages and teams adjust for complexity and urgency.

---

## 6. Effort & Cost Model

Customize base person-days per score point, daily rate, work days/month, hours/day, sprint hours, team members, and score thresholds.
Adjust these to match your organization’s historical data.

---

## Export/Import Progress

- **Export Progress**: Save your current inputs as a JSON file.
- **Import Progress**: Load a previously saved JSON file to restore your session.

---

## How It Works

- Inputs are collected via text fields, dropdowns, and checkboxes.
- The tool calculates scores and estimates based on your selections.
- Results and recommendations update automatically as you change inputs.

---

## Tips

- Use dropdowns for all quantifiable fields.
- Check complexity factors that apply to your migration.
- Adjust weights and model parameters for more accurate estimates.
- Export your progress for record-keeping or sharing.

---
