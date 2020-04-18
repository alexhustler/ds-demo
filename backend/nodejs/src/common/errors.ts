export abstract class DemoCoreError extends Error {
  public httpErrorStatusCode = 500;

  public httpErrorMessage = "Internal server error";
}

export namespace AuthorizationErrors {
  export class UserNotAuthorized extends DemoCoreError {
    public httpErrorStatusCode = 401;
    public httpErrorMessage = "Authentication required";
  }
}

export namespace BadRequestErrors {
  export class MissingFields extends DemoCoreError {
    public httpErrorStatusCode = 400;
    public httpErrorMessage = "Required fields are missing from the request.";

    constructor(httpErrorMessage?: string) {
      super();
      if (httpErrorMessage) {
        this.httpErrorMessage = httpErrorMessage;
      }
    }
  }
}

export namespace ResourceNotFoundErrors {
  export class UserNotFound extends DemoCoreError {
    public httpErrorStatueCode = 404;
    public httpErrorMessage = "User not found";
  }
}
