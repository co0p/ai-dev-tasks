# Design: Backend Unit Tests & Error Logging Increment
**Date:** 2025-12-01  
**Status:** Initial Technical Design

## Design Summary
This increment adds Go unit tests for backend HTTP handlers (static and catalog) and implements error logging for failed static file serving. The approach follows Go best practices: using the standard `net/http/httptest` package for handler testing and the standard `log` package for error logging. This aligns with the project's principles of maintainability and reliability.

## Technical Decisions
- **Testing Framework:** Go's built-in `testing` and `net/http/httptest`
	- **Rationale:** Standard, well-supported, and idiomatic for Go HTTP handler testing
	- **Trade-offs:** No advanced mocking or reporting, but simple and maintainable
	- **Alternatives Considered:** Third-party test frameworks (not needed for this scope)
- **Error Logging:** Go's standard `log` package
	- **Rationale:** Simple, reliable, and easy to integrate
	- **Trade-offs:** No log rotation or structured logging, but sufficient for current needs
	- **Alternatives Considered:** Third-party logging libraries (overkill for this increment)

## Initial Approach
### Handler Testing
**Approach:** Use `httptest.NewRecorder` and `http.NewRequest` to simulate requests to handlers, asserting status codes and response bodies.  
**Rationale:** Enables isolated, fast, and repeatable tests for handler logic.  
**Trade-offs:** Does not test full server integration, but covers handler logic.  
**Alternatives:** Full integration tests with live server (out of scope).

### Error Logging
**Approach:** Use `log.Printf` to log errors when static file serving fails.  
**Rationale:** Immediate visibility for errors, easy to extend later.  
**Trade-offs:** Logs to stdout/stderr only.  
**Alternatives:** Structured logging or log files (not needed now).

## Architecture Overview
**Components:**
- `pkg/static/static.go`: Static file handler, now with error logging
- `pkg/catalog/catalog.go`: Catalog API handler
- `pkg/static/static_test.go`, `pkg/catalog/catalog_test.go`: Unit test files for handlers
**Data Flow:**
- Test code simulates HTTP requests to handlers, checks responses and logs
- Error logs written to stdout/stderr via `log` package
**Integration Points:**
- No external services required for this increment
**State Management:**
- Test state lives in-memory via Go's test framework

## Implementation Constraints
- Only handler logic is tested, not full server integration
- Error logs are not persisted or structured
- Static asset path remains hardcoded for now

## Open Questions
- Should error logs be structured or persisted in future increments?
- Should integration tests be added for full server behavior?
