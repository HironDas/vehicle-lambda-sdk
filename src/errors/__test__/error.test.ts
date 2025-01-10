import SDKError from '../sdkerror';
import { test, expect, describe } from "@jest/globals";
import BadRequestError from '../bad_request_error';
import UnauthorizedError from '../unauthorized_error';
import ForbiddenError from '../forbidden_error';
import NotFoundError from "../notfound_error";
import InternalServerError from "../internal_server_error";
import GatewayTimeoutError from "../getway_timeout_error";

describe("SDK Error", () => {

  test('should create an SDKError with the correct properties', () => {
    const error = new SDKError('Test message', 'TEST_CODE', 'Test details');
    expect(error).toBeInstanceOf(SDKError);
    expect(error.message).toBe('Test message');
    expect(error.code).toBe('TEST_CODE');
    expect(error.details).toBe('Test details');
    expect(error.name).toBe('SDKError');
  });

  test('should crate an BadRequestError with the corrent properties', () => {
    const error = new BadRequestError('Test message', 'Test details');
    expect(error).toBeInstanceOf(BadRequestError);
    expect(error).toBeInstanceOf(SDKError);
    expect(error.code).toBe("BAD_REQUEST");
    expect(error.details).toBe("Test details");
    expect(error.message).toBe("Test message");
    expect(error.name).toBe("BadRequestError");
  });

  test('should create an UnauthorizedError with the correct properties', () => {
    const error = new UnauthorizedError('Test message', 'Test details');
    expect(error).toBeInstanceOf(UnauthorizedError);
    expect(error).toBeInstanceOf(SDKError);
    expect(error.message).toBe('Test message');
    expect(error.code).toBe('UNAUTHORIZED');
    expect(error.details).toBe('Test details');
    expect(error.name).toBe('UnauthorizedError');
  });

  test("Should create an ForbiddenError with the correct properties", ()=>{
    const error = new ForbiddenError("Test message", "test details");
    expect(error).toBeInstanceOf(SDKError);
    expect(error).toBeInstanceOf(ForbiddenError);
    expect(error.message).toBe("Test message");
    expect(error.code).toBe("FORBIDDEN");
    expect(error.details).toBe("test details");
    expect(error.name).toBe("ForbiddenError");
  });

  test("Should create a NotFoundError with the corrent properties", ()=>{
    const error = new NotFoundError("Test message", "Test Details");
    expect(error).toBeInstanceOf(SDKError);
    expect(error).toBeInstanceOf(NotFoundError);
    expect(error.name).toBe("NotFoundError");
    expect(error.code).toBe("NOT_FOUND");
    expect(error.message).toBe("Test message");
  });

  test("Should create an InternalServerError with the correct properties", ()=>{
    const error = new InternalServerError("Test message", "Test Details");
    expect(error).toBeInstanceOf(SDKError);
    expect(error).toBeInstanceOf(InternalServerError);
    expect(error.name).toBe("InternalServerError");
    expect(error.code).toBe("INTERNAL_SERVER");
  });

  test("Should create a GatewayTimeoutError with the corrent properties", ()=>{
    const error = new GatewayTimeoutError("Test message", "Test Details");
    expect(error).toBeInstanceOf(SDKError);
    expect(error).toBeInstanceOf(GatewayTimeoutError);
    expect(error.name).toBe("GatewayTimeoutError");
    expect(error.code).toBe("GATEWAY_TIMEOUT");
    expect(error.message).toBe("Test message");
  });

})
