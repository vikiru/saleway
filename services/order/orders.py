from flask import jsonify, request
from app import app, db

# TODO: Add route/controller logic for create/update/delete order, get all user orders, get order by id
# TODO: Update models to use text for ids (as uuids is preferred)
# TODO: integrate and try each route at least once using curl/similar

@app.route("/orders", methods=["POST"])
def create_order_route():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"message": "No data provided"}), 400

        user_id = data.get("user_id")
        items = data.get("items", [])
    except Exception:
        db.session.rollback()
        return jsonify({"message": "Failed to create order, please try again."}), 500
