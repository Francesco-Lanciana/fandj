import * as ResolvedApiSource from "prismic-javascript/d.ts/ResolvedApi";
import * as ApiSearchResponseSource from "prismic-javascript/d.ts/ApiSearchResponse";
import * as DocumentSource from "prismic-javascript/d.ts/documents";

type ResolvedApi = ResolvedApiSource.default;
type QueryOptions = ResolvedApiSource.QueryOptions;
type ApiSearchResponse = ApiSearchResponseSource.default;
type Document = DocumentSource.Document;

export { ResolvedApi, QueryOptions, ApiSearchResponse, Document };

// http://ivanz.com/2016/06/07/how-does-typescript-discover-type-declarations-definitions-javascript
//export = Prismic;