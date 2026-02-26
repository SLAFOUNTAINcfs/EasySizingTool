---
layout: Reference
monikers:
- rest-consumption-2024-08-01
defaultMoniker: rest-consumption-2024-08-01
useMonikerList: 1
versioningType: Combined
title: Aggregated Cost - Get By Management Group - REST API (Azure Consumption) | Microsoft Learn
canonicalUrl: https://learn.microsoft.com/en-us/rest/api/consumption/aggregated-cost/get-by-management-group?view=rest-consumption-2024-08-01
uid: management.azure.com.consumption.aggregatedcost.getbymanagementgroup
enable_rest_try_it: true
rest_product: Azure
uhfHeaderId: azure
breadcrumb_path: ../../../breadcrumb/toc.json
ms.author: kexu
manager: smmark
author: kexugit
ms.topic: generated-reference
ms.devlang: rest-api
ms.date: 2024-05-07T00:00:00.0000000Z
products:
- https://authoring-docs-microsoft.poolparty.biz/devrel/68ec7f3a-2bc6-459f-b959-19beb729907d
ms.service: cost-management-billing
description: 'Provides the aggregate cost of a management group and all child management groups by current billing period. '
locale: en-us
moniker_definition_rel: ../../../.monikers.Azure.AzureRestApi.json
document_id: 593a6841-a65e-df14-f020-0319f9fe8c81
document_version_independent_id: 3d2c83e5-a5a0-7b9c-ed1e-9305e84894d9
updated_at: 2025-10-23T22:19:00.0000000Z
original_content_git_url: https://github.com/MicrosoftDocs/azure-docs-rest-apis/blob/live/docs-ref-autogen/consumption/rest-consumption-2024-08-01/Aggregated-Cost/Get-By-Management-Group.yml
gitcommit: https://github.com/MicrosoftDocs/azure-docs-rest-apis/blob/131f17b609a902c34ef386be8a1ddc952f633202/docs-ref-autogen/consumption/rest-consumption-2024-08-01/Aggregated-Cost/Get-By-Management-Group.yml
git_commit_id: 131f17b609a902c34ef386be8a1ddc952f633202
default_moniker: rest-consumption-2024-08-01
site_name: Docs
depot_name: Azure.AzureRestApi
page_type: rest
page_kind: operation
toc_rel: ../../azure/toc.json
feedback_system: None
feedback_product_url: ''
feedback_help_link_type: ''
feedback_help_link_url: ''
asset_id: api/consumption/aggregated-cost/get-by-management-group
moniker_range_name: 
monikers:
- rest-consumption-2024-08-01
item_type: Content
source_path: docs-ref-autogen/consumption/rest-consumption-2024-08-01/Aggregated-Cost/Get-By-Management-Group.yml
use_moniker_list: 1
cmProducts:
- https://authoring-docs-microsoft.poolparty.biz/devrel/68ec7f3a-2bc6-459f-b959-19beb729907d
spProducts:
- https://authoring-docs-microsoft.poolparty.biz/devrel/90370425-aca4-4a39-9533-d52e5e002a5d
platformId: 5dfa979a-837e-f17c-5473-a694c97dda16
---

# Aggregated Cost - Get By Management Group

- Service:
    - Consumption

- API Version:
    - 2024-08-01

Provides the aggregate cost of a management group and all child management groups by current billing period.

```http
GET https://management.azure.com/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Consumption/aggregatedcost?api-version=2024-08-01
```

 With optional parameters: 

```http
GET https://management.azure.com/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Consumption/aggregatedcost?api-version=2024-08-01&$filter={$filter}
```

## URI Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| managementGroupId | path | True | string | Order Id of the reservation |
| api-version | query | True | string <br>minLength: 1 | The API version to use for this operation. |
| $filter | query |  | string | Required only for daily grain. The properties/UsageDate for start date and end date. The filter supports 'le' and 'ge' |

## Responses

| Name | Type | Description |
| --- | --- | --- |
| 200 OK | ManagementGroupAggregatedCostResult | The request has succeeded. |
| Other Status Codes | ErrorResponse | An unexpected error response. |

## Security

### azure\_auth

Azure Active Directory OAuth2 Flow.

Type:  oauth2Flow:  implicitAuthorization URL:  https://login.microsoftonline.com/common/oauth2/authorize

#### Scopes

| Name | Description |
| --- | --- |
| user\_impersonation | impersonate your user account |

## Examples

| AggregatedCostByManagementGroup |
| --- |
| AggregatedCostByManagementGroupFilterByDate |

### AggregatedCostByManagementGroup

#### Sample request

**HTTP**

```http
GET https://management.azure.com/providers/Microsoft.Management/managementGroups/managementGroupForTest/providers/Microsoft.Consumption/aggregatedcost?api-version=2024-08-01
```

#### Sample response

- Status code:
    - 200

```json
{
  "name": "aggregatedcostId1",
  "type": "Microsoft.Consumption/aggregatedcost",
  "id": "/providers/Microsoft.Management/managementGroups/managementGroupForTest/providers/Microsoft.Consumption/aggregatedcostId1",
  "properties": {
    "azureCharges": 250.9876,
    "chargesBilledSeparately": 120.345,
    "children": [
      {
        "name": "aggregatedcostId2",
        "type": "Microsoft.Consumption/aggregatedcost",
        "id": "/providers/Microsoft.Management/managementGroups/managementGroupChildForTest/providers/Microsoft.Consumption/aggregatedcostId2",
        "properties": {
          "azureCharges": 150,
          "chargesBilledSeparately": 30.345,
          "children": [],
          "currency": "USD",
          "excludedSubscriptions": [],
          "includedSubscriptions": [
            "c349567d-c83a-48c9-ab0e-578c69dc97a4"
          ],
          "marketplaceCharges": 50.786,
          "usageEnd": "2024-08-01T00:00:00.0000000Z",
          "usageStart": "2023-03-01T00:00:00.0000000Z"
        }
      }
    ],
    "currency": "USD",
    "excludedSubscriptions": [],
    "includedSubscriptions": [
      "1caaa5a3-2b66-438e-8ab4-bce37d518c5d"
    ],
    "marketplaceCharges": 150.786,
    "usageEnd": "2024-08-01T00:00:00.0000000Z",
    "usageStart": "2023-03-01T00:00:00.0000000Z"
  }
}
```

### AggregatedCostByManagementGroupFilterByDate

#### Sample request

**HTTP**

```http
GET https://management.azure.com/providers/Microsoft.Management/managementGroups/managementGroupForTest/providers/Microsoft.Consumption/aggregatedcost?api-version=2024-08-01&$filter=usageStart ge '2018-08-15' and properties/usageStart le '2018-08-31'
```

#### Sample response

- Status code:
    - 200

```json
{
  "name": "aggregatedcostId1",
  "type": "Microsoft.Consumption/aggregatedcost",
  "id": "/providers/Microsoft.Management/managementGroups/managementGroupForTest/providers/Microsoft.Consumption/aggregatedcostId1",
  "properties": {
    "azureCharges": 150.9876,
    "chargesBilledSeparately": 90.345,
    "children": [
      {
        "name": "aggregatedcostId2",
        "type": "Microsoft.Consumption/aggregatedcost",
        "id": "/providers/Microsoft.Management/managementGroups/managementGroupChildForTest/providers/Microsoft.Consumption/aggregatedcostId2",
        "properties": {
          "azureCharges": 50,
          "chargesBilledSeparately": 30.345,
          "children": [],
          "currency": "USD",
          "excludedSubscriptions": [],
          "includedSubscriptions": [
            "c349567d-c83a-48c9-ab0e-578c69dc97a4"
          ],
          "marketplaceCharges": 10.786,
          "usageEnd": "2018-08-31T00:00:00.0000000Z",
          "usageStart": "2018-08-15T00:00:00.0000000Z"
        }
      }
    ],
    "currency": "USD",
    "excludedSubscriptions": [],
    "includedSubscriptions": [
      "1caaa5a3-2b66-438e-8ab4-bce37d518c5d"
    ],
    "marketplaceCharges": 80.786,
    "usageEnd": "2018-08-31T00:00:00.0000000Z",
    "usageStart": "2018-08-15T00:00:00.0000000Z"
  }
}
```

## Definitions

| Name | Description |
| --- | --- |
| createdByType | The type of identity that created the resource. |
| ErrorAdditionalInfo | The resource management error additional info. |
| ErrorDetail | The error detail. |
| ErrorResponse | Error response |
| ManagementGroupAggregatedCostResult | A management group aggregated cost resource. |
| systemData | Metadata pertaining to creation and last modification of the resource. |

### createdByType

Enumeration

The type of identity that created the resource.

| Value | Description |
| --- | --- |
| User |  |
| Application |  |
| ManagedIdentity |  |
| Key |  |

### ErrorAdditionalInfo

Object

The resource management error additional info.

| Name | Type | Description |
| --- | --- | --- |
| info | object | The additional info. |
| type | string | The additional info type. |

### ErrorDetail

Object

The error detail.

| Name | Type | Description |
| --- | --- | --- |
| additionalInfo | ErrorAdditionalInfo[] | The error additional info. |
| code | string | The error code. |
| details | ErrorDetail[] | The error details. |
| message | string | The error message. |
| target | string | The error target. |

### ErrorResponse

Object

Error response

| Name | Type | Description |
| --- | --- | --- |
| error | ErrorDetail | The error object. |

### ManagementGroupAggregatedCostResult

Object

A management group aggregated cost resource.

| Name | Type | Description |
| --- | --- | --- |
| etag | string | The etag for the resource. |
| id | string | Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} |
| name | string | The name of the resource |
| properties.azureCharges | number (decimal) | Azure Charges. |
| properties.billingPeriodId | string | The id of the billing period resource that the aggregated cost belongs to. |
| properties.chargesBilledSeparately | number (decimal) | Charges Billed Separately. |
| properties.children | ManagementGroupAggregatedCostResult[] | Children of a management group |
| properties.currency | string | The ISO currency in which the meter is charged, for example, USD. |
| properties.excludedSubscriptions | string[] | List of subscription Guids excluded from the calculation of aggregated cost |
| properties.includedSubscriptions | string[] | List of subscription Guids included in the calculation of aggregated cost |
| properties.marketplaceCharges | number (decimal) | Marketplace Charges. |
| properties.usageEnd | string (date-time) | The end of the date time range covered by the aggregated cost. |
| properties.usageStart | string (date-time) | The start of the date time range covered by aggregated cost. |
| systemData | systemData | Azure Resource Manager metadata containing createdBy and modifiedBy information. |
| tags | object | Resource tags. |
| type | string | The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" |

### systemData

Object

Metadata pertaining to creation and last modification of the resource.

| Name | Type | Description |
| --- | --- | --- |
| createdAt | string (date-time) | The timestamp of resource creation (UTC). |
| createdBy | string | The identity that created the resource. |
| createdByType | createdByType | The type of identity that created the resource. |
| lastModifiedAt | string (date-time) | The timestamp of resource last modification (UTC) |
| lastModifiedBy | string | The identity that last modified the resource. |
| lastModifiedByType | createdByType | The type of identity that last modified the resource. |

---

## Other Supported Versions

- [rest-consumption-2018-06-30](https://learn.microsoft.com/en-us/rest/api/consumption/aggregated-cost/get-by-management-group?view=rest-consumption-2018-06-30&accept=text/markdown)
- [rest-consumption-2018-08-31](https://learn.microsoft.com/en-us/rest/api/consumption/aggregated-cost/get-by-management-group?view=rest-consumption-2018-08-31&accept=text/markdown)
- [rest-consumption-2018-10-01](https://learn.microsoft.com/en-us/rest/api/consumption/aggregated-cost/get-by-management-group?view=rest-consumption-2018-10-01&accept=text/markdown)
- [rest-consumption-2019-01-01](https://learn.microsoft.com/en-us/rest/api/consumption/aggregated-cost/get-by-management-group?view=rest-consumption-2019-01-01&accept=text/markdown)
- [rest-consumption-2019-05-01](https://learn.microsoft.com/en-us/rest/api/consumption/aggregated-cost/get-by-management-group?view=rest-consumption-2019-05-01&accept=text/markdown)
- [rest-consumption-2019-06-01](https://learn.microsoft.com/en-us/rest/api/consumption/aggregated-cost/get-by-management-group?view=rest-consumption-2019-06-01&accept=text/markdown)
- [rest-consumption-2019-10-01](https://learn.microsoft.com/en-us/rest/api/consumption/aggregated-cost/get-by-management-group?view=rest-consumption-2019-10-01&accept=text/markdown)
- [rest-consumption-2019-11-01](https://learn.microsoft.com/en-us/rest/api/consumption/aggregated-cost/get-by-management-group?view=rest-consumption-2019-11-01&accept=text/markdown)
- [rest-consumption-2021-05-01](https://learn.microsoft.com/en-us/rest/api/consumption/aggregated-cost/get-by-management-group?view=rest-consumption-2021-05-01&accept=text/markdown)
- [rest-consumption-2021-10-01](https://learn.microsoft.com/en-us/rest/api/consumption/aggregated-cost/get-by-management-group?view=rest-consumption-2021-10-01&accept=text/markdown)
- [rest-consumption-2022-09-01](https://learn.microsoft.com/en-us/rest/api/consumption/aggregated-cost/get-by-management-group?view=rest-consumption-2022-09-01&accept=text/markdown)
- [rest-consumption-2023-03-01](https://learn.microsoft.com/en-us/rest/api/consumption/aggregated-cost/get-by-management-group?view=rest-consumption-2023-03-01&accept=text/markdown)
- [rest-consumption-2023-05-01](https://learn.microsoft.com/en-us/rest/api/consumption/aggregated-cost/get-by-management-group?view=rest-consumption-2023-05-01&accept=text/markdown)
- [rest-consumption-2023-11-01](https://learn.microsoft.com/en-us/rest/api/consumption/aggregated-cost/get-by-management-group?view=rest-consumption-2023-11-01&accept=text/markdown)
