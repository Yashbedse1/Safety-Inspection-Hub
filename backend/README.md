```

## API Documentation

The API is documented using Swagger/OpenAPI and provides comprehensive documentation for all endpoints.

### Accessing the Documentation

- **Swagger UI**: Visit `http://localhost:4000/docs` for an interactive API documentation interface
- **OpenAPI JSON**: Access the raw OpenAPI specification at `http://localhost:4000/docs-json`

### Available Endpoints

#### Checklists

- `GET /api/checklists` - Get all checklist summaries
- `GET /api/checklists/:id` - Get a specific checklist by ID

### Error Responses

All endpoints return standardized error responses in `application/problem+json` format (RFC 7807) when errors occur. The error response includes:

- `type`: URI reference identifying the problem type
- `title`: Human-readable summary of the problem
- `status`: HTTP status code
- `detail`: Specific explanation of the problem
- `instance`: URI reference to the specific occurrence
- `code`: Application-specific error code (optional)

### Example Error Response

```json
{
  "type": "https://example.com/probs/not-found",
  "title": "Checklist Not Found",
  "status": 404,
  "detail": "Checklist with ID 'invalid-id' was not found.",
  "instance": "/api/checklists/invalid-id",
  "code": "CHECKLIST_NOT_FOUND"
}
```
