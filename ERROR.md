# Common Errors and Troubleshooting

## Error when Creating a User

### Request Payload

```json
{
  "external_id": "user_2dxxxxxxxxxx",
  "first_name": "Jackson",
  "last_name": "Kasi",
  "email_address": [
    "xxxxxxxxxxxx@gmail.com"
  ],
  "skip_password_checks": true
}
```

### Error Response

**Status**: 422 Unprocessable Entity  
**Time**: 663ms  
**Size**: 229 B

#### Headers

```
Access-Control-Allow-Origin: *
Cf-Cache-Status: DYNAMIC
Cf-Ray: 86567b13195c2418-IAD
Clerk-Api-Version: 2021-02-05
Connection: keep-alive
Content-Length: 229
Content-Type: application/json
Date: Sat, 16 Mar 2024 17:09:01 GMT
Server: cloudflare
Vary: Accept-Encoding
X-Cfworker: 1
X-Cloud-Trace-Context: 95axxxxxxxxxxx
X-Final-Url: https://api.clerk.com/v1/users
```

#### Body

```json
{
  "errors": [
    {
      "message": "is unknown",
      "long_message": "email_address is not a valid parameter for this request.",
      "code": "form_param_unknown",
      "meta": {
        "param_name": "email_address"
      }
    }
  ],
  "clerk_trace_id": "95axxxxxxxxxxx"
}
```

### Troubleshooting

This error indicates that the provided `email_address` parameter is not valid for this request. The likely cause is a mistake in the parameter naming or structure. To resolve this issue, ensure the following:

- Verify the correct parameter name and structure as per the Clerk API documentation. The correct field for email addresses when creating a user is usually `email_addresses` (plural) and should be an array.

- Ensure you are using the latest API version and that your request adheres to the documentation for that version.

- If you continue to experience issues, consult the Clerk API documentation or reach out to Clerk support with the provided `clerk_trace_id` for further assistance.
```

Remember to replace placeholders like `user_2dxxxxxxxxxx` and `xxxxxxxxxxxx@gmail.com` with actual values when making real API calls. This document can be expanded to include more error scenarios as you encounter them, providing a valuable resource for troubleshooting common issues.