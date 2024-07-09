"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
  // it need to be wrapepd in session provide
  const user = useCurrentUser();

  const onClick = () =>{
    logout()
  }

  return (
    <div className="bg-white p-10 rounded-xl">
      {/* to access user we need to do this everytime hence we will create a reusable hooks
        {JSON.stringify(user)} */}
          <button onClick={onClick} type="submit">
            Sign out
          </button>
    </div>
  )
}

export default SettingsPage