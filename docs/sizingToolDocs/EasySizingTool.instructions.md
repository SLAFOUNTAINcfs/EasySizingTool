# Easy Sizing Tool Instructions

## Overview
This tool helps estimate the effort and complexity of migrating an application. It separates descriptive application information from technical complexity factors.

## Steps

1. **Fill Application Information**
   - Enter the following details:
     - Application Name
     - Vendor
     - Purpose
     - App Location (e.g., Azure, On-premises)
     - Number of Users
     - Notes (any general notes)
     - Product Owner
     - Technical SME
     - Mission Criticality (1–3)
     - Migration Type
     - Delivery Speed (Standard, Recommended, Expedited)

2. **Set Complexity Factors**
   - For each factor:
     - Adjust the Weight (1–10) to reflect importance for your organization.
     - Check Required if the factor applies to this migration.

3. **Calculate Migration Effort**
   - Click "Recalculate" to see:
     - Estimated effort (person-days, hours, sprints)
     - Size bucket
     - Recommended team and service package

4. **Export/Import Progress**
   - Use "Export Progress" to save your inputs as a JSON file.
   - Use "Import Progress" to load a previously saved file.

## Tips
- Only technical complexity factors affect the migration estimate.
- Descriptive fields (Application Name, Vendor, etc.) are for identification and context.
- Adjust weights and required flags to match your organization's priorities.
- Use notes for any special considerations or context.

## Support
For questions or help, contact your migration team lead or refer to the documentation in the `docs/` folder.
