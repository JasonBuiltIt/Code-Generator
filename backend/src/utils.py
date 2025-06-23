# write a function toa utheticate using clerk.
#frontend
#  clerk authenticates us on the front end
#    it issues us a jwt token
#      it then sends it to the backend
#then in the backend
#   we connect to clerk using the secret key we have
#    then we ask clerk if the token is valid, using the secret keys 
from fastapi import HTTPException
from clerk_backend_api import Clerk,AuthenticateRequestOptions # this is a package we installed
from dotenv import load_dotenv # looking for the .env file and loading it
import os

load_dotenv() # looking for the env file and loading it

clerk_sdk=Clerk(bearer_auth=os.getenv("CLERK_SECRET_KEY")) #This tells clerk we are the owner, since we have the secret key so we can do all the token operations, we are initalizing the clerk client basically

def authenticate_and_get_user_details(request):
    try:
        request_state=clerk_sdk.authenticate_request(
            request,
            AuthenticateRequestOptions(
                authorized_parties=["http://localhost:5173", "http://localhost:5173"],
                jwt_key=os.getenv("JWT_KEY") # serverless
            )
        )
        if not request_state.is_signed_in:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        user_id=request_state.payload.get("sub")

        return {"user_id": user_id}
    


    except Exception as e:
        raise HTTPException(status_code=500, detail="Invalid credentials")