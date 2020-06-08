import { KubernetesObject } from 'kpt-functions';
import * as apisMetaV1 from './io.k8s.apimachinery.pkg.apis.meta.v1';

// SimpleJob is the Schema for the simplejobs API
export class SimpleJob implements KubernetesObject {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
  public apiVersion: string;

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
  public kind: string;

  // Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#metadata
  public metadata: apisMetaV1.ObjectMeta;

  // SimpleJobSpec defines the desired state of SimpleJob
  public spec?: SimpleJob.Spec;

  constructor(desc: SimpleJob.Interface) {
    this.apiVersion = SimpleJob.apiVersion;
    this.kind = SimpleJob.kind;
    this.metadata = desc.metadata;
    this.spec = desc.spec;
  }
}

export function isSimpleJob(o: any): o is SimpleJob {
  return o && o.apiVersion === SimpleJob.apiVersion && o.kind === SimpleJob.kind;
}

export namespace SimpleJob {
  export const apiVersion = "batch.hideto0710.github.com/v1";
  export const group = "batch.hideto0710.github.com";
  export const version = "v1";
  export const kind = "SimpleJob";

  // named constructs a SimpleJob with metadata.name set to name.
  export function named(name: string): SimpleJob {
    return new SimpleJob({metadata: {name}});
  }
  // SimpleJob is the Schema for the simplejobs API
  export interface Interface {
    // Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#metadata
    metadata: apisMetaV1.ObjectMeta;

    // SimpleJobSpec defines the desired state of SimpleJob
    spec?: SimpleJob.Spec;
  }
  // SimpleJobSpec defines the desired state of SimpleJob
  export class Spec {
    public name?: string;

    public schedule?: string;
  }
}

// SimpleJobList is a list of SimpleJob
export class SimpleJobList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
  public apiVersion: string;

  // List of simplejobs. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md
  public items: SimpleJob[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: SimpleJobList.Metadata;

  constructor(desc: SimpleJobList) {
    this.apiVersion = SimpleJobList.apiVersion;
    this.items = desc.items.map((i) => new SimpleJob(i));
    this.kind = SimpleJobList.kind;
    this.metadata = desc.metadata;
  }
}

export function isSimpleJobList(o: any): o is SimpleJobList {
  return o && o.apiVersion === SimpleJobList.apiVersion && o.kind === SimpleJobList.kind;
}

export namespace SimpleJobList {
  export const apiVersion = "batch.hideto0710.github.com/v1";
  export const group = "batch.hideto0710.github.com";
  export const version = "v1";
  export const kind = "SimpleJobList";

  // SimpleJobList is a list of SimpleJob
  export interface Interface {
    // List of simplejobs. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md
    items: SimpleJob[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: SimpleJobList.Metadata;
  }
  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  export class Metadata {
    // continue may be set if the user set a limit on the number of items returned, and indicates that the server has more data available. The value is opaque and may be used to issue another request to the endpoint that served this list to retrieve the next set of available objects. Continuing a consistent list may not be possible if the server configuration has changed or more than a few minutes have passed. The resourceVersion field returned when using this continue value will be identical to the value in the first response, unless you have received this token from an error message.
    public continue?: string;

    // remainingItemCount is the number of subsequent items in the list which are not included in this list response. If the list request contained label or field selectors, then the number of remaining items is unknown and the field will be left unset and omitted during serialization. If the list is complete (either because it is not chunking or because this is the last chunk), then there are no more remaining items and this field will be left unset and omitted during serialization. Servers older than v1.15 do not set this field. The intended use of the remainingItemCount is *estimating* the size of a collection. Clients should not rely on the remainingItemCount to be set or to be exact.
    // 
    // This field is alpha and can be changed or removed without notice.
    public remainingItemCount?: number;

    // String that identifies the server's internal version of this object that can be used by clients to determine when objects have changed. Value must be treated as opaque by clients and passed unmodified back to the server. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#concurrency-control-and-consistency
    public resourceVersion?: string;

    // selfLink is a URL representing this object. Populated by the system. Read-only.
    public selfLink?: string;
  }
}