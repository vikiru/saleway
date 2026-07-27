import os
import jwt
from jwt import PyJWKClient
from django.http import JsonResponse
from django.conf import settings

issuer_url = os.environ.get('CLERK_ISSUER_URL', '')
jwks_url = f"{issuer_url.rstrip('/')}/.well-known/jwks.json"

try:
    jwk_client = PyJWKClient(jwks_url)
except Exception:
    jwk_client = None

class ClerkAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith('/api/v1/health'):
            return self.get_response(request)
            
        if request.path.startswith('/api/v1/ratings'):
            # Only require auth for POST/PUT/DELETE
            if request.method not in ['POST', 'PUT', 'DELETE']:
                return self.get_response(request)

        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return JsonResponse({'success': False, 'error': 'Missing Authorization Header'}, status=401)
            
        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != 'bearer':
            return JsonResponse({'success': False, 'error': 'Invalid Authorization Header'}, status=401)
            
        token = parts[1]
        
        try:
            if not jwk_client:
                raise Exception("JWK client not configured")
            signing_key = jwk_client.get_signing_key_from_jwt(token)
            data = jwt.decode(
                token,
                signing_key.key,
                algorithms=["RS256"]
            )
            request.user_id = data.get('sub')
        except Exception as e:
            return JsonResponse({'success': False, 'error': 'Invalid or expired token'}, status=401)
            
        return self.get_response(request)
