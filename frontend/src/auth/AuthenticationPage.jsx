import "react"
import {SignIn, SignUp, SignedIn, SignedOut} from "@clerk/clerk-react"

export function AuthenticationPage() {
    
    return <div className="auth-container">
        <SignedOut>
            <SignIn routiing="path" path="/sign-in"/>
            <SignUp routing="path" path="/sign-up"/>
        </SignedOut>
        <SignedIn>
            <div className="redirect-mesage">
                <p> You are already signed in. </p>
            </div>
        </SignedIn>
    </div>
    
}