"""
blocklist.py

This file just contains the blocklist of the JWT tokens. It will be imported by
app and the logout resource so that tokens can be added to the blocklist when the
user logs out.
"""

BLOCKLIST = set()

# from services.model.models import BlocklistModel

# BLOCKLIST =  BlocklistModel.query(BlocklistModel.jwt_token).all()

# print("$$$$$$$$$$$$$$$$$$$$$$$$$ ", BLOCKLIST)