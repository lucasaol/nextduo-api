import { Param, ParseUUIDPipe } from "@nestjs/common";

export const UuidParam = (paramName = 'id') =>
  Param(paramName, new ParseUUIDPipe({ errorHttpStatusCode: 400 }));