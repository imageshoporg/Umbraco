export interface ImageshopValue {
  code: string;
  image: ImageshopImage;
  text: Record<string, ImageshopCultureText>;
  extraInfo: unknown | null;
  documentId: number;
  AuthorName: string | null;
  InterfaceList: ImageshopInterface[];
  profile: string | null;
  focalPoint: unknown | null;
}

export interface ImageshopImage {
  file: string;
  width: number;
  height: number;
  thumbnail: string;
  mimeType: string;
  croppedWidth: number;
  croppedHeight: number;
}

export interface ImageshopCultureText {
  title: string | null;
  description: string | null;
  rights: string | null;
  credits: string | null;
  tags: string | null;
  altText: string | null;
  categories: string[] | null;
  documentinfo: ImageshopDocumentInfo[] | null;
}

export interface ImageshopDocumentInfo {
  DocumentInfoTypeId: number;
  Name: string;
  Value: string;
}

export interface ImageshopInterface {
  InterfaceID: number;
  InterfaceName: string;
}