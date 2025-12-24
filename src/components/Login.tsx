import { SignIn } from "@clerk/clerk-react";

export default function Login(){
    return (
          <div className="flex mt-11 justify-center items-center">
          <div>
          <SignIn 
          forceRedirectUrl="/checkrole"/>
          </div>
          
        </div>
    )
}