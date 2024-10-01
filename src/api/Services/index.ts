import HttpClient from "../HttpClient/client";

export const API_BASE_URLS = {
  CATALOG: 'https://catalog.surecheck.us',
  CATALOG_IMAGE: 'https://catalogimage.surecheck.us',
  CHARGES: 'https://charges.surecheck.us',
  CHARGE_ANALYTICS: 'https://chargeanalytics.surecheck.us',
  CLIENT: 'https://client.surecheck.us',
  DEVICE: 'https://device.surecheck.us',
  DEVICE_HEALTH: 'https://devicehealth.surecheck.us',
  FACILITY: 'https://facility.surecheck.us',
  FACILITYHEALTH: 'https://facilityhealth.surecheck.us',
  FACILITY_DEVICE: 'https://facilitydevice.surecheck.us',
  FACILITY_IMAGE: 'https://facilityimage.surecheck.us',
  FACILITY_INVENTORY: 'https://facilityinventory.surecheck.us',
  FULFILLMENT: 'https://fulfillment.surecheck.us',
  IDENTITY: 'https://identity-api.surecheck.us',
  IMAGES: 'https://images.surecheck.us',
  JOBS: 'https://jobs.surecheck.us',
  ORDER: 'https://order.surecheck.us',
  ORDER_ANALYTICS: 'https://orderanalytics.surecheck.us',
  ORGANIZATION: 'https://organization.surecheck.us',
  ORGANIZATION_TAGS: 'https://organizationtags.surecheck.us',
  READS: 'https://reads.surecheck.us',
};

// Setting up the apis.
// Each HttpClient defaults to using v1 for the version.
// You can pass in a different version if needed.
export const catalogApi = new HttpClient(API_BASE_URLS.CATALOG);
export const catalogImageApi = new HttpClient(API_BASE_URLS.CATALOG_IMAGE);
export const chargesApi = new HttpClient(API_BASE_URLS.CHARGES);
export const chargeAnalyticsApi = new HttpClient(
  API_BASE_URLS.CHARGE_ANALYTICS,
);
export const clientApi = new HttpClient(API_BASE_URLS.CLIENT);
export const deviceApi = new HttpClient(API_BASE_URLS.DEVICE);
export const deviceHealthApi = new HttpClient(API_BASE_URLS.DEVICE_HEALTH);
export const facilityApi = new HttpClient(API_BASE_URLS.FACILITY);
export const facilityHealthApi = new HttpClient(API_BASE_URLS.FACILITYHEALTH);
export const facilityDeviceApi = new HttpClient(API_BASE_URLS.FACILITY_DEVICE);
export const facilityImageApi = new HttpClient(API_BASE_URLS.FACILITY_IMAGE);
export const facilityInventoryApi = new HttpClient(
  API_BASE_URLS.FACILITY_INVENTORY,
);
export const fulfillmentApi = new HttpClient(API_BASE_URLS.FULFILLMENT);
export const identityApi = new HttpClient(API_BASE_URLS.IDENTITY);
export const imagesApi = new HttpClient(API_BASE_URLS.IMAGES);
export const jobsApi = new HttpClient(API_BASE_URLS.JOBS);
export const orderApi = new HttpClient(API_BASE_URLS.ORDER);
export const orderAnalyticsApi = new HttpClient(API_BASE_URLS.ORDER_ANALYTICS);
export const organizationApi = new HttpClient(API_BASE_URLS.ORGANIZATION);
export const organizationTagsApi = new HttpClient(
  API_BASE_URLS.ORGANIZATION_TAGS,
);
export const readsApi = new HttpClient(API_BASE_URLS.READS);
export const authApi = new HttpClient('');
