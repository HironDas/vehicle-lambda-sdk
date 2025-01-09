import SDKError from '../sdkerror';
import { test, expect, describe } from "@jest/globals";
import BadRequestError from '../bad_request_error';
import UnauthorizedError from '../unauthorized_error';

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

})
