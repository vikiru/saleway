import os
from functools import wraps
from flask import request, jsonify
import jwt
from jwt import PyJWKClient

issuer_url = os.environ.get('CLERK_ISSUER_URL', '')
jwks_url = f"{issuer_url.rstrip('/')}/.well-known/jwks.json"

try:
    jwk_client = PyJWKClient(jwks_url)
except Exception:
    jwk_client = None

def jwt_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not jwk_client:
            return jsonify({'success': False, 'error': 'Auth not configured properly'}), 500
            
        auth_header = request.headers.get('Authorization', None)
        if not auth_header:
            return jsonify({'success': False, 'error': 'Missing Authorization Header'}), 401
            
        parts = auth_header.split()
        if parts[0].lower() != 'bearer' or len(parts) != 2:
            return jsonify({'success': False, 'error': 'Invalid Authorization Header format'}), 401
            
        token = parts[1]
        try:
            signing_key = jwk_client.get_signing_key_from_jwt(token)
            data = jwt.decode(
                token,
                signing_key.key,
                algorithms=["RS256"],
            )
            # Attach user ID to request context
            request.user_id = data.get('sub')
        except jwt.PyJWTError as e:
            return jsonify({'success': False, 'error': 'Invalid or expired token'}), 401
            
        return f(*args, **kwargs)
    return decorated
