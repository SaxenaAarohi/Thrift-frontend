import { SignUp } from "@clerk/clerk-react";

export default function Sign_up() {
  return (
    <div className="flex my-4 justify-center items-center">
      <div>
        <SignUp
          path="/signup"
          forceRedirectUrl="/complete_profile" />
      </div>

    </div>
  )
}