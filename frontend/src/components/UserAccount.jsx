import { useState } from "react";
import UserAccount from '/useraccount'

const UserAccount = () => {
const [hidden, setHidden] = useState(true)

  return (
    <div className="relative">
        <div className={hidden ? "hidden absolute" : "visible absolute"}>
          <p>email</p>
          <p>username</p>
        </div>
    </div>
  );
};

export default UserAccount;
