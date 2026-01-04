/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: businessdivisions
 * Interface for BusinessDivisions
 */
export interface BusinessDivisions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  divisionName?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  longDescription?: string;
  /** @wixFieldType image */
  divisionImage?: string;
  /** @wixFieldType url */
  callToActionUrl?: string;
  /** @wixFieldType boolean */
  isActive?: boolean;
}


/**
 * Collection ID: industriesserved
 * Interface for IndustriesServed
 */
export interface IndustriesServed {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  industryName?: string;
  /** @wixFieldType text */
  industryDescription?: string;
  /** @wixFieldType image */
  industryImage?: string;
  /** @wixFieldType url */
  industryPageUrl?: string;
  /** @wixFieldType number */
  displayOrder?: number;
}


/**
 * Collection ID: products
 * Interface for Products
 */
export interface Products {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  productName?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  longDescription?: string;
  /** @wixFieldType image */
  productImage?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  modelNumber?: string;
  /** @wixFieldType url */
  specificationsUrl?: string;
}


/**
 * Collection ID: quoterequests
 * Interface for QuoteRequests
 */
export interface QuoteRequests {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  customerName?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  companyName?: string;
  /** @wixFieldType text */
  requestDetails?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
}
