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

## Results

After clicking "Recalculate," the tool displays three size buckets, each with estimated man-hours and costs:

### Size Buckets

- **Standard Size Bucket:**
  - Shows the bucket (XS, S, M, L, XL, XXL, XXXL) based on your total weighted score.
  - Estimated man-hours and cost for standard delivery speed.
- **Recommended Size Bucket:**
  - Uses a multiplier for recommended delivery speed (1.25x effort).
  - Shows bucket, man-hours, and cost for recommended speed.
- **Express Size Bucket:**
  - Uses a multiplier for express delivery speed (1.5x effort).
  - Shows bucket, man-hours, and cost for express speed.

Each bucket is visually separated in the results grid. The results also include:

- **Total Weighted Score:** Sum of all selected complexity factors.
- **Estimated Person-Days:** Total effort in person-days.
- **Total Effort Hours:** Total hours required for migration.
- **Estimated Migration Cost:** Calculated from person-days and daily rate.
- **Person-Sprints Required:** Number of sprints needed for one person.
- **Sprints with Current Team:** Number of sprints needed with your team size.
- **Service Packages & Team Recommendation:** Suggested service package and fusion team based on migration type and delivery speed.

> The three buckets help you compare effort and cost for different delivery speeds. Tune the weights and effort model as you gather actual migration data.

## Tips
- Only technical complexity factors affect the migration estimate.
- Descriptive fields (Application Name, Vendor, etc.) are for identification and context.
- Adjust weights and required flags to match your organization's priorities.
- Use notes for any special considerations or context.

## Support
For questions or help, contact your migration team lead or refer to the documentation in the `docs/` folder.
