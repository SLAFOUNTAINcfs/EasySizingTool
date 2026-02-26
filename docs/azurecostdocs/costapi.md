---
layout: Conceptual
title: Azure Consumption REST APIs | Microsoft Learn
canonicalUrl: https://learn.microsoft.com/en-us/rest/api/consumption/
enable_rest_try_it: true
rest_product: Azure
uhfHeaderId: azure
breadcrumb_path: ../../breadcrumb/toc.json
ms.author: vikramdesai
manager: smmark
author: vikramdesai01
ms.topic: generated-reference
ms.devlang: rest-api
ms.date: 2022-12-19T00:00:00.0000000Z
products:
- https://authoring-docs-microsoft.poolparty.biz/devrel/68ec7f3a-2bc6-459f-b959-19beb729907d
ms.service: cost-management-billing
ms.assetid: 
description: Learn how the Azure Consumption APIs give you programmatic access to cost and usage data for your Azure resources.
locale: en-us
moniker_definition_rel: ../../.monikers.Azure.AzureRestApi.json
document_id: 0913ea81-20af-fd0f-a9bc-4cdd6aae7b62
document_version_independent_id: 893cf99e-486f-2306-6d83-1b65a29f8cdf
updated_at: 2026-01-06T22:15:00.0000000Z
original_content_git_url: https://github.com/MicrosoftDocs/azure-docs-rest-apis/blob/live/docs-ref-conceptual/consumption/index.md
gitcommit: https://github.com/MicrosoftDocs/azure-docs-rest-apis/blob/b8071bae2f2269cb07ee524b6dfae7db62b1fb33/docs-ref-conceptual/consumption/index.md
git_commit_id: b8071bae2f2269cb07ee524b6dfae7db62b1fb33
site_name: Docs
depot_name: Azure.AzureRestApi
page_type: conceptual
toc_rel: ../azure/toc.json
feedback_system: None
feedback_product_url: ''
feedback_help_link_type: ''
feedback_help_link_url: ''
word_count: 636
asset_id: api/consumption/index
moniker_range_name: 
monikers: []
item_type: Content
source_path: docs-ref-conceptual/consumption/index.md
cmProducts:
- https://authoring-docs-microsoft.poolparty.biz/devrel/68ec7f3a-2bc6-459f-b959-19beb729907d
spProducts:
- https://authoring-docs-microsoft.poolparty.biz/devrel/90370425-aca4-4a39-9533-d52e5e002a5d
platformId: 66836a2f-e7ed-b99a-7f82-3b779690b2c7
---

# Azure Consumption REST APIs | Microsoft Learn

The Azure Consumption APIs give you programmatic access to cost and usage data for your Azure resources. The APIs currently only support Enterprise Enrollments, Web Direct subscriptions (with a few exceptions), and CSP Azure plan subscriptions. The APIs are continually updated to support other types of Azure subscriptions.

Azure Consumption APIs provide access to:

- Enterprise Customers Only
    - Price sheet
    - Budgets
    - Forecasts
    - Balances
    - Tags
    - Cost Tags
- Enterprise and Web Direct Customers
    - Reservation Details
    - Reservation Summaries
    - Marketplace Charges
    - Usage Details
    - Reservation Recommendations

## List of Unsupported Subscription Types

- MS-AZR-0145P (CSP)
- MS-AZR-0146P (CSP)
- MS-AZR-159P (CSP)
- MS-AZR-0036P (sponsored)
- MS-AZR-0143P (sponsored)
- MS-AZR-0015P (internal)
- MS-AZR-0144P (DreamSpark)

## Working with billing periods and date ranges

[Usage Details](usage-details) and [Marketplace Charges](marketplaces) accept billing period or date ranges for defining the start and end dates for the usage data.

Here's the API behavior based on billing periods and date ranges in request:

| Billing period in request | Start date in request | End date in request | API behavior |
| --- | --- | --- | --- |
| no | no | no | Data for current billing period is returned in response |
| no | yes | no | Data for current billing period is returned in response |
| no | no | yes | Data for current billing period is returned in response |
| no | yes | yes | Data for specified Start and End Date is returned in response |
| yes | no | no | Data for specified billing period is returned in response |
| yes | yes | no | Data for specified billing period is returned in response |
| yes | no | yes | Data for specified billing period is returned in response |
| yes | yes | yes | Data for specified Start and End Date is returned in response, supplied billing period is ignored |

Maximum allowed date range is 12 months in one request and data is available from May 1, 2014 or later.

### Getting list of billing periods

To providie a valid billing period in a request, the client should first get a list of the available billing periods by subscription by using the following API

`GET https://management.azure.com/subscriptions/{subscriptionId}/providers/Microsoft.Billing/billingPeriods?api-version=2017-04-24-preview`

Using the list, the client can pick a specific billing period to get consumption data.

## Late Arriving Data

To accommodate third party services that have delays in reporting usage, the reported usage date is set to the time at which the usage data was sent, as opposed to when the actual usage took place that is, consumption time.

As a result, the usage is rated for and applied to the reported time. In order to represent the actual consumption time, the *properties.AdditionalProperties* field will now contain two other properties. *ConsumptionBeginTime* and *ConsumptionEndTime* are the new fields that correspond to the actual consumption time window.

These changes result in a few scenarios that need to be addressed when calling the usage details API:

1. **Month End Reporting**: For usage that occurred during a month, but reported during the next month, customers need to look at the *additionalProperties* field to assign the usage, to the appropriate month.
2. **Query Usage details**: When you query the usage details API by a date range, the query only applies to usage report date and not the consumption time in the *additionalProperties* field. For customers looking to map usage details to invoices, this update does not affect the process as the invoice processes the usage based on the usage report date. For customers, looking to map usage details to a specific calendar date/month, this update is a breaking change and for these scenarios the usage report date can't be used and the date that the usage occurred, in the *additionalProperties* section must be used.

Sample Call for More Details:

`GET https://management.azure.com/subscriptions/{subscriptionId}/providers/Microsoft.Consumption/usageDetails?api-version=2018-03-31&$expand=properties/additionalProperties`

Sample Response snippet:

```json
  "properties": {
    "billingPeriodId":"/subscriptions/{subscriptionid}/providers/Microsoft.Billing/billingPeriods/20180501",
    "usageStart":"2018-05-01T00:00:00.0000000Z",
    "usageEnd":"2018-05-01T23:59:59.0000000Z",
    "instanceId":"/subscriptions/{subscriptionid}/resourceGroups/{resourcegroup}/providers/Microsoft.Cdn/profiles/{profile}",
    "instanceName":"{id}",
    "instanceLocation":"SouthCentralUS",
    "meterId":"6b88ada0-cbc0-4874-be0e-23004f8b4de7",
    "usageQuantity":0.002065,
    "pretaxCost":0,
    "currency":"USD",
    "additionalProperties": {
      "Provider": "1",
      "ConsumptionBeginTime": "2018-05-01T19:00:00",
      "ConsumptionEndTime": "2018-05-01T20:00:00"
    }
  }
```